import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'secret';

export const login = async (req: Request, res: Response): Promise<void> => {
    const { documento, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { documento }
        });

        if (!user) {
            res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, nombre: user.nombre },
            SECRET,
            { expiresIn: '8h' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Login exitoso', token, role: user.role, nombre: user.nombre });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    const { nombre, documento, password, role, ficha } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                nombre,
                documento,
                password: hashedPassword,
                role: role || 'APRENDIZ',
                ficha
            }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error creando usuario', error });
    }
};

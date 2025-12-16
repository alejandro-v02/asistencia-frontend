import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

interface UserPayload {
    id: number;
    role: string;
    nombre: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1] || req.cookies?.token;

    if (!token) {
        res.status(401).json({ message: 'No proporcionó token' });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET) as UserPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
        return;
    }
};

export const isInstructor = (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.role !== 'INSTRUCTOR' && req.user?.role !== 'ADMIN') {
        res.status(403).json({ message: 'Requiere rol instructor' });
        return;
    }
    next();
};

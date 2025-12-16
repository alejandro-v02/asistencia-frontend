import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Habilitar asistencia (Instructor)
export const enableAttendance = async (req: Request, res: Response): Promise<void> => {
    const { ficha, minutos, fecha } = req.body; // fecha YYYY-MM-DD

    if (!ficha || !minutos) {
        console.error("Missing required fields:", req.body);
        res.status(400).json({ message: 'Faltan campos requeridos (ficha, minutos)' });
        return;
    }

    try {
        // Calcular hora inicio y fin
        const now = new Date();
        const horaInicio = now;
        const horaFin = new Date(now.getTime() + minutos * 60000);

        // Crear Sesión
        const sesion = await prisma.sesion.create({
            data: {
                fecha: new Date(fecha || now),
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                fk_id_horario: 1, // Placeholder por ahora
                ficha: ficha
            }
        });

        console.log(`Sesión creada ID ${sesion.id_sesion} para ficha ${ficha}`);
        res.json({ message: 'Sesión habilitada', sesion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creando sesión' });
    }
};

// Verificar sesión activa (Aprendiz)
export const checkActiveSession = async (req: Request, res: Response): Promise<void> => {
    const { ficha } = req.query;

    if (!ficha) {
        res.status(400).json({ message: 'Ficha requerida' });
        return;
    }

    try {
        const now = new Date();

        // Buscar sesión activa para esa ficha:
        // Fecha = Hoy AND Hora Inicio <= Ahora <= Hora Fin
        const sesion = await prisma.sesion.findFirst({
            where: {
                ficha: String(ficha),
                hora_fin: {
                    gte: now
                }
            },
            orderBy: { id_sesion: 'desc' }
        });

        console.log("Checking active session for Ficha:", ficha); // DEBUG
        console.log("Current Server Time:", now.toString()); // DEBUG

        if (sesion) {
            console.log("Found Session:", sesion); // DEBUG
            console.log("Session End Time:", sesion.hora_fin.toString()); // DEBUG
            res.json({ active: true, sesionId: sesion.id_sesion, minutosRestantes: Math.floor((new Date(sesion.hora_fin).getTime() - now.getTime()) / 60000) });
        } else {
            console.log("No active session found."); // DEBUG
            res.json({ active: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verificando sesión' });
    }
};

// Registrar Asistencia (Aprendiz)
export const registerAttendance = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { sesionId } = req.body; // El frontend debería saber la sesión activa o la buscamos

    if (!userId) {
        res.status(401).json({ message: 'No autorizado' });
        return;
    }

    try {
        // En un caso real, buscaríamos la Configuración del usuario.
        // Simularemos creando una si no existe o usando una dummy vinculada al user ID.
        // Asumiendo que fk_id_matricula es el userId para este MVP.

        // Primero intentamos buscar una confiuracion existente
        let config = await prisma.configuracion.findFirst({
            where: { fk_id_matricula: userId }
        });

        // Si no existe, la creamos (Logic Auto-provisioning)
        if (!config) {
            config = await prisma.configuracion.create({
                data: {
                    firma: 'pending.png',
                    foto: 'pending.png',
                    fk_id_matricula: userId
                }
            });
        }

        // Buscar sesión active si no se pasa ID (opcional)
        // Por ahora requerimos sesionId o asumimos la última creada
        const sesion = await prisma.sesion.findFirst({
            orderBy: { id_sesion: 'desc' }
        });

        if (!sesion) {
            res.status(404).json({ message: 'No hay sesión activa' });
            return;
        }

        const asistencia = await prisma.asistencia.create({
            data: {
                fk_id_sesion: sesion.id_sesion,
                fk_id_configuracion: config.id_configuracion,
                hora: new Date(),
                estado_aprendiz: 'asistio',
                observaciones: 'Registro exitoso'
            }
        });

        res.json({ message: 'Asistencia registrada', asistencia });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registrando asistencia' });
    }
};

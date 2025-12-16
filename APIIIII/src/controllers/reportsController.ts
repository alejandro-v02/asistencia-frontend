import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getReport = async (req: Request, res: Response): Promise<void> => {
    const { ficha, fecha } = req.query;

    try {
        const asistencias = await prisma.asistencia.findMany({
            where: {
                estado_aprendiz: 'asistio',
                sesion: {
                    // Filtrar por fecha de sesión si se provee
                    ...(fecha ? { fecha: new Date(String(fecha)) } : {})
                }
            },
            include: {
                configuracion: true, // Incluir datos del aprendiz (firma, foto, matricula)
                sesion: true
            }
        });

        res.json(asistencias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generando reporte' });
    }
};

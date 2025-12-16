import { Router } from 'express';
import { verifyToken, isInstructor } from '../middlewares/authMiddleware';
import { enableAttendance, registerAttendance, checkActiveSession } from '../controllers/attendanceController';
import { getReport } from '../controllers/reportsController';

const router = Router();

// Asistencia
router.post('/asistencia/habilitar', verifyToken, isInstructor, enableAttendance);
router.post('/asistencia/registrar', verifyToken, registerAttendance);
router.get('/asistencia/sesion-activa', verifyToken, checkActiveSession);

// Reportes
router.get('/reportes', verifyToken, isInstructor, getReport);

export default router;

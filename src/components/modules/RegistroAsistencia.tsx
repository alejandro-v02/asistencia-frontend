import { useState, useEffect } from "react";
import ApprenticeProfileHeader from "../organisms/ApprenticeProfileHeader";
import AttendanceConfirmationCard from "../organisms/AttendanceConfirmationCard";
import client from "../../api/client";

export default function RegistroAsistencia() {

    const aprendizMock = {
        nombre: "Jhan Carlos",
        programa: "Análisis y Desarrollo de Software",
        ficha: "2620000",
        inicioLectiva: "2024-01-20",
        finLectiva: "2025-06-20",
        foto: "https://ui-avatars.com/api/?name=Juan+Perez&background=0D8ABC&color=fff"
    };

    const [confirmado, setConfirmado] = useState(false);
    const [sesionActiva, setSesionActiva] = useState<number | null>(null);
    const [minutosRestantes, setMinutosRestantes] = useState<number>(0);
    const [sesionesRegistradas, setSesionesRegistradas] = useState<number[]>([]);

    useEffect(() => {
        const checkSession = async () => {
            try {
            
                const res = await client.get('/api/asistencia/sesion-activa', {
                    params: { ficha: aprendizMock.ficha }
                });

             
                if (res.data.active && !sesionesRegistradas.includes(res.data.sesionId)) {
                    setSesionActiva(res.data.sesionId);
                    setMinutosRestantes(res.data.minutosRestantes);
                } else {
                    setSesionActiva(null);
                }
            } catch (error) {
                console.error("Error buscando sesiones", error);
            }
        };

        checkSession();
        const interval = setInterval(checkSession, 5000);
        return () => clearInterval(interval);
    }, [aprendizMock.ficha, sesionesRegistradas]);

    const handleGuardar = async () => {
        if (confirmado && sesionActiva) {
            try {
                await client.post('/api/asistencia/registrar', { sesionId: sesionActiva });
                alert("Asistencia registrada exitosamente");

                setSesionesRegistradas(prev => [...prev, sesionActiva]);
                setSesionActiva(null);
                setConfirmado(false);
            } catch (e) {
                console.error(e);
                alert("Error registrando asistencia");
            }
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center md:text-left">
                Registro de Asistencia
            </h1>

            <ApprenticeProfileHeader aprendiz={aprendizMock} />

            <div className="mt-8">
                {sesionActiva ? (
                    <div className="animate-fade-in">
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">¡Clase Activa! </strong>
                            <span className="block sm:inline">Quedan {minutosRestantes} minutos para registrar tu asistencia.</span>
                        </div>
                        <AttendanceConfirmationCard
                            resultado="Diseñar la arquitectura de software"
                            periodoInicio="2025-04-01"
                            periodoFin="2025-04-15"
                            confirmado={confirmado}
                            onConfirmChange={setConfirmado}
                            onGuardar={handleGuardar}
                        />
                    </div>
                ) : (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    No hay sesiones de asistencia activas para tu ficha ({aprendizMock.ficha}) en este momento.
                                    <br />
                                    El instructor debe habilitar la asistencia.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

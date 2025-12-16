import { useState } from "react";
import Card from "../atoms/Card";
import AttendanceTimerControl from "../molecules/AttendanceTimerControl";
import Input from "../atoms/UserInput";
import client from "../../api/client";

export default function AttendanceEnabler() {
    const [ficha, setFicha] = useState("");

    const handleEnable = async (minutes: number) => {
        if (!ficha) {
            alert("Debe ingresar el número de ficha");
            return;
        }

        try {
            await client.post('/api/asistencia/habilitar', {
                ficha,
                minutos: minutes,
                fecha: new Date().toISOString().split('T')[0]
            });
            alert("Asistencia habilitada correctamente");
        } catch (e: any) {
            console.error(e);
            alert(e.response?.data?.message || "Error al conectar con el servidor");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <h2 className="text-xl font-bold text-blue-800 mb-6">Configuración de Clase</h2>
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Ficha a Habilitar</label>
                    <Input
                        value={ficha}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFicha(e.target.value)}
                        placeholder="Ej: 2620000"
                    />
                    <p className="text-xs text-gray-500 mt-2">Esta acción habilitará el registro para todos los aprendices de esta ficha.</p>
                </div>
            </Card>

            <AttendanceTimerControl onEnable={handleEnable} />
        </div>
    );
}

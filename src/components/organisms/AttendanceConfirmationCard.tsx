
import Card from "../atoms/Card";
import CheckboxGroup from "../molecules/CheckboxGroup";
import InfoField from "../molecules/InfoField";
import Button from "../atoms/Button";

interface AttendanceConfirmationCardProps {
    resultado: string;
    periodoInicio: string;
    periodoFin: string;
    confirmado: boolean;
    onConfirmChange: (checked: boolean) => void;
    onGuardar: () => void;
}

export default function AttendanceConfirmationCard({
    resultado,
    periodoInicio,
    periodoFin,
    confirmado,
    onConfirmChange,
    onGuardar
}: AttendanceConfirmationCardProps) {

    return (
        <Card className="max-w-3xl mx-auto border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Registrar Asistencia</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <InfoField label="Resultado de Aprendizaje" value={resultado} />
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <InfoField label="Período Actual" value={`${periodoInicio} - ${periodoFin}`} />
                </div>
            </div>

            <div className="my-8 flex justify-center">
                <CheckboxGroup
                    label="Confirmar Asistencia"
                    checked={confirmado}
                    onChange={(e) => onConfirmChange(e.target.checked)}
                />
            </div>

            <div className="flex justify-end mt-4">
                <div className="w-full md:w-1/3">
                    <Button onClick={onGuardar} disabled={!confirmado} className={!confirmado ? "opacity-50 cursor-not-allowed bg-gray-400" : ""}>
                        Guardar Confirmación
                    </Button>
                </div>
            </div>
        </Card>
    );
}

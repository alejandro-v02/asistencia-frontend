import InfoField from "../molecules/InfoField";
import Card from "../atoms/Card";

interface ApprenticeProfileHeaderProps {
    aprendiz: {
        nombre: string;
        programa: string;
        ficha: string;
        foto?: string;
        inicioLectiva: string;
        finLectiva: string;
    };
}

export default function ApprenticeProfileHeader({ aprendiz }: ApprenticeProfileHeaderProps) {
    return (
        <Card className="mb-6 border-l-4 border-blue-600">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {}
                <div className="flex-shrink-0">
                    {aprendiz.foto ? (
                        <img
                            src={aprendiz.foto}
                            alt={aprendiz.nombre}
                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-sm">
                            {aprendiz.nombre.charAt(0)}
                        </div>
                    )}
                </div>

                {}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <InfoField label="Aprendiz" value={aprendiz.nombre} />
                    <InfoField label="Programa de Formación" value={aprendiz.programa} />
                    <InfoField label="Ficha" value={aprendiz.ficha} />

                    <div className="flex flex-col gap-2">
                        <InfoField label="Inicio Etapa Lectiva" value={aprendiz.inicioLectiva} />
                        <InfoField label="Fin Etapa Lectiva" value={aprendiz.finLectiva} />
                    </div>
                </div>
            </div>
        </Card>
    );
}

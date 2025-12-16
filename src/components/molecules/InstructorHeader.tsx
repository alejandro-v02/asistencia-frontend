import Card from "../atoms/Card";


interface InstructorHeaderProps {
    instructor: {
        nombre: string;
        documento: string;
        foto?: string;
    };
}

export default function InstructorHeader({ instructor }: InstructorHeaderProps) {
    return (
        <Card className="mb-6 border-l-4 border-orange-500 flex flex-col md:flex-row justify-between items-center p-4">
            <div className="flex items-center gap-4">
                {instructor.foto ? (
                    <img src={instructor.foto} alt="Instructor" className="w-16 h-16 rounded-full border-2 border-gray-200" />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl border-2 border-white shadow">
                        {instructor.nombre.charAt(0)}
                    </div>
                )}

                <div>
                    <h2 className="text-lg font-bold text-gray-800">{instructor.nombre}</h2>
                    <div className="flex gap-4 mt-1">
                        <span className="text-sm bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">INSTRUCTOR</span>
                        <span className="text-sm text-gray-500">Doc: {instructor.documento}</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 md:mt-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sena_Colombia_logo.svg/200px-Sena_Colombia_logo.svg.png" alt="SENA Logo" className="h-12 w-auto opacity-80" />
            </div>
        </Card>
    );
}

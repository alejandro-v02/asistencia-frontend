import { useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/UserInput";

interface SearchFiltersProps {
    onSearch: (ficha: string, fecha: string) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
    const [ficha, setFicha] = useState("");
    const [fecha, setFecha] = useState("");

    const handleSearch = () => {
        if (ficha && fecha) {
            onSearch(ficha, fecha);
        } else {
            alert("Por favor ingrese ficha y fecha");
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 items-end bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="w-full md:w-1/3">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Número de Curso (Ficha)</label>
                <Input
                    placeholder=""
                    value={ficha}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFicha(e.target.value)}
                />
            </div>

            <div className="w-full md:w-1/3">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Fecha</label>
                <Input
                    type="date"
                    value={fecha}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFecha(e.target.value)}
                />
            </div>

            <div className="w-full md:w-1/3">
                <Button onClick={handleSearch} className="h-10">
                    Buscar Reporte
                </Button>
            </div>
        </div>
    );
}

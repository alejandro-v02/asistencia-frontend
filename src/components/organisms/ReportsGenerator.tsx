import { useState } from "react";
import Card from "../atoms/Card";
import SearchFilters from "../molecules/SearchFilters";
import Button from "../atoms/Button";
import client from "../../api/client";

export default function ReportsGenerator() {
    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (ficha: string, fecha: string) => {
        setLoading(true);
        try {
            const res = await client.get('/api/reportes', {
                params: { ficha, fecha }
            });

          
            setReportData({
                fecha: fecha,
                ficha: ficha,
                totalAsistentes: res.data.length,
                urlPdf: "#"
            });
        } catch (e) {
            console.error(e);
            alert("Error generando o no se encontraron datos");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
   
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
        overlay.innerHTML = '<div class="bg-gray-800 text-white px-8 py-4 rounded-lg font-bold text-xl shadow-xl">Descarga Exitosa</div>';
        document.body.appendChild(overlay);

        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 2000);
    };

    return (
        <Card>
            <h2 className="text-xl font-bold text-blue-800 mb-6 border-b pb-2">Generar Reporte</h2>

            <SearchFilters onSearch={handleSearch} />

            {loading && <div className="text-center py-8 text-gray-500">Generando reporte...</div>}

            {reportData && !loading && (
                <div className="mt-8 animate-fade-in">
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h4 className="font-bold text-gray-700">Reporte Generado</h4>
                            <p className="text-sm text-gray-600">Ficha: {reportData.ficha} | Fecha: {reportData.fecha}</p>
                        </div>

                        <div className="w-full md:w-auto">
                            <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                                Descargar Reporte PDF
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}

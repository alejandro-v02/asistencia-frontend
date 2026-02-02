import Header from "../components/organisms/Header";
import SidebarAprendiz from "../components/organisms/SidebarAprendiz";
import { Routes, Route } from "react-router-dom";
import senaImage from "../assets/img/sena.jpg";
import AsistenciasAprendiz from "../components/modules/AsistenciasAprendiz";
import ReportesAprendiz from "../components/modules/ReportesAprendiz";

export default function DashboardTemplateAprendiz() {
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <SidebarAprendiz />

        <main className="flex-1 bg-white rounded-3xl m-2 ml-2 p-4 shadow-sm border border-gray-100 overflow-y-auto">
          <Routes>
            <Route
              index
              element={
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="relative h-80 w-full rounded-[2rem] overflow-hidden shadow-lg">
                    <img 
                      src={senaImage}
                      alt="SENA Formación" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center p-12">
                      <div className="text-white">
                        <h2 className="text-4xl font-bold mb-2">Bienvenido al Sistema</h2>
                        <p className="text-lg opacity-90">Gestión de asistencia y centros de formación profesional.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                      <h3 className="text-blue-700 font-bold text-lg">Usuarios</h3>
                      <p className="text-sm text-blue-600/70">Administra el personal y aprendices.</p>
                    </div>
                    <div className="p-6 bg-green-50 rounded-3xl border border-green-100">
                      <h3 className="text-green-700 font-bold text-lg">Asistencias</h3>
                      <p className="text-sm text-green-600/70">Registro diario de entradas y salidas.</p>
                    </div>
                    <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                      <h3 className="text-orange-700 font-bold text-lg">Centros</h3>
                      <p className="text-sm text-orange-600/70">Configuración de sedes de formación.</p>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="asistencias" element={<AsistenciasAprendiz />} />
            <Route path="reportes" element={<ReportesAprendiz />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
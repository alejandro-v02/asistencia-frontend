import CentroInputGroup from "../molecules/CentroInputGroup";
import CentroSelectGroup from "../molecules/CentroSelectGroup";
// import Button from "../atoms/Button";
import { X, MapPin } from "lucide-react";

export default function SedeForm({ nombre, setNombre, centroFk, setCentroFk, centros, onSubmit, cerrar }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 relative animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={cerrar}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={20} className="text-blue-600" />
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Registrar Sede
            </h2>
          </div>
          <p className="text-slate-500 text-sm">Vincula una nueva sede a un centro de formación.</p>
          <div className="w-10 h-1 bg-blue-600 mt-3 rounded-full"></div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <CentroInputGroup
              label="Nombre de la Sede"
              value={nombre}
              placeholder="Ej: Sede Norte"
              onChange={(e: any) => setNombre(e.target.value)}
            />

            <CentroSelectGroup
              label="Asignar Centro de Formación"
              value={centroFk}
              onChange={(e: any) => setCentroFk(e.target.value)}
            >
              <option value="">Seleccione un centro</option>
              {centros.map((c: any) => (
                <option key={c.id_centro} value={c.id_centro}>
                  {c.nombre}
                </option>
              ))}
            </CentroSelectGroup>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
            <button
              type="button"
              onClick={cerrar}
              className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all active:scale-95"
            >
              Guardar Sede
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
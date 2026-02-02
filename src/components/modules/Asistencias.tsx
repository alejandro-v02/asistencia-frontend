import PageTitle from "../atoms/PageTitle";
import ActionHeader from "../molecules/ActionHeader";

export default function Asistencias() {
  return (
    <div className="w-full px-6 py-8">
      <ActionHeader>
        <PageTitle title="Control de" highlight="Asistencias" subtitle="Registro y monitoreo de la asistencia diaria." />

        {/* Placeholder para acciones futuras */}
        <div></div>
      </ActionHeader>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
        <p className="text-slate-500 mb-4">Seleccione una opción para comenzar a gestionar asistencias.</p>
        <div className="inline-flex gap-4">
          <button className="px-6 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition">
            Ver Reportes
          </button>
        </div>
      </div>
    </div>
  );
}
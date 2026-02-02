import PageTitle from "../atoms/PageTitle";
import ActionHeader from "../molecules/ActionHeader";

export default function ReportesAprendiz() {
  return (
    <div className="w-full px-6 py-8">
      <ActionHeader>
        <PageTitle title="Mis" highlight="Reportes" subtitle="Consulta tu historial de asistencias." />
      </ActionHeader>

      <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm text-center">
        <p className="text-gray-500">Próximamente: Historial detallado de tus asistencias.</p>
      </div>
    </div>
  );
}
import PageTitle from "../atoms/PageTitle";
import ActionHeader from "../molecules/ActionHeader";

export default function ReportesInstru() {
  return (
    <div className="w-full px-6 py-8">
      <ActionHeader>
        <PageTitle title="Reportes y" highlight="Estadísticas" subtitle="Visualiza el rendimiento y asistencia." />
      </ActionHeader>

      <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm text-center">
        <p className="text-gray-500">Próximamente: Gráficos y exportación de datos.</p>
      </div>
    </div>
  );
}
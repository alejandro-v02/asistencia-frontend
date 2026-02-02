import AsistenciasActivasAprendiz from "../organisms/AsistenciasActivasAprendiz";
import PageTitle from "../atoms/PageTitle";
import ActionHeader from "../molecules/ActionHeader";

export default function AsistenciasAprendiz() {
  const asistencias = [
    {
      curso: "ADSO",
      ficha: "2698765",
      ambiente: "Aula 305",
      horaInicio: "07:00",
      horaFin: "09:00",
      duracion: 15,
    },
  ];

  return (
    <div className="w-full px-6 py-8">
      <ActionHeader>
        <PageTitle title="Módulo de" highlight="Asistencias" subtitle="Revisa y confirma tus asistencias activas." />
      </ActionHeader>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <AsistenciasActivasAprendiz asistencias={asistencias} />
      </div>
    </div>
  );
}

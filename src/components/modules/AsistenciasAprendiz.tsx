import AsistenciasActivasAprendiz from "../organisms/AsistenciasActivasAprendiz";

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
    <div className="bg-white p-8 rounded-3xl shadow-sm">

      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-blue-600">
          Módulo de Asistencias
        </h2>
        <p className="text-gray-600 mt-2">
          Revisa y confirma tus asistencias activas
        </p>
      </div>

      <AsistenciasActivasAprendiz asistencias={asistencias} />
    </div>
  );
}

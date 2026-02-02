import AsistenciaCardInstru from "../molecules/AsistenciaCardInstru";

interface Props {
  asistencias: any[];
}

export default function AsistenciasActivasInstru({ asistencias }: Props) {
  if (asistencias.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No hay asistencias activas
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {asistencias.map((a, index) => (
        <AsistenciaCardInstru
          key={index}
          ficha={a.ficha}
          programa={a.curso}
          horaInicio={a.horaInicio}
          horaFin={a.horaFin}
          onOpenInfo={() => {}}
        />
      ))}
    </div>
  );
}

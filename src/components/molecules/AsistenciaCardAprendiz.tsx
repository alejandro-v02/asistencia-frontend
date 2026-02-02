import BadgeEstadoAprendiz from "../atoms/BadgeEstadoAprendiz";

interface Props {
  asistencia: any;
  onClick: () => void;
}

export default function AsistenciaCardAprendiz({
  asistencia,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        border
        rounded-2xl
        p-6
        bg-white
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
        hover:border-blue-500
      "
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-blue-600">
          {asistencia.curso}
        </h3>
        <BadgeEstadoAprendiz estado="activa" />
      </div>

      <p className="text-sm text-gray-600">Ficha: {asistencia.ficha}</p>
      <p className="text-sm text-gray-600">
        {asistencia.horaInicio} - {asistencia.horaFin}
      </p>
    </div>
  );
}

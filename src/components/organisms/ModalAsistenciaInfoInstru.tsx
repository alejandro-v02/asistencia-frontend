interface Props {
  open: boolean;
  onClose: () => void;
  asistencia: {
    ficha: string;
    programa: string;
    horaInicio: string;
    horaFin: string;
  } | null;
}

export default function ModalAsistenciaInfoInstru({
  open,
  onClose,
  asistencia,
}: Props) {
  if (!open || !asistencia) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl space-y-6">

        <h3 className="text-2xl font-bold text-center text-blue-600">
          Información de la Asistencia
        </h3>

        <div className="border border-gray-200 rounded-2xl p-4 space-y-2 bg-gray-50 text-gray-700">
          <p><strong>Programa:</strong> {asistencia.programa}</p>
          <p><strong>Ficha:</strong> {asistencia.ficha}</p>
          <p><strong>Hora inicio:</strong> {asistencia.horaInicio}</p>
          <p><strong>Hora fin:</strong> {asistencia.horaFin}</p>
          <p>
            <strong>Estado:</strong>{" "}
            <span className="text-blue-600 font-semibold">
              Activa
            </span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="
            w-full
            bg-blue-600
            text-white
            py-2
            rounded-xl
            hover:bg-blue-700
            transition
            shadow-lg shadow-blue-200
            font-bold
          ">
          Cerrar
        </button>
      </div>
    </div>
  );
}

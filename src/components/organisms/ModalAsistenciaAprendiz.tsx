import { useState } from "react";
import CountdownAprendiz from "../atoms/CountdownAprendiz";

interface Props {
  open: boolean;
  onClose: () => void;
  asistencia: any | null;
}

export default function ModalAsistenciaAprendiz({
  open,
  onClose,
  asistencia,
}: Props) {
  const [confirmado, setConfirmado] = useState(false);

  if (!open || !asistencia) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center backdrop-blur-sm justify-center z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4">
        <h3 className="text-2xl font-bold text-center text-blue-600">
          Asistencia Activa
        </h3>

        <div className="bg-gray-50 border rounded-2xl p-4 space-y-2">
          <p><strong>Curso:</strong> {asistencia.curso}</p>
          <p><strong>Ficha:</strong> {asistencia.ficha}</p>
          <p><strong>Ambiente:</strong> {asistencia.ambiente}</p>
          <p>
            <strong>Horario:</strong>{" "}
            {asistencia.horaInicio} - {asistencia.horaFin}
          </p>

          <CountdownAprendiz 
            key={asistencia.id} 
            minutos={asistencia.duracion} 
          />
        </div>

        <button
          disabled={confirmado}
          onClick={() => setConfirmado(true)}
          className={`
            w-full py-2 rounded-xl font-bold transition
            ${confirmado
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-800"
            }
          `}
        >
          {confirmado ? "Asistencia confirmada ✓" : "Confirmar asistencia"}
        </button>

        <button
          onClick={onClose}
          className="w-full text-gray-500 mt-2 hover:text-gray-700 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
import { useState } from "react";
import ButtonPrimaryInstru from "../atoms/ButtonPrimaryInstru";

interface Props {
  open: boolean;
  onClose: () => void;
  onIniciar: (data: any) => void;
}

export default function ModalNuevaAsistenciaInstru({
  open,
  onClose,
  onIniciar,
}: Props) {
  if (!open) return null;

  const [search, setSearch] = useState("");

  // Asistencia actual
  const data = {
    curso: "ADSO",
    ficha: "2698765",
    ambiente: "Aula 305",
    horaInicio: "07:00",
    horaFin: "09:00",
  };

  // Asistencias siguientes
  const siguientes = [
    {
      id: 1,
      curso: "ADSO",
      ficha: "2698765",
      ambiente: "Aula 305",
      horario: "09:00 - 11:00",
    },
    {
      id: 2,
      curso: "ADSO",
      ficha: "2698765",
      ambiente: "Aula 204",
      horario: "13:00 - 15:00",
    },
  ];

  const filtradas = siguientes.filter((s) =>
    s.ambiente.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-xl space-y-6 shadow-xl">

        {/* TÍTULO */}
        <h3 className="text-2xl font-bold text-center text-blue-600">
          Nueva Asistencia
        </h3>

        {/* ASISTENCIA ACTUAL */}
        <div className="border border-gray-200 rounded-2xl p-4 space-y-2 bg-gray-50">
          <h1 className="text-lg font-semibold text-blue-600">Asistencia de Hoy</h1>
          <p><strong>Curso:</strong> {data.curso}</p>
          <p><strong>Ficha:</strong> {data.ficha}</p>
          <p><strong>Ambiente:</strong> {data.ambiente}</p>
          <p>
            <strong>Horario:</strong> {data.horaInicio} - {data.horaFin}
          </p>

          <ButtonPrimaryInstru
            text="Iniciar asistencia"
            onClick={() => onIniciar(data)}
          />
        </div>

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar próximas asistencias..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            px-4 py-2
            border border-gray-300
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* ASISTENCIAS SIGUIENTES */}
        <div className="space-y-3 max-h-40 overflow-y-auto">
          {filtradas.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              No hay asistencias siguientes
            </p>
          )}

          {filtradas.map((s) => (
            <div
              key={s.id}
              className="border border-gray-200 rounded-xl p-3 bg-white shadow-sm"
            >
              <p><strong>Curso:</strong> {s.curso}</p>
              <p><strong>Ficha:</strong> {s.ficha}</p>
              <p><strong>Ambiente:</strong> {s.ambiente}</p>
              <p><strong>Horario:</strong> {s.horario}</p>
            </div>
          ))}
        </div>

        {/* CANCELAR */}
        <button
          onClick={onClose}
          className="w-full text-gray-600 hover:text-gray-800 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

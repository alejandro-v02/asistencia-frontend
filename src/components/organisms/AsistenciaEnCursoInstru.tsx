interface Props {
  asistencia: any;
  onFinalizar: () => void;
}

export default function AsistenciaEnCursoInstru({
  asistencia,
  onFinalizar,
}: Props) {
  return (
    <div className="mt-6 space-y-6">

      {/* ENCABEZADO */}
      <div>
        <h2 className="text-2xl font-bold text-blue-600">
          {asistencia.curso} - Ficha {asistencia.ficha}
        </h2>
        <p className="text-gray-600">
          Ambiente: {asistencia.ambiente}
        </p>
      </div>

      {/* TABLA */}
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-center">Documento</th>
              <th className="p-3 text-center">Asistió</th>
            </tr>
          </thead>
          <tbody>
            {asistencia.aprendices.map((a: any) => (
              <tr
                key={a.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{a.nombre}</td>
                <td className="p-3 text-center">{a.documento}</td>
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    className="accent-blue-600 w-4 h-4"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BOTÓN FINALIZAR */}
      <div className="flex justify-end">
        <button
          onClick={onFinalizar}
          className="
            px-6 py-2
            bg-blue-600 text-white
            rounded-xl
            hover:bg-blue-700
            transition
            shadow-lg shadow-blue-200
            font-bold
          "
        >
          Listo
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import AsistenciaCardAprendiz from "../molecules/AsistenciaCardAprendiz";
import ModalAsistenciaAprendiz from "../organisms/ModalAsistenciaAprendiz";

interface Props {
  asistencias: any[];
}

export default function AsistenciasActivasAprendiz({ asistencias }: Props) {
  const [seleccionada, setSeleccionada] = useState<any>(null);

  if (asistencias.length === 0) {
    return (
      <div className="mt-12 text-center p-10 border border-dashed rounded-3xl bg-gray-50">
        <p className="text-lg font-semibold text-gray-600">
          No hay asistencias activas
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Cuando el instructor inicie una, aparecerá aquí
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {asistencias.map((a, i) => (
          <AsistenciaCardAprendiz
            key={i}
            asistencia={a}
            onClick={() => setSeleccionada(a)}
          />
        ))}
      </div>

      <ModalAsistenciaAprendiz
        open={!!seleccionada}
        asistencia={seleccionada}
        onClose={() => setSeleccionada(null)}
      />
    </>
  );
}

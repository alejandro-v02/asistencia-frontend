// ORGANISM - INSTRUCTOR
// Lista de asistencias finalizadas

interface AsistenciasActivasInstruProps {
  asistencias: any[];
  onSeleccionar?: (asistencia: any) => void;
}

export default function AsistenciasActivasInstru({ 
  asistencias,
  onSeleccionar
}: AsistenciasActivasInstruProps) {
  
  if (asistencias.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-lg font-medium">No hay asistencias finalizadas hoy</p>
        <p className="text-sm mt-2">Las asistencias finalizadas aparecerán aquí</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Asistencias Finalizadas Hoy
      </h3>
      
      {asistencias.map((asistencia, index) => (
        <div
          key={asistencia.id_asistencia || index}
          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white"
          onClick={() => onSeleccionar && onSeleccionar(asistencia)}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800 text-lg">
                Asistencia #{asistencia.id_asistencia}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Fecha:</strong> {new Date(asistencia.fecha).toLocaleDateString('es-CO')}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Horario:</strong> {asistencia.dia_semana} - {asistencia.hora_inicio?.slice(0, 5)} a {asistencia.hora_fin?.slice(0, 5)}
              </p>
              {asistencia.observaciones && (
                <p className="text-sm text-gray-500 mt-2">
                  {asistencia.observaciones}
                </p>
              )}
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              FINALIZADA
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
// MOLECULE - INSTRUCTOR
// Tarjeta de aprendiz con botones de marcar asistencia

interface AprendizCardProps {
  aprendiz: {
    id_formacion: number;
    estado: string;
    persona?: {
      nombres: string;
      documento: number | string;
    };
    hora_registro?: string;
  };
  onMarcar: (id: number, estado: string) => void;
  disabled?: boolean;
}

export default function AprendizCard({ aprendiz, onMarcar, disabled = false }: AprendizCardProps) {
  // Colores según el estado
  const estadoStyles = {
    PENDIENTE: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      badge: 'bg-yellow-500 text-white',
      icon: '⏳'
    },
    PRESENTE: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      badge: 'bg-green-600 text-white',
      icon: '✓'
    },
    AUSENTE: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      badge: 'bg-red-600 text-white',
      icon: '✗'
    }
  };

  const style = estadoStyles[aprendiz.estado as keyof typeof estadoStyles] || estadoStyles.PENDIENTE;

  return (
    <div className={`p-4 border-2 rounded-xl ${style.bg} ${style.border} transition-all hover:shadow-md`}>
      <div className="flex justify-between items-center">
        {/* Información del Aprendiz */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${style.badge} flex items-center justify-center text-xl font-bold shadow-lg`}>
              {style.icon}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg">
                {aprendiz.persona?.nombres || 'Cargando...'}
              </p>
              <p className="text-sm text-gray-600">
                Doc: <span className="font-medium">{aprendiz.persona?.documento || '---'}</span>
              </p>
            </div>
          </div>
          
          <div className="mt-2 flex items-center gap-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${style.badge}`}>
              {aprendiz.estado}
            </span>
            
            {aprendiz.hora_registro && (
              <p className="text-xs text-gray-500">
                Registrado: {new Date(aprendiz.hora_registro).toLocaleTimeString('es-CO', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            )}
          </div>
        </div>

        {/* Botones de Acción (solo si está pendiente) */}
        {aprendiz.estado === 'PENDIENTE' && !disabled && (
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onMarcar(aprendiz.id_formacion, 'PRESENTE')}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
            >
              ✓ Presente
            </button>
            <button
              onClick={() => onMarcar(aprendiz.id_formacion, 'AUSENTE')}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
            >
              ✗ Ausente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
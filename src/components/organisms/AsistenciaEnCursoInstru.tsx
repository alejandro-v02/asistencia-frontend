// ORGANISM - INSTRUCTOR
// Vista de asistencia en curso con listado de aprendices

import axios from 'axios';
import Cookies from 'js-cookie';
import ButtonInstru from '../atoms/ButtonInstru';
import AprendizCard from '../molecules/AprendizCard';

interface AsistenciaEnCursoInstruProps {
  asistencia: any;
  onFinalizar: () => void;
  onActualizar: () => void;
  loading?: boolean;
}

export default function AsistenciaEnCursoInstru({ 
  asistencia, 
  onFinalizar,
  onActualizar,
  loading = false
}: AsistenciaEnCursoInstruProps) {
  
  const marcarAsistencia = async (idFormacion: number, estado: string) => {
    try {
      await axios.put(
        `http://localhost:3001/instructor/formacion/${idFormacion}/marcar`,
        { estado },
        {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        }
      );
      
      // Actualizar la vista
      onActualizar();
    } catch (error: any) {
      console.error('Error marcando asistencia:', error);
      alert(error.response?.data?.error || 'Error al marcar asistencia');
    }
  };

  const handleFinalizar = async () => {
    const pendientes = asistencia.aprendices?.filter((a: any) => a.estado === 'PENDIENTE').length || 0;
    
    let mensaje = '¿Está seguro de finalizar esta asistencia?';
    if (pendientes > 0) {
      mensaje += `\n\n${pendientes} aprendiz(es) pendiente(s) quedarán como AUSENTES.`;
    }

    if (!confirm(mensaje)) {
      return;
    }

    try {
      await axios.put(
        `http://localhost:3001/instructor/asistencia/${asistencia.id_asistencia}/finalizar`,
        {},
        {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        }
      );

      alert('Asistencia finalizada correctamente');
      onFinalizar();
    } catch (error: any) {
      console.error('Error finalizando asistencia:', error);
      alert(error.response?.data?.error || 'Error al finalizar asistencia');
    }
  };

  // Calcular estadísticas
  const contadores = {
    total: asistencia.aprendices?.length || 0,
    presentes: asistencia.aprendices?.filter((a: any) => a.estado === 'PRESENTE').length || 0,
    ausentes: asistencia.aprendices?.filter((a: any) => a.estado === 'AUSENTE').length || 0,
    pendientes: asistencia.aprendices?.filter((a: any) => a.estado === 'PENDIENTE').length || 0
  };

  return (
    <div>
      {/* Encabezado */}
      <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              📋 Asistencia en Curso
            </h2>
            <div className="space-y-1 text-blue-800">
              <p>
                <strong>Fecha:</strong> {new Date(asistencia.fecha).toLocaleDateString('es-CO', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p>
                <strong>Horario:</strong> {asistencia.dia_semana} - {asistencia.hora_inicio?.slice(0, 5)} a {asistencia.hora_fin?.slice(0, 5)}
              </p>
              {asistencia.observaciones && (
                <p>
                  <strong>Observaciones:</strong> {asistencia.observaciones}
                </p>
              )}
            </div>
          </div>
          <span className="px-4 py-2 bg-green-500 text-white font-bold rounded-full text-sm shadow-lg">
            ACTIVA
          </span>
        </div>
      </div>

      {/* Contadores */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm border border-gray-200">
          <p className="text-3xl font-bold text-gray-800">{contadores.total}</p>
          <p className="text-sm text-gray-600 font-medium mt-1">Total Aprendices</p>
        </div>
        <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm border border-green-200">
          <p className="text-3xl font-bold text-green-800">{contadores.presentes}</p>
          <p className="text-sm text-green-700 font-medium mt-1">Presentes ✓</p>
        </div>
        <div className="p-5 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm border border-red-200">
          <p className="text-3xl font-bold text-red-800">{contadores.ausentes}</p>
          <p className="text-sm text-red-700 font-medium mt-1">Ausentes ✗</p>
        </div>
        <div className="p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm border border-yellow-200">
          <p className="text-3xl font-bold text-yellow-800">{contadores.pendientes}</p>
          <p className="text-sm text-yellow-700 font-medium mt-1">Pendientes ⏳</p>
        </div>
      </div>

      {/* Lista de Aprendices */}
      <div className="space-y-3 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Listado de Aprendices
        </h3>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Actualizando...</p>
          </div>
        ) : asistencia.aprendices && asistencia.aprendices.length > 0 ? (
          asistencia.aprendices.map((aprendiz: any) => (
            <AprendizCard
              key={aprendiz.id_formacion}
              aprendiz={aprendiz}
              onMarcar={marcarAsistencia}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No hay aprendices registrados en este curso</p>
          </div>
        )}
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <ButtonInstru
          text="✓ Finalizar Asistencia"
          variant="success"
          onClick={handleFinalizar}
          disabled={loading}
        />
        <ButtonInstru
          text="🔄 Actualizar"
          variant="secondary"
          onClick={onActualizar}
          disabled={loading}
        />
      </div>

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>💡 Recuerda:</strong> Al finalizar, todos los aprendices en estado "Pendiente" quedarán automáticamente como "Ausentes".
        </p>
      </div>
    </div>
  );
}
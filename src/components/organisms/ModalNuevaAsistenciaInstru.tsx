// ORGANISM - INSTRUCTOR
// Modal para crear nueva asistencia

import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ButtonInstru from '../atoms/ButtonInstru';

interface ModalNuevaAsistenciaInstruProps {
  open: boolean;
  onClose: () => void;
  onIniciar: (asistencia: any) => void;
}

export default function ModalNuevaAsistenciaInstru({ 
  open, 
  onClose, 
  onIniciar 
}: ModalNuevaAsistenciaInstruProps) {
  const [horarios, setHorarios] = useState<any[]>([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingHorarios, setLoadingHorarios] = useState(false);

  useEffect(() => {
    if (open) {
      cargarHorarios();
      setHorarioSeleccionado('');
      setObservaciones('');
    }
  }, [open]);

  const cargarHorarios = async () => {
    setLoadingHorarios(true);
    try {
      const res = await axios.get('http://localhost:3001/instructor/horarios', {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` }
      });
      setHorarios(res.data);
    } catch (error: any) {
      console.error('Error cargando horarios:', error);
      alert(error.response?.data?.error || 'Error al cargar horarios');
    } finally {
      setLoadingHorarios(false);
    }
  };

  const handleIniciar = async () => {
    if (!horarioSeleccionado) {
      alert('Por favor seleccione un horario');
      return;
    }

    setLoading(true);
    try {
      // Crear la asistencia en el backend
      const res = await axios.post(
        'http://localhost:3001/instructor/asistencia/crear',
        {
          horario_fk: parseInt(horarioSeleccionado),
          observaciones: observaciones || null
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        }
      );

      if (res.data.status === 200) {
        // Obtener la asistencia creada con los aprendices
        const asistenciaRes = await axios.get(
          `http://localhost:3001/instructor/asistencia/${res.data.id_formacion}`,
          {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` }
          }
        );

        // Pasar la asistencia al componente padre
        onIniciar(asistenciaRes.data);
      }
    } catch (error: any) {
      console.error('Error creando asistencia:', error);
      const errorMsg = error.response?.data?.error || 'Error al crear asistencia';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Nueva Asistencia</h2>

        <div className="space-y-4">
          {/* Selector de Horario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Horario *
            </label>
            {loadingHorarios ? (
              <div className="text-center py-4 text-gray-500">
                Cargando horarios...
              </div>
            ) : horarios.length === 0 ? (
              <div className="text-center py-4 text-red-500">
                No tienes horarios asignados
              </div>
            ) : (
              <select
                value={horarioSeleccionado}
                onChange={(e) => setHorarioSeleccionado(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                disabled={loading}
              >
                <option value="">Seleccione un horario...</option>
                {horarios.map((horario) => (
                  <option key={horario.id_horario} value={horario.id_horario}>
                    {horario.dia_semana} - {horario.hora_inicio.slice(0, 5)} a {horario.hora_fin.slice(0, 5)}
                    {horario.curso && ` - ${horario.curso.codigo || 'Curso'}`}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones (Opcional)
            </label>
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              rows={3}
              placeholder="Ingrese observaciones sobre la clase..."
              disabled={loading}
            />
          </div>

          {/* Información */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> Los aprendices tendrán 15 minutos después del inicio de clase para registrar su asistencia.
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 mt-6">
          <ButtonInstru
            text={loading ? 'Iniciando...' : 'Iniciar Asistencia'}
            onClick={handleIniciar}
            disabled={loading || loadingHorarios || horarios.length === 0}
            variant="primary"
          />
          <ButtonInstru
            text="Cancelar"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
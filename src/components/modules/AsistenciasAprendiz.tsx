// PAGE - APRENDIZ
// Página completa del módulo de asistencias para aprendiz

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function AsistenciasAprendiz() {
  const [asistenciasDisponibles, setAsistenciasDisponibles] = useState<any[]>([]);
  const [historial, setHistorial] = useState<any[]>([]);
  const [estadisticas, setEstadisticas] = useState<any>(null);
  const [vistaActual, setVistaActual] = useState<"disponibles" | "historial" | "estadisticas">("disponibles");
  const [loadingRegistro, setLoadingRegistro] = useState<number | null>(null);

  useEffect(() => {
    cargarAsistenciasDisponibles();
    cargarHistorial();
    cargarEstadisticas();
    
    // Actualizar disponibles cada 30 segundos
    const interval = setInterval(() => {
      if (vistaActual === "disponibles") {
        cargarAsistenciasDisponibles();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [vistaActual]);

  const cargarAsistenciasDisponibles = async () => {
    try {
      const res = await axios.get("http://localhost:3001/aprendiz/disponibles", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      setAsistenciasDisponibles(res.data);
    } catch (error: any) {
      console.error("Error cargando asistencias:", error);
      if (error.response?.status === 404) {
        setAsistenciasDisponibles([]);
      }
    }
  };

  const cargarHistorial = async () => {
    try {
      const res = await axios.get("http://localhost:3001/aprendiz/historial", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      setHistorial(res.data);
    } catch (error) {
      console.error("Error cargando historial:", error);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const res = await axios.get("http://localhost:3001/aprendiz/estadisticas", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      setEstadisticas(res.data);
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    }
  };

  const registrarAsistencia = async (idAsistencia: number) => {
    if (!confirm("¿Confirmar tu asistencia a esta clase?")) return;

    setLoadingRegistro(idAsistencia);
    try {
      const res = await axios.post(
        `http://localhost:3001/aprendiz/registrar/${idAsistencia}`,
        {},
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        }
      );

      alert(`${res.data.mensaje}`);
      cargarAsistenciasDisponibles();
      cargarHistorial();
      cargarEstadisticas();
    } catch (error: any) {
      console.error("Error registrando asistencia:", error);
      const errorMsg = error.response?.data?.error || 'Error al registrar asistencia';
      alert(`❌ ${errorMsg}`);
    } finally {
      setLoadingRegistro(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-sm min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Mis Asistencias - Aprendiz
      </h1>

      {/* Tabs de Navegación */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setVistaActual("disponibles")}
          className={`pb-3 px-6 font-medium transition-all ${
            vistaActual === "disponibles"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Asistencias Disponibles
        </button>
        <button
          onClick={() => setVistaActual("historial")}
          className={`pb-3 px-6 font-medium transition-all ${
            vistaActual === "historial"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Mi Historial
        </button>
        <button
          onClick={() => setVistaActual("estadisticas")}
          className={`pb-3 px-6 font-medium transition-all ${
            vistaActual === "estadisticas"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Mis Estadísticas
        </button>
      </div>

      {/* Vista de Disponibles */}
      {vistaActual === "disponibles" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Asistencias Activas Hoy</h2>
            <button
              onClick={cargarAsistenciasDisponibles}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
            >
              Actualizar
            </button>
          </div>

          {asistenciasDisponibles.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl text-gray-600 font-medium">No hay asistencias disponibles</p>
              <p className="text-sm text-gray-500 mt-2">
                Las asistencias activas aparecerán aquí
              </p>
            </div>
          ) : (
            asistenciasDisponibles.map((asistencia) => (
              <div
                key={asistencia.id_asistencia}
                className="p-6 border-2 border-gray-200 rounded-xl hover:shadow-xl transition-all bg-gradient-to-r from-white to-blue-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">📋</span>
                      <h3 className="text-2xl font-bold text-gray-800">
                        Asistencia Activa
                      </h3>
                    </div>
                    
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <strong>Día:</strong> {asistencia.dia_semana}
                      </p>
                      <p>
                        <strong>Horario:</strong>{" "}
                        {asistencia.hora_inicio?.slice(0, 5)} - {asistencia.hora_fin?.slice(0, 5)}
                      </p>
                      <p>
                        <strong>Fecha:</strong>{" "}
                        {new Date(asistencia.fecha).toLocaleDateString('es-CO', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      {asistencia.observaciones && (
                        <p className="mt-3 text-gray-600">
                          <strong>Observaciones:</strong> {asistencia.observaciones}
                        </p>
                      )}
                    </div>

                    {/* Estado del registro */}
                    {asistencia.mi_registro && (
                      <div className="mt-4">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                            asistencia.mi_registro.estado === "PRESENTE"
                              ? "bg-green-500 text-white"
                              : asistencia.mi_registro.estado === "PENDIENTE"
                              ? "bg-yellow-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {asistencia.mi_registro.estado === "PRESENTE" && "✓ "}
                          {asistencia.mi_registro.estado === "AUSENTE" && "✗ "}
                          {asistencia.mi_registro.estado === "PENDIENTE" && "⏳ "}
                          Estado: {asistencia.mi_registro.estado}
                        </span>
                        {asistencia.mi_registro.hora_registro && (
                          <p className="text-sm text-gray-500 mt-2">
                            Registrado:{" "}
                            {new Date(
                              asistencia.mi_registro.hora_registro
                            ).toLocaleTimeString('es-CO')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Botón de Registro */}
                  {asistencia.puede_registrar && (
                    <button
                      onClick={() => registrarAsistencia(asistencia.id_asistencia)}
                      disabled={loadingRegistro === asistencia.id_asistencia}
                      className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loadingRegistro === asistencia.id_asistencia ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Registrando...
                        </span>
                      ) : (
                        "✓ Registrar Asistencia"
                      )}
                    </button>
                  )}
                </div>

                {/* Advertencia de tiempo límite */}
                {asistencia.puede_registrar && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Importante:</strong> Tienes 15 minutos después del inicio de clase para registrar tu asistencia.
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Vista de Historial */}
      {vistaActual === "historial" && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Historial Completo</h2>
          
          {historial.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl text-gray-600">No hay registros en el historial</p>
            </div>
          ) : (
            historial.map((registro) => (
              <div
                key={registro.id_formacion}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      {new Date(registro.fecha).toLocaleDateString('es-CO', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {registro.dia_semana} • {registro.hora_inicio?.slice(0, 5)} - {registro.hora_fin?.slice(0, 5)}
                    </p>
                    {registro.hora_registro && (
                      <p className="text-xs text-gray-500 mt-1">
                        Registrado: {new Date(registro.hora_registro).toLocaleTimeString('es-CO')}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      registro.estado === "PRESENTE"
                        ? "bg-green-500 text-white"
                        : registro.estado === "PENDIENTE"
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {registro.estado}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Vista de Estadísticas */}
      {vistaActual === "estadisticas" && estadisticas && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Estadísticas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border border-blue-200">
              <p className="text-4xl font-bold text-blue-800">{estadisticas.total}</p>
              <p className="text-sm text-blue-700 font-medium mt-2">Total Asistencias</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm border border-green-200">
              <p className="text-4xl font-bold text-green-800">{estadisticas.presentes}</p>
              <p className="text-sm text-green-700 font-medium mt-2">Presentes ✓</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm border border-red-200">
              <p className="text-4xl font-bold text-red-800">{estadisticas.ausentes}</p>
              <p className="text-sm text-red-700 font-medium mt-2">Ausentes ✗</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm border border-purple-200">
              <p className="text-4xl font-bold text-purple-800">{estadisticas.porcentaje_asistencia}%</p>
              <p className="text-sm text-purple-700 font-medium mt-2">% Asistencia</p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Porcentaje de Asistencia</h3>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-full flex items-center justify-center text-white font-bold transition-all duration-1000"
                style={{ width: `${estadisticas.porcentaje_asistencia}%` }}
              >
                {estadisticas.porcentaje_asistencia}%
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {estadisticas.presentes} de {estadisticas.total} asistencias registradas
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
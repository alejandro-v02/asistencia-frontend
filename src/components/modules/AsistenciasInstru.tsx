// PAGE - INSTRUCTOR
// Página principal del módulo de asistencias para instructor

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TitleInstru from "../atoms/TitleInstru";
import SearchBarInstru from "../molecules/SearchBarInstru";
import AsistenciasActivasInstru from "../organisms/AsistenciasActivasInstru";
import ModalNuevaAsistenciaInstru from "../organisms/ModalNuevaAsistenciaInstru";
import AsistenciaEnCursoInstru from "../organisms/AsistenciaEnCursoInstru";

export default function AsistenciasInstru() {
  const [openNueva, setOpenNueva] = useState(false);
  const [vista, setVista] = useState<"NORMAL" | "EN_CURSO">("NORMAL");
  const [asistenciaEnCurso, setAsistenciaEnCurso] = useState<any>(null);
  const [asistenciasFinalizadas, setAsistenciasFinalizadas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar asistencias finalizadas al iniciar
  useEffect(() => {
    cargarAsistenciasFinalizadas();
  }, []);

  // Cargar asistencias finalizadas del instructor
  const cargarAsistenciasFinalizadas = async () => {
    try {
      const res = await axios.get("http://localhost:3001/instructor/asistencias", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      
      // Filtrar solo las finalizadas de hoy
      const hoy = new Date().toISOString().split('T')[0];
      const finalizadasHoy = res.data.filter((a: any) => {
        const fechaAsistencia = new Date(a.fecha).toISOString().split('T')[0];
        return a.estado_sesion === 'CERRADA' && fechaAsistencia === hoy;
      });
      
      setAsistenciasFinalizadas(finalizadasHoy);
    } catch (error) {
      console.error("Error cargando asistencias:", error);
    }
  };

  // Iniciar una nueva asistencia (llamado desde el modal)
  const iniciarAsistencia = async (asistenciaData: any) => {
    setAsistenciaEnCurso(asistenciaData);
    setVista("EN_CURSO");
    setOpenNueva(false);
  };

  // Actualizar la asistencia en curso (recargar desde el backend)
  const actualizarAsistenciaEnCurso = async () => {
    if (!asistenciaEnCurso) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3001/instructor/asistencia/${asistenciaEnCurso.id_formacion}`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        }
      );
      setAsistenciaEnCurso(res.data);
    } catch (error) {
      console.error("Error actualizando asistencia:", error);
      alert("Error al actualizar la asistencia");
    } finally {
      setLoading(false);
    }
  };

  // Finalizar asistencia
  const finalizarAsistencia = () => {
    cargarAsistenciasFinalizadas();
    setAsistenciaEnCurso(null);
    setVista("NORMAL");
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-sm min-h-screen">
      <TitleInstru text="Módulo de Asistencias - Instructor" />

      {vista === "NORMAL" && (
        <>
          <SearchBarInstru onNueva={() => setOpenNueva(true)} />
          <AsistenciasActivasInstru asistencias={asistenciasFinalizadas} />
        </>
      )}

      {vista === "EN_CURSO" && asistenciaEnCurso && (
        <AsistenciaEnCursoInstru
          asistencia={asistenciaEnCurso}
          onFinalizar={finalizarAsistencia}
          onActualizar={actualizarAsistenciaEnCurso}
          loading={loading}
        />
      )}

      <ModalNuevaAsistenciaInstru
        open={openNueva}
        onClose={() => setOpenNueva(false)}
        onIniciar={iniciarAsistencia}
      />
    </div>
  );
}
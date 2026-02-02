import { useState } from "react";
import TitleInstru from "../atoms/TitleInstru";
import SearchBarInstru from "../molecules/SearchBarInstru";
import AsistenciasActivasInstru from "../organisms/AsistenciasActivasInstru";
import ModalNuevaAsistenciaInstru from "../organisms/ModalNuevaAsistenciaInstru";
import AsistenciaEnCursoInstru from "../organisms/AsistenciaEnCursoInstru";

export default function AsistenciasInstru() {
  const [openNueva, setOpenNueva] = useState(false);
  const [vista, setVista] = useState<"NORMAL" | "EN_CURSO">("NORMAL");
  const [asistenciaEnCurso, setAsistenciaEnCurso] = useState<any>(null);
  const [asistenciasActivas, setAsistenciasActivas] = useState<any[]>([]);

  const iniciarAsistencia = (data: any) => {
    setAsistenciaEnCurso({
      ...data,
      aprendices: [
        { id: 1, nombre: "Juan Pérez", documento: "123", asistio: false },
        { id: 2, nombre: "María López", documento: "456", asistio: false },
        { id: 3, nombre: "Carlos Ruiz", documento: "789", asistio: false },
      ],
    });

    setVista("EN_CURSO");
    setOpenNueva(false);
  };

  const finalizarAsistencia = () => {
    setAsistenciasActivas((prev) => [...prev, asistenciaEnCurso]);
    setAsistenciaEnCurso(null);
    setVista("NORMAL");
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-sm">
      <TitleInstru  text="Módulo de Asistencias" />

      {vista === "NORMAL" && (
        <>
          <SearchBarInstru onNueva={() => setOpenNueva(true)} />
          <AsistenciasActivasInstru asistencias={asistenciasActivas} />
        </>
      )}

      {vista === "EN_CURSO" && asistenciaEnCurso && (
        <AsistenciaEnCursoInstru
          asistencia={asistenciaEnCurso}
          onFinalizar={finalizarAsistencia}
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

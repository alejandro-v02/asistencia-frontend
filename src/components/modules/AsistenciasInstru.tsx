import { useState } from "react";
import PageTitle from "../atoms/PageTitle";
import ActionHeader from "../molecules/ActionHeader";
import SearchBarInstru from "../molecules/SearchBarInstru";
import AsistenciasActivasInstru from "../organisms/AsistenciasActivasInstru";
import AsistenciaEnCursoInstru from "../organisms/AsistenciaEnCursoInstru";
import ModalNuevaAsistenciaInstru from "../organisms/ModalNuevaAsistenciaInstru";

export default function AsistenciasInstru() {
  const [vista, setVista] = useState<"NORMAL" | "EN_CURSO">("NORMAL");
  const [asistenciasActivas, setAsistenciasActivas] = useState([]);
  const [asistenciaEnCurso, setAsistenciaEnCurso] = useState<any>(null);
  const [openNueva, setOpenNueva] = useState(false);

  // Funciones placeholder para mantener la lógica visual
  const iniciarAsistencia = (data: any) => {
    console.log("Iniciando asistencia:", data);
    setAsistenciaEnCurso(data);
    setVista("EN_CURSO");
    setOpenNueva(false);
  };

  const finalizarAsistencia = () => {
    setAsistenciaEnCurso(null);
    setVista("NORMAL");
  };

  return (
    <div className="w-full px-6 py-8">
      <ActionHeader>
        <PageTitle title="Panel de" highlight="Asistencias" subtitle="Gestiona y monitorea las sesiones de clase." />
      </ActionHeader>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
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
      </div>

      <ModalNuevaAsistenciaInstru
        open={openNueva}
        onClose={() => setOpenNueva(false)}
        onIniciar={iniciarAsistencia}
      />
    </div>
  );
}

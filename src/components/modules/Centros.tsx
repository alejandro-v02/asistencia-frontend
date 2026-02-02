import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// import Button from "../atoms/Button";
import CentroForm from "../organisms/CentroForm";
import SedeForm from "../organisms/SedeForm";
import CentroTable from "../organisms/CentroTable";

import { Building, MapPinned } from "lucide-react";
import PageTitle from "../atoms/PageTitle";
import ActionHeader from "../molecules/ActionHeader";
//  PlusCircle,

export default function Centros() {
  const [centros, setCentros] = useState<any[]>([]);

  const [mostrarCentroForm, setMostrarCentroForm] = useState(false);
  const [mostrarSedeForm, setMostrarSedeForm] = useState(false);

  const [nombreCentro, setNombreCentro] = useState("");
  const [nombreSede, setNombreSede] = useState("");
  const [centroFk, setCentroFk] = useState("");

  const [editandoCentroId, setEditandoCentroId] = useState<number | null>(null);
  const [editandoSedeId, setEditandoSedeId] = useState<number | null>(null);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const cargarCentros = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/centro/listar",
        authHeader
      );
      setCentros(res.data);
    } catch (error) {
      console.error("Error cargando centros:", error);
    }
  };

  useEffect(() => {
    cargarCentros();
  }, []);

  const guardarCentro = async (e: any) => {
    e.preventDefault();

    if (!nombreCentro) {
      alert("Ingrese el nombre del centro");
      return;
    }

    try {
      if (editandoCentroId) {
        await axios.put(
          `http://localhost:3000/centro/actualizar/${editandoCentroId}`,
          { nombre: nombreCentro },
          authHeader
        );
      } else {
        await axios.post(
          "http://localhost:3000/centro/registrar",
          { nombre: nombreCentro },
          authHeader
        );
      }

      resetCentro();
      cargarCentros();
    } catch (error) {
      console.error("Error guardando centro:", error);
      alert("Error al guardar centro");
    }
  };

  const editarCentro = (centro: any) => {
    setNombreCentro(centro.nombre);
    setEditandoCentroId(centro.id_centro);
    setMostrarCentroForm(true);
  };

  const resetCentro = () => {
    setNombreCentro("");
    setEditandoCentroId(null);
    setMostrarCentroForm(false);
  };

  const guardarSede = async (e: any) => {
    e.preventDefault();

    if (!nombreSede || !centroFk) {
      alert("Complete todos los campos");
      return;
    }

    try {
      if (editandoSedeId) {
        await axios.put(
          `http://localhost:3000/sede/actualizar/${editandoSedeId}`,
          {
            nombre: nombreSede,
            Centro_formacion_fk: Number(centroFk),
          },
          authHeader
        );
      } else {
        await axios.post(
          "http://localhost:3000/sede/registrar",
          {
            nombre: nombreSede,
            Centro_formacion_fk: Number(centroFk),
          },
          authHeader
        );
      }

      resetSede();
      cargarCentros();
    } catch (error) {
      console.error("Error guardando sede:", error);
      alert("Error al guardar sede");
    }
  };

  const editarSede = (sede: any, centroId: number) => {
    setNombreSede(sede.nombre);
    setCentroFk(String(centroId));
    setEditandoSedeId(sede.id_sede);
    setMostrarSedeForm(true);
  };

  const resetSede = () => {
    setNombreSede("");
    setCentroFk("");
    setEditandoSedeId(null);
    setMostrarSedeForm(false);
  };

  return (
    <div className="p-2 animate-in fade-in duration-500">
      <ActionHeader>
        <PageTitle title="Centros de" highlight="Formación" subtitle="Gestiona las sedes y centros vinculados al sistema." />

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setMostrarCentroForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all active:scale-95"
          >
            <Building size={20} />
            <span>Nuevo Centro</span>
          </button>

          <button
            onClick={() => setMostrarSedeForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-900 transition-all active:scale-95"
          >
            <MapPinned size={20} />
            <span>Nueva Sede</span>
          </button>
        </div>
      </ActionHeader>

      <div className="bg-white rounded-3xl">
        <CentroTable
          centros={centros}
          onEditarCentro={editarCentro}
          onEditarSede={editarSede}
        />
      </div>

      {mostrarCentroForm && (
        <CentroForm
          nombre={nombreCentro}
          setNombre={setNombreCentro}
          onSubmit={guardarCentro}
          cerrar={resetCentro}
          titulo={editandoCentroId ? "Editar Centro" : "Registrar Centro"}
        />
      )}

      {mostrarSedeForm && (
        <SedeForm
          nombre={nombreSede}
          setNombre={setNombreSede}
          centroFk={centroFk}
          setCentroFk={setCentroFk}
          centros={centros}
          onSubmit={guardarSede}
          cerrar={resetSede}
          titulo={editandoSedeId ? "Editar Sede" : "Registrar Sede"}
        />
      )}
    </div>
  );
}

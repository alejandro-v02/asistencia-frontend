import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import UserForm from "../organisms/UserForm";

export default function Usuarios() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [municipios, setMunicipios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [aplicativos, setAplicativos] = useState([]);

  const [form, setForm] = useState({
    identificacion: "",
    nombres: "",
    direccion: "",
    telefono: "",
    correo: "",
    genero: "masculino",
    municipio_fk: "",
    aplicativo_fk: "",
    login: "",
    password: "",
    rol_credencial_fk: ""
  });

  useEffect(() => {
    if (mostrarFormulario) {
      axios.get("http://localhost:3000/municipio/listar", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      }).then(res => setMunicipios(res.data));

      axios.get("http://localhost:3000/rol/listar", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      }).then(res => setRoles(res.data));

      axios.get("http://localhost:3000/aplicativo/listar", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      }).then(res => setAplicativos(res.data));
    }
  }, [mostrarFormulario]);

  // ========= MANEJAR INPUT ==========
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ========= GUARDAR USUARIO ==========
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const personaRes = await axios.post(
        "http://localhost:3000/persona/registrar",
        {
          identificacion: form.identificacion,
          nombres: form.nombres,
          direccion: form.direccion,
          telefono: form.telefono,
          correo: form.correo,
          genero: form.genero,
          municipio_fk: Number(form.municipio_fk),
        }
      );

      const personaID = personaRes.data.id_persona;

      const usuarioRes = await axios.post(
        "http://localhost:3000/usuario/registrar",
        {
          persona_fk: personaID,
          aplicativo_fk: Number(form.aplicativo_fk)
        }
      );

      const usuarioID = usuarioRes.data.id_usuario;

      await axios.post("http://localhost:3000/credencial/registrar", {
        login: form.login,
        password: form.password,
        rol_fk: Number(form.rol_credencial_fk),
        usuario_fk: usuarioID
      });

      alert("Usuario creado correctamente");
      setMostrarFormulario(false);

    } catch (error) {
      console.error(error);
      alert("Error al crear usuario");
    }
  };

  return (
    <div className="w-full px-6 py-8">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
        Gestión de Usuario
      </h1>

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Buscar Usuario"
          className="w-1/3 px-4 py-2 border rounded-full"
        />

        <button
          onClick={() => setMostrarFormulario(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-full"
        >
          Añadir Usuario
        </button>
      </div>

      {mostrarFormulario && (
        <UserForm
          municipios={municipios}
          roles={roles}
          aplicativos={aplicativos}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrar={() => setMostrarFormulario(false)}
        />
      )}

    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import UserForm from "../organisms/UserForm";
import UserTable from "../organisms/UserTable";

export default function Usuarios() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [municipios, setMunicipios] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [programas, setProgramas] = useState<any[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);

  const [form, setForm] = useState({
    id_persona: "",
    id_usuario: "",
    id_credencial: "",
    documento: "",
    nombres: "",
    direccion: "",
    telefono: "",
    correo: "",
    genero: "masculino",
    estado: "activo",
    municipio_fk: "",
    aplicativo_fk: "",
    login: "",
    password: "",
    rol_fk: "",
    programa_fk: "",
    curso_fk: ""
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  useEffect(() => {
    if (mostrarFormulario) {
      cargarMunicipios();
      cargarRoles();
      cargarProgramas();
    }
  }, [mostrarFormulario]);

  useEffect(() => {
    if (form.programa_fk) {
      cargarCursosPorPrograma(form.programa_fk);
    } else {
      setCursos([]);
    }
  }, [form.programa_fk]);

  const cargarUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:3000/usuario/listar", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  const cargarMunicipios = async () => {
    try {
      const res = await axios.get("http://localhost:3000/municipio/listar", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      setMunicipios(res.data);
    } catch (error) {
      console.error("Error cargando municipios:", error);
    }
  };

  const cargarRoles = async () => {
    try {
      const res = await axios.get("http://localhost:3000/rol/listar", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      setRoles(res.data);
    } catch (error) {
      console.error("Error cargando roles:", error);
    }
  };

  const cargarProgramas = async () => {
    try {
      const res = await axios.get("http://localhost:3000/programas/listar", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      setProgramas(res.data);
    } catch (error) {
      console.error("Error cargando programas:", error);
    }
  };

  const cargarCursosPorPrograma = async (programaId: string) => {
    try {
      const res = await axios.get("http://localhost:3000/curso/listar", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      // Filtrar cursos por el programa seleccionado
      const cursosFiltrados = res.data.filter(
        (curso: any) => String(curso.programa_fk) === String(programaId)
      );
      setCursos(cursosFiltrados);
    } catch (error) {
      console.error("Error cargando cursos:", error);
      setCursos([]);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    
    // Si cambia el programa, resetear el curso
    if (name === "programa_fk") {
      setForm({ ...form, [name]: value, curso_fk: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.documento || !form.nombres || !form.direccion || !form.telefono || 
        !form.correo || !form.municipio_fk || !form.login || !form.rol_fk) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Validar si es aprendiz que tenga programa y curso
    const rolSeleccionado = roles.find((r: any) => String(r.id_rol) === String(form.rol_fk));
    const esAprendiz = rolSeleccionado?.nombre?.toLowerCase() === "aprendiz";
    
    if (esAprendiz && (!form.programa_fk || !form.curso_fk)) {
      alert("Para el rol de aprendiz, debe seleccionar un programa y un curso.");
      return;
    }

    try {
      if (modoEdicion) {
        await actualizarUsuario();
      } else {
        await crearUsuario();
      }
    } catch (e: any) {
      console.error("Error completo:", e);
      console.error("Respuesta del servidor:", e.response?.data);
      console.error("Status:", e.response?.status);
      console.error("Detalle completo:", JSON.stringify(e.response?.data, null, 2));
      
      const errorMsg = e.response?.data?.error || e.response?.data?.detalle || e.message;
      alert(`Error: ${errorMsg}`);
    }
  };

const crearUsuario = async () => {
  if (!form.password) {
    alert("La contraseña es obligatoria para crear un usuario");
    return;
  }

  const rolSeleccionado = roles.find((r: any) => String(r.id_rol) === String(form.rol_fk));
  const esAprendiz = rolSeleccionado?.nombre?.toLowerCase() === "aprendiz";

  const userData = {
    // Datos de Persona
    documento: form.documento,
    nombres: form.nombres,
    direccion: form.direccion,
    telefono: form.telefono,
    correo: form.correo,
    genero: form.genero,
    municipio_fk: form.municipio_fk,
    estado: "activo",
    
    // Datos de Credenciales
    login: form.login,
    password: form.password,
    rol_fk: form.rol_fk,
    
    // Datos de Usuario
    aplicativo_fk: 1,
    
    // Datos de Matrícula (solo si es aprendiz)
    ...(esAprendiz && { curso_fk: form.curso_fk })
  };

  const res = await axios.post("http://localhost:3000/usuario/completo", userData, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` }
  });

  alert(res.data.mensaje);
  resetearFormulario();
  cargarUsuarios();
};

const actualizarUsuario = async () => {
  const rolSeleccionado = roles.find((r: any) => String(r.id_rol) === String(form.rol_fk));
  const esAprendiz = rolSeleccionado?.nombre?.toLowerCase() === "aprendiz";

  const userData = {
    documento: form.documento,
    nombres: form.nombres,
    direccion: form.direccion,
    telefono: form.telefono,
    correo: form.correo,
    genero: form.genero,
    municipio_fk: form.municipio_fk,
    estado: form.estado,
    login: form.login,
    password: form.password,
    rol_fk: form.rol_fk,
        ...(esAprendiz && { curso_fk: form.curso_fk })
  };

  const res = await axios.put(
    `http://localhost:3000/usuario/completo/${form.id_usuario}`,
    userData,
    {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    }
  );

  alert(res.data.mensaje);
  resetearFormulario();
  cargarUsuarios();
};

  const handleEditar = (usuario: any) => {
    console.log("Usuario a editar:", usuario);
    console.log("Credenciales completas:", usuario.credenciales);
    console.log("Primera credencial:", usuario.credenciales[0]);
    
    if (!usuario.credenciales || usuario.credenciales.length === 0) {
      alert("Error: El usuario no tiene credenciales asociadas");
      return;
    }

    const credencial = usuario.credenciales[0];
    
    setModoEdicion(true);
    setForm({
      id_persona: usuario.usuario_persona?.id_persona || "",
      id_usuario: usuario.id_usuario || "",
      id_credencial: credencial.id_credencial || "",
      documento: usuario.usuario_persona?.documento || "",
      nombres: usuario.usuario_persona?.nombres || "",
      direccion: usuario.usuario_persona?.direccion || "",
      telefono: usuario.usuario_persona?.telefono || "",
      correo: usuario.usuario_persona?.correo || "",
      genero: usuario.usuario_persona?.genero || "masculino",
      estado: usuario.usuario_persona?.estado || "activo",
      municipio_fk: usuario.usuario_persona?.municipio_fk || "",
      aplicativo_fk: usuario.aplicativo_fk || "1",
      login: credencial.login || "",
      password: "",
      rol_fk: credencial.rol_credencia?.id_rol || credencial.rol_fk || "",
      programa_fk: usuario.aprendiz?.curso?.programa_fk || "",
      curso_fk: usuario.aprendiz?.curso?.id_curso || ""
    });
    
    console.log("Formulario cargado con:", {
      id_credencial: credencial.id_credencial,
      login: credencial.login,
      rol_fk: credencial.rol_credencia?.id_rol || credencial.rol_fk,
      programa_fk: usuario.aprendiz?.curso?.programa_fk,
      curso_fk: usuario.aprendiz?.curso?.id_curso
    });
    
    setMostrarFormulario(true);
    
    // Si tiene programa, cargar los cursos de ese programa
    if (usuario.aprendiz?.curso?.programa_fk) {
      cargarCursosPorPrograma(usuario.aprendiz.curso.programa_fk);
    }
  };

  const handleCambiarEstado = async (usuario: any) => {
    const nuevoEstado = usuario.usuario_persona.estado === "activo" ? "inactivo" : "activo";
    
    if (!confirm(`¿Está seguro de cambiar el estado a ${nuevoEstado}?`)) {
      return;
    }

    try {
      await axios.put(`http://localhost:3000/persona/actualizar/${usuario.usuario_persona.id_persona}`, {
        documento: usuario.usuario_persona.documento,
        nombres: usuario.usuario_persona.nombres,
        direccion: usuario.usuario_persona.direccion,
        telefono: usuario.usuario_persona.telefono,
        correo: usuario.usuario_persona.correo,
        genero: usuario.usuario_persona.genero,
        municipio_fk: usuario.usuario_persona.municipio_fk,
        estado: nuevoEstado
      }, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });

      alert(`Usuario ${nuevoEstado === "activo" ? "activado" : "desactivado"} correctamente`);
      cargarUsuarios();
    } catch (error) {
      console.error("Error cambiando estado:", error);
      alert("Error al cambiar el estado del usuario");
    }
  };

  const resetearFormulario = () => {
    setForm({
      id_persona: "",
      id_usuario: "",
      id_credencial: "",
      documento: "",
      nombres: "",
      direccion: "",
      telefono: "",
      correo: "",
      genero: "masculino",
      estado: "activo",
      municipio_fk: "",
      aplicativo_fk: "",
      login: "",
      password: "",
      rol_fk: "",
      programa_fk: "",
      curso_fk: ""
    });
    setMostrarFormulario(false);
    setModoEdicion(false);
    setCursos([]);
  };

  const usuariosFiltrados = usuarios.filter((usuario: any) => {
    const nombre = usuario.usuario_persona?.nombres?.toLowerCase() || "";
    const documento = usuario.usuario_persona?.documento?.toString() || "";
    const login = usuario.credenciales[0]?.login?.toLowerCase() || "";
    
    return nombre.includes(busqueda.toLowerCase()) || 
          documento.includes(busqueda) || 
          login.includes(busqueda.toLowerCase());
  });

  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
        Gestión de Usuarios
      </h1>

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre, documento o usuario..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => {
            setModoEdicion(false);
            resetearFormulario();
            setMostrarFormulario(true);
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 font-bold"
        >
          + Añadir Usuario
        </button>
      </div>

      {mostrarFormulario && (
        <UserForm
          form={form}
          municipios={municipios}
          roles={roles}
          programas={programas}
          cursos={cursos}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrar={resetearFormulario}
          modoEdicion={modoEdicion}
        />
      )}

      <UserTable 
        usuarios={usuariosFiltrados}
        onEditar={handleEditar}
        onCambiarEstado={handleCambiarEstado}
      />
    </div>
  );
}
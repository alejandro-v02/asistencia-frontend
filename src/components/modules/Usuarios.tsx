import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import UserForm from "../organisms/UserForm";
<<<<<<< HEAD

export default function Usuarios() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [municipios, setMunicipios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [aplicativos, setAplicativos] = useState([]);

  const [form, setForm] = useState({
    identificacion: "",
=======
import UserTable from "../organisms/UserTable";

export default function Usuarios() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [form, setForm] = useState({
    id_persona: "",
    id_usuario: "",
    id_credencial: "",
    documento: "",
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)
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
    rol_fk: ""
  });

  useEffect(() => {
<<<<<<< HEAD
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
=======
    cargarUsuarios();
  }, []);

  useEffect(() => {
    if (mostrarFormulario) {
      cargarMunicipios();
      cargarRoles();
    }
  }, [mostrarFormulario]);

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

>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
  // ========= GUARDAR USUARIO ==========
=======
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.documento || !form.nombres || !form.direccion || !form.telefono || 
        !form.correo || !form.municipio_fk || !form.login || !form.rol_fk) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
<<<<<<< HEAD
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
=======
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

    const personaRes = await axios.post("http://localhost:3000/persona/registrar", {
      documento: form.documento,
      nombres: form.nombres,
      direccion: form.direccion,
      telefono: form.telefono,
      correo: form.correo,
      genero: form.genero,
      estado: form.estado,
      municipio_fk: Number(form.municipio_fk),
    }, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    });

    const personaID = personaRes.data.id_persona;

    const usuarioRes = await axios.post("http://localhost:3000/usuario/registrar", {
      persona_fk: personaID,
      aplicativo_fk: 1
    }, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    });

    const usuarioID = usuarioRes.data.usuario.id_usuario;

    await axios.post("http://localhost:3000/credencial/registrar", {
      login: form.login,
      password: form.password,
      rol_fk: Number(form.rol_fk),
      usuario_fk: usuarioID
    }, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    });

    alert("Usuario creado correctamente");
    resetearFormulario();
    cargarUsuarios();
  };

  const actualizarUsuario = async () => {
    console.log("Datos a actualizar:", {
      id_persona: form.id_persona,
      id_usuario: form.id_usuario,
      id_credencial: form.id_credencial,
      aplicativo_fk: form.aplicativo_fk
    });

    try {
      const personaData = {
        documento: Number(form.documento),
        nombres: form.nombres,
        direccion: form.direccion,
        telefono: form.telefono,
        correo: form.correo,
        genero: form.genero,
        municipio_fk: Number(form.municipio_fk),
        estado: form.estado
      };

      console.log("Enviando datos de persona:", personaData);

      const personaResponse = await axios.put(
        `http://localhost:3000/persona/actualizar/${form.id_persona}`, 
        personaData,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        }
      );
      
      console.log("✅ Persona actualizada correctamente");

      const aplicativoFk = form.aplicativo_fk ? Number(form.aplicativo_fk) : 1;
      
      await axios.put(`http://localhost:3000/usuario/actualizar/${form.id_usuario}`, {
        persona_fk: Number(form.id_persona),
        aplicativo_fk: aplicativoFk
      }, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
<<<<<<< HEAD
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)

      // 3. Actualizar credencial - SOLO SI EXISTE id_credencial
=======
>>>>>>> 04c8cc1 (Reorganizacion e implementacion del modulo Centros)
      if (form.id_credencial) {
        const credencialData: any = {
          login: form.login,
          rol_fk: Number(form.rol_fk),
          usuario_fk: Number(form.id_usuario)
        };

<<<<<<< HEAD
      const usuarioRes = await axios.post(
        "http://localhost:3000/usuario/registrar",
        {
          persona_fk: personaID,
          aplicativo_fk: Number(form.aplicativo_fk)
        }
      );
=======
        if (form.password && form.password.trim() !== "") {
          credencialData.password = form.password;
        }
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)

        await axios.put(`http://localhost:3000/credencial/actualizar/${form.id_credencial}`, 
          credencialData,
          {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` }
          }
        );
      } else {
        console.warn("No se tiene id_credencial, buscando credencial...");
        
        const credencialData: any = {
          login: form.login,
          rol_fk: Number(form.rol_fk),
          usuario_fk: Number(form.id_usuario)
        };

        if (form.password && form.password.trim() !== "") {
          credencialData.password = form.password;
        }

<<<<<<< HEAD
<<<<<<< HEAD
      alert("Usuario creado correctamente");
      setMostrarFormulario(false);

    } catch (error) {
      console.error(error);
      alert("Error al crear usuario");
=======
        // Buscar credencial por usuario_fk
=======
>>>>>>> 04c8cc1 (Reorganizacion e implementacion del modulo Centros)
        const credenciales = await axios.get(
          `http://localhost:3000/credencial/buscar-por-usuario/${form.id_usuario}`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` }
          }
        );

        if (credenciales.data && credenciales.data.id_credencial) {
          await axios.put(
            `http://localhost:3000/credencial/actualizar/${credenciales.data.id_credencial}`,
            credencialData,
            {
              headers: { Authorization: `Bearer ${Cookies.get("token")}` }
            }
          );
        }
      }

      alert("Usuario actualizado correctamente");
      resetearFormulario();
      cargarUsuarios();
    } catch (error: any) {
      console.error("Error en actualización:", error);
      throw error;
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)
    }
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
      rol_fk: credencial.rol_credencia?.id_rol || credencial.rol_fk || ""
    });
    
    console.log("Formulario cargado con:", {
      id_credencial: credencial.id_credencial,
      login: credencial.login,
      rol_fk: credencial.rol_credencia?.id_rol || credencial.rol_fk
    });
    
    setMostrarFormulario(true);
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
      rol_fk: ""
    });
    setMostrarFormulario(false);
    setModoEdicion(false);
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
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition bosx-shadow-lg shadow-blue-200 font-bold"
        >+ Añadir Usuario
        </button>
      </div>

      {mostrarFormulario && (
        <UserForm
<<<<<<< HEAD
          municipios={municipios}
          roles={roles}
          aplicativos={aplicativos}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrar={() => setMostrarFormulario(false)}
=======
          form={form}
          municipios={municipios}
          roles={roles}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cerrar={resetearFormulario}
          modoEdicion={modoEdicion}
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)
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
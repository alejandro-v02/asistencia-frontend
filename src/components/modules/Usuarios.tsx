import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Municipio {
  id_municipio: number;
  nombre: string;
}

interface Rol {
  id_rol: number;
  nombre: string;
}

interface FormData {
  identificacion: string;
  nombres: string;
  direccion: string;
  telefono: string;
  correo: string;
  genero: string;
  municipio_fk: string;
  rol: string;
  aplicativo_fk: string;
  login: string;
  password: string;
  rol_credencial_fk: string;
}

export default function Usuarios() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);


  const [form, setForm] = useState<FormData>({
    identificacion: "",
    nombres: "",
    direccion: "",
    telefono: "",
    correo: "",
    genero: "masculino",
    municipio_fk: "",
    rol: "aprendiz",
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

    axios.get("http://localhost:3000/roles/listar", {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    }).then(res => setRoles(res.data));

  }
}, [mostrarFormulario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const personaRes = await axios.post("http://localhost:3000/persona/registrar", {
        identificacion: form.identificacion,
        nombres: form.nombres,
        direccion: form.direccion,
        telefono: form.telefono,
        correo: form.correo,
        genero: form.genero,
        municipio_fk: Number(form.municipio_fk),
        rol: form.rol
      });

      const personaID = personaRes.data.id_persona;

      const usuarioRes = await axios.post("http://localhost:3000/usuario/registrar", {
        persona_fk: personaID,
        aplicativo_fk: Number(form.aplicativo_fk)
      });

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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white p-6 w-[650px] rounded-xl shadow-md">

            <h2 className="text-xl font-bold text-blue-600 mb-4">
              Crear Usuario
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-1">

              <input type="number" name="identificacion" placeholder="Identificación"
                className="border p-2 rounded" onChange={handleChange} />

              <input name="nombres" placeholder="Nombres"
                className="border p-2 rounded" onChange={handleChange} />

              <input name="direccion" placeholder="Dirección"
                className="border p-2 rounded" onChange={handleChange} />

              <input type="number" name="telefono" placeholder="Teléfono"
                className="border p-2 rounded" onChange={handleChange} />

              <input type="email" name="correo" placeholder="Correo"
                className="border p-2 rounded" onChange={handleChange} />

              <select name="genero" className="border p-2 rounded" onChange={handleChange}>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>

              <select name="municipio_fk" className="border p-2 rounded" onChange={handleChange}>
                <option value="">Seleccione municipio</option>
                {municipios.map(m => (
                  <option key={m.id_municipio} value={m.id_municipio}>{m.nombre}</option>
                ))}
              </select>

              <input name="login" placeholder="Usuario"
                className="border p-2 rounded" onChange={handleChange} />

              <input name="password" type="password" placeholder="Contraseña"
                className="border p-2 rounded" onChange={handleChange} />

              <select name="rol_credencial_fk" className="border p-2 rounded" onChange={handleChange}>
                <option value="">Seleccione rol</option>
                {roles.map(r => (
                  <option key={r.id_rol} value={r.id_rol}>{r.nombre}</option>
                ))}
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancelar
                </button>

                <button type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded">
                  Guardar
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

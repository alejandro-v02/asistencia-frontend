import InputGroup from "../molecules/UserInputGroup";
import SelectGroup from "../molecules/UserSelectGroup";
import { X, UserPlus, UserCheck } from "lucide-react";

export default function UserForm({
  form,
  municipios = [],
  roles = [],
  programas = [],
  cursos = [],
  handleChange,
  handleSubmit,
  cerrar,
  modoEdicion = false
}: any) {

  // Detectar rol aprendiz POR NOMBRE
  const rolSeleccionado = roles.find(
    (r: any) => String(r.id_rol) === String(form.rol_fk)
  );

  const esAprendiz = rolSeleccionado?.nombre?.toLowerCase() === "aprendiz";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-10 relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        
        <button 
          onClick={cerrar}
          className="absolute top-6 right-8 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            {modoEdicion ? (
              <UserCheck className="text-blue-600" size={28} />
            ) : (
              <UserPlus className="text-blue-600" size={28} />
            )}
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {modoEdicion ? "Editar Usuario" : "Crear Nuevo Usuario"}
            </h2>
          </div>
          <p className="text-slate-500 text-sm">
            Completa la información detallada del usuario en el sistema.
          </p>
          <div className="w-12 h-1.5 bg-blue-600 mt-3 rounded-full"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        >
          {/* DATOS PERSONALES */}
          <InputGroup 
            label="Número de Documento" 
            name="documento" 
            type="number" 
            value={form.documento} 
            onChange={handleChange} 
            placeholder="10001" 
            required 
          />
          
          <InputGroup 
            label="Nombres" 
            name="nombres" 
            value={form.nombres} 
            onChange={handleChange} 
            placeholder="Nombre completo" 
            required 
          />
          
          <InputGroup 
            label="Dirección" 
            name="direccion" 
            value={form.direccion} 
            onChange={handleChange} 
            placeholder="Calle / Carrera" 
            required 
          />
          
          <InputGroup 
            label="Teléfono" 
            name="telefono" 
            type="number" 
            value={form.telefono} 
            onChange={handleChange} 
            placeholder="Número de celular" 
            required 
          />
          
          <InputGroup 
            label="Correo" 
            name="correo" 
            type="email" 
            value={form.correo} 
            onChange={handleChange} 
            placeholder="ejemplo@sena.edu.co" 
            required 
          />

          <SelectGroup 
            label="Género" 
            name="genero" 
            value={form.genero} 
            onChange={handleChange} 
            required
          >
            <option value="">Seleccione género</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </SelectGroup>

          <SelectGroup 
            label="Municipio" 
            name="municipio_fk" 
            value={form.municipio_fk} 
            onChange={handleChange} 
            required
          >
            <option value="">Seleccione municipio</option>
            {municipios.map((m: any) => (
              <option key={m.id_municipio} value={m.id_municipio}>
                {m.nombre}
              </option>
            ))}
          </SelectGroup>

          {/* CREDENCIALES */}
          <InputGroup 
            label="Nombre de Usuario" 
            name="login" 
            value={form.login} 
            onChange={handleChange} 
            placeholder="Username para login" 
            required 
          />

          <InputGroup
            label={modoEdicion ? "Nueva Contraseña" : "Contraseña"}
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder={modoEdicion ? "Dejar en blanco si no cambia" : "********"}
            required={!modoEdicion}
          />

          <SelectGroup 
            label="Rol del Usuario" 
            name="rol_fk" 
            value={form.rol_fk} 
            onChange={handleChange} 
            required
          >
            <option value="">Seleccione rol</option>
            {roles.map((r: any) => (
              <option key={r.id_rol} value={r.id_rol}>
                {r.nombre}
              </option>
            ))}
          </SelectGroup>

          {/* SOLO VISIBLE SI ES APRENDIZ */}
          {esAprendiz && (
            <>
              <SelectGroup
                label="Programa"
                name="programa_fk"
                value={form.programa_fk}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione programa</option>
                {programas.map((p: any) => (
                  <option key={p.id_programa} value={p.id_programa}>
                    {p.nombre}
                  </option>
                ))}
              </SelectGroup>

              <SelectGroup
                label="Código del Curso"
                name="curso_fk"
                value={form.curso_fk}
                onChange={handleChange}
                required
                disabled={!form.programa_fk}
              >
                <option value="">
                  {form.programa_fk
                    ? "Seleccione curso"
                    : "Seleccione primero un programa"}
                </option>
                {cursos.map((c: any) => (
                  <option key={c.id_curso} value={c.id_curso}>
                    {c.codigo}
                  </option>
                ))}
              </SelectGroup>
            </>
          )}

          {/* ESTADO (Solo en modo edición) */}
          {modoEdicion && (
            <SelectGroup 
              label="Estado de cuenta" 
              name="estado" 
              value={form.estado} 
              onChange={handleChange}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </SelectGroup>
          )}

          {/* BOTONES */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-3 pt-6 mt-4 border-t border-gray-50">
            <button 
              type="button" 
              onClick={cerrar} 
              className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-colors"
            >
              Cancelar
            </button>

            <button 
              type="submit" 
              className="px-10 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
            >
              {modoEdicion ? "Actualizar Usuario" : "Guardar Registro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import InputGroup from "../molecules/UserInputGroup";
import SelectGroup from "../molecules/UserSelectGroup";
import { X, UserPlus, UserCheck } from "lucide-react";

<<<<<<< HEAD
export default function UserForm({
<<<<<<< HEAD
  municipios,
  roles,
  aplicativos,
  handleChange,
  handleSubmit,
  cerrar
}: any) {
  console.log({ municipios, roles, aplicativos });

  return (
    <ModalCard>

      <h2 className="text-xl font-bold text-blue-600 mb-2">Crear Usuario</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <InputGroup label="Identificación" name="identificacion" type="number" onChange={handleChange} />
        <InputGroup label="Nombres" name="nombres" onChange={handleChange} />

        <InputGroup label="Dirección" name="direccion" onChange={handleChange} />
        <InputGroup label="Teléfono" name="telefono" type="number" onChange={handleChange} />

        <InputGroup label="Correo" name="correo" type="email" onChange={handleChange} />

        <SelectGroup label="Género" name="genero" onChange={handleChange}>
=======
  form,
  municipios,
  roles,
  handleChange,
  handleSubmit,
  cerrar,
  modoEdicion = false
}: any) {
=======
export default function UserForm({form,municipios,roles,handleChange,handleSubmit,cerrar,modoEdicion = false}: any) {
>>>>>>> 04c8cc1 (Reorganizacion e implementacion del modulo Centros)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-10 relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        
        <button 
          onClick={cerrar}
          className="absolute top-6 right-8 text-slate-400 hover:text-slate-600 transition-colors"
        >
<<<<<<< HEAD
          <option value="">Seleccione género</option>
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </SelectGroup>

<<<<<<< HEAD
        <SelectGroup label="Municipio" name="municipio_fk" onChange={handleChange}>
=======
        <SelectGroup
          label="Municipio"
          name="municipio_fk"
          value={form.municipio_fk}
          onChange={handleChange}
          required
        >
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)
          <option value="">Seleccione municipio</option>
          {municipios.map((m: any) => (
            <option key={m.id_municipio} value={m.id_municipio}>
              {m.nombre}
            </option>
          ))}
        </SelectGroup>

<<<<<<< HEAD
        {/* NUEVO CAMPO */}
        <SelectGroup label="Aplicativo" name="aplicativo_fk" onChange={handleChange}>
          <option value="">Seleccione aplicativo</option>
          {aplicativos.map((a: any) => (
            <option key={a.id_aplicativo} value={a.id_aplicativo}>
              {a.nombre}
            </option>
          ))}
        </SelectGroup>

        <InputGroup label="Usuario" name="login" onChange={handleChange} />
        <InputGroup label="Contraseña" name="password" type="password" onChange={handleChange} />

        <SelectGroup label="Rol del Usuario" name="rol_credencial_fk" onChange={handleChange}>
=======
        <InputGroup
          label="Usuario"
          name="login"
          value={form.login}
          onChange={handleChange}
          required
        />

        <InputGroup
          label={modoEdicion ? "Contraseña (dejar vacío para no cambiar)" : "Contraseña"}
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required={!modoEdicion}
        />

        <SelectGroup
          label="Rol del Usuario"
          name="rol_fk"
          value={form.rol_fk}
          onChange={handleChange}
          required
        >
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)
          <option value="">Seleccione rol</option>
          {roles.map((r: any) => (
            <option key={r.id_rol} value={r.id_rol}>
              {r.nombre}
            </option>
          ))}
        </SelectGroup>

<<<<<<< HEAD
=======
        {modoEdicion && (
          <SelectGroup
            label="Estado"
            name="estado"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </SelectGroup>
        )}

        {/* BOTONES */}
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)
        <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-2">
          <Button type="button" className="bg-gray-300" onClick={cerrar}>
            Cancelar
          </Button>

          <Button type="submit" className="bg-blue-600 text-white">
<<<<<<< HEAD
            Guardar
          </Button>
        </div>

      </form>

    </ModalCard>
  );
}
=======
            {modoEdicion ? "Actualizar" : "Guardar"}
          </Button>
=======
          <X size={24} />
        </button>

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
          <p className="text-slate-500 text-sm">Completa la información detallada del usuario en el sistema.</p>
          <div className="w-12 h-1.5 bg-blue-600 mt-3 rounded-full"></div>
>>>>>>> 04c8cc1 (Reorganizacion e implementacion del modulo Centros)
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        >
          <InputGroup
            label="Documento"
            name="documento"
            type="number"
            value={form.documento}
            onChange={handleChange}
            placeholder="CC / TI"
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

          <div className="col-span-1 md:col-span-2 flex justify-end gap-3 pt-6 mt-4 border-t border-gray-50">
            <button 
              type="button" 
              className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all" 
              onClick={cerrar}
            >
              Cancelar
            </button>

            <button 
              type="submit" 
              className="px-10 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-400 transition-all active:scale-95 flex items-center gap-2"
            >
              {modoEdicion ? "Actualizar Usuario" : "Guardar Registro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)

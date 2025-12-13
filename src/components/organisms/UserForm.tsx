import InputGroup from "../molecules/UserInputGroup";
import SelectGroup from "../molecules/UserSelectGroup";
import Button from "../atoms/Button";
import ModalCard from "../molecules/UserModalCard";

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

  return (
    <ModalCard>
      <h2 className="text-xl font-bold text-blue-600 mb-2">
        {modoEdicion ? "Editar Usuario" : "Crear Usuario"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <InputGroup
          label="Documento"
          name="documento"
          type="number"
          value={form.documento}
          onChange={handleChange}
          required
        />

        <InputGroup
          label="Nombres"
          name="nombres"
          value={form.nombres}
          onChange={handleChange}
          required
        />

        <InputGroup
          label="Dirección"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          required
        />

        <InputGroup
          label="Teléfono"
          name="telefono"
          type="number"
          value={form.telefono}
          onChange={handleChange}
          required
        />

        <InputGroup
          label="Correo"
          name="correo"
          type="email"
          value={form.correo}
          onChange={handleChange}
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
        </div>
      </form>
    </ModalCard>
  );
}
>>>>>>> 85bb714 (Refactorización: Implementación de Atomic Design y reorganización de componentes)

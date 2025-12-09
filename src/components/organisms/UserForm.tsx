import InputGroup from "../molecules/UserInputGroup";
import SelectGroup from "../molecules/UserSelectGroup";
import Button from "../atoms/Button";
import ModalCard from "../molecules/UserModalCard";

export default function UserForm({
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
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </SelectGroup>

        <SelectGroup label="Municipio" name="municipio_fk" onChange={handleChange}>
          <option value="">Seleccione municipio</option>
          {municipios.map((m: any) => (
            <option key={m.id_municipio} value={m.id_municipio}>
              {m.nombre}
            </option>
          ))}
        </SelectGroup>

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
          <option value="">Seleccione rol</option>
          {roles.map((r: any) => (
            <option key={r.id_rol} value={r.id_rol}>
              {r.nombre}
            </option>
          ))}
        </SelectGroup>

        <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-2">
          <Button type="button" className="bg-gray-300" onClick={cerrar}>
            Cancelar
          </Button>

          <Button type="submit" className="bg-blue-600 text-white">
            Guardar
          </Button>
        </div>

      </form>

    </ModalCard>
  );
}

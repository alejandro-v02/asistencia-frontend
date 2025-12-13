export default function UserTable({ usuarios, onEditar, onCambiarEstado }: any) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Documento</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Nombres</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Correo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Teléfono</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Usuario</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Rol</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Estado</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              usuarios.map((usuario: any) => (
                <tr 
                  key={usuario.id_usuario} 
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-sm">
                    {usuario.usuario_persona?.documento || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {usuario.usuario_persona?.nombres || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {usuario.usuario_persona?.correo || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {usuario.usuario_persona?.telefono || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {usuario.credenciales[0]?.login || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {usuario.credenciales[0]?.rol_credencia?.nombre || "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        usuario.usuario_persona?.estado === "activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {usuario.usuario_persona?.estado || "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEditar(usuario)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-xs"
                        title="Editar usuario"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => onCambiarEstado(usuario)}
                        className={`px-3 py-1 rounded transition text-xs ${
                          usuario.usuario_persona?.estado === "activo"
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                        title={usuario.usuario_persona?.estado === "activo" ? "Desactivar" : "Activar"}
                      >
                        {usuario.usuario_persona?.estado === "activo" ? "🚫 Desactivar" : "✅ Activar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { UserCog, Power, UserCheck } from "lucide-react";

export default function UserTable({ usuarios, onEditar, onCambiarEstado }: any) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-xl bg-white ">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Documento</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Información Personal</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contacto</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Usuario / Rol</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Estado</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                  No hay usuarios registrados actualmente
                </td>
              </tr>
            ) : (
              usuarios.map((usuario: any) => (
                <tr 
                  key={usuario.id_usuario} 
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  {/* Documento */}
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                    {usuario.usuario_persona?.documento || "N/A"}
                  </td>

                  {/* Nombres */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-700">
                      {usuario.usuario_persona?.nombres || "N/A"}
                    </div>
                  </td>

                  {/* Contacto */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">{usuario.usuario_persona?.correo || "N/A"}</div>
                    <div className="text-xs text-slate-400">{usuario.usuario_persona?.telefono || "N/A"}</div>
                  </td>

                  {/* Usuario / Rol */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-blue-600 mb-1">
                      {usuario.credenciales[0]?.login || "N/A"}
                    </div>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase border border-blue-100">
                      {usuario.credenciales[0]?.rol_credencia?.nombre || "N/A"}
                    </span>
                  </td>

                  {/* Estado */}
                  <td className="px-6 py-4 text-center">
                    <span 
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                        usuario.usuario_persona?.estado === "activo"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${usuario.usuario_persona?.estado === "activo" ? "bg-green-500" : "bg-red-500"}`}></span>
                      {usuario.usuario_persona?.estado || "N/A"}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEditar(usuario)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm text-xs font-bold"
                        title="Editar usuario"
                      >
                        <UserCog size={14} />
                        Editar
                      </button>
                      <button
                        onClick={() => onCambiarEstado(usuario)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all shadow-sm text-xs font-bold border ${
                          usuario.usuario_persona?.estado === "activo"
                            ? "bg-white text-red-500 border-red-100 hover:bg-red-500 hover:text-white"
                            : "bg-white text-green-600 border-green-100 hover:bg-green-600 hover:text-white"
                        }`}
                        title={usuario.usuario_persona?.estado === "activo" ? "Desactivar" : "Activar"}
                      >
                        {usuario.usuario_persona?.estado === "activo" ? <Power size={14} /> : <UserCheck size={14} />}
                        {usuario.usuario_persona?.estado === "activo" ? "Desactivar" : "Activar"}
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
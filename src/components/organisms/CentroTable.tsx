import { Edit2, MapPin, Building2 } from "lucide-react";

export default function CentroTable({ centros, onEditarCentro, onEditarSede }: any) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-gray-100">
            <th className="p-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Centro</th>
            <th className="p-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Sedes</th>
            <th className="p-4 text-sm font-bold text-slate-600 uppercase tracking-wider text-center">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {centros.map((c: any) => (
            <tr key={c.id_centro} className="hover:bg-blue-50/30 transition-colors group">
              {/* Columna Centro */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Building2 size={18} />
                  </div>
                  <span className="font-semibold text-slate-700">{c.nombre}</span>
                </div>
              </td>

              {/* Columna Sedes */}
              <td className="p-4">
                <div className="space-y-2">
                  {c.Sedes?.length ? (
                    c.Sedes.map((s: any) => (
                      <div key={s.id_sede} className="flex items-center justify-between bg-white border border-gray-100 p-2 rounded-xl shadow-sm max-w-xs hover:border-blue-200 transition-all">
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin size={14} className="text-slate-400" />
                          <span className="text-sm font-medium">{s.nombre}</span>
                        </div>
                        <button
                          className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded-lg transition-all"
                          onClick={() => onEditarSede(s, c.id_centro)}
                          title="Editar Sede"
                        >
                          <Edit2 size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-400 italic text-sm">Sin sedes registradas</span>
                  )}
                </div>
              </td>

              <td className="p-4 text-center">
                <button
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
                  onClick={() => onEditarCentro(c)}
                >
                  <Edit2 size={16} />
                  <span>Editar Centro</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
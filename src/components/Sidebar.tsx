import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-50 h-[550px] mt-5 ml-2 rounded-3xl bg-black text-white p-4 pt-20 space-y-4">
      <Link to="/dashboard/usuarios" className="block p-2  rounded hover:bg-gray-600">
        Usuarios
      </Link>

      <Link to="/dashboard/asistencias" className="block p-2 rounded hover:bg-gray-600 ">
        Asistencias
      </Link>
      
      <Link to="/dashboard/centros" className="block p-2 rounded hover:bg-gray-600">
        Centros de formación
      </Link>
    </aside>
  );
}

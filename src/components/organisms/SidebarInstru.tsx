import { useNavigate } from "react-router-dom";
import SidebarItem from "../molecules/SidebarItem";
import { ClipboardCheck, BarChart3, LogOut, Sparkles } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";

export default function SidebarInstru() {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Asistencias",
      path: "/dashboard-instructor/asistencias",
      icon: <ClipboardCheck size={25} />,
    },
    {
      name: "Reportes",
      path: "/dashboard-instructor/reportes",
      icon: <BarChart3 size={25} />,
    },
    {
      name: "Explorador IA",
      path: "/dashboard-instructor/explorador",
      icon: <Sparkles size={25} />,
    },
  ];

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");

      if (token) {
        await axios.post(
          "http://localhost:3000/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      Cookies.remove("token");
      Cookies.remove("nombre");
      Cookies.remove("rol");

      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <aside className="w-64 h-[calc(80vh-40px)] m-5 rounded-3xl bg-white shadow-xl text-slate-600 p-6 flex flex-col">
      <div className="mb-10 px-2">
        <h2 className="text-2xl font-bold text-blue-600">
          Instructor
        </h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            path={item.path}
            name={item.name}
            icon={item.icon}
          />
        ))}
      </nav>

      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
        >
          <LogOut
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="font-medium">
            Cerrar Sesión
          </span>
        </button>
      </div>
    </aside>
  );
}

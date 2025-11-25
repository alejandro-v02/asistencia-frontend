import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Asistencias from "../components/modules/Asistencias";
import Usuarios from "../components/modules/Usuarios";
import Centros from "../components/modules/Centros";

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col">


      <Header />

      <div className="flex flex-1">

        <Sidebar />

        <main className="flex-1 bg-gray-100 rounded-xl m-2 p-4 overflow-y-auto">
          <Routes>
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="asistencias" element={<Asistencias />} />
            <Route path="centros" element={<Centros />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

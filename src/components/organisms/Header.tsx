import Cookies from "js-cookie";

interface UserIconProps {
    className?: string; 
}
const UserIcon = (props: UserIconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.03 20.088a9.75 9.75 0 0 0-12.06 0c.348-.827.915-1.574 1.63-2.167 2.873-2.35 6.425-2.35 9.3 0 1.053.86 1.83.69 2.06.402.735 1.14 1.302 1.887 1.63 2.167ZM12 4.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" clipRule="evenodd" />
</svg>
);
export default function Header() {
  const token = Cookies.get("token");

  return (
    <header className="w-100 h-24 rounded-xl m-2 bg-black text-white flex items-center justify-between px-6 shadow-md">
        <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500 transition">

    <UserIcon className="w-8 h-8 text-black" />
        </div>
        <span className="text-xl opacity-70 font-semibold">
        {token ? "Usuario" : "Invitado"}
        </span>
      </div>

      <h1 className="text-xl font-semibold">
        Sistema de Asistencia
      </h1>
      
    </header>
  );
}
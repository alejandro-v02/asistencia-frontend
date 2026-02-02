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
    const nombre = Cookies.get("nombre");

    return (
    <header className="h-24 m-5 ml-2 rounded-3xl bg-white shadow-xl text-slate-600 flex items-center justify-between px-8 border border-gray-50">
        
        <div className="flex items-center gap-4 text-slate-600">
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 group transition-all duration-200">
            <UserIcon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
        </div>
        <span className="text-xl font-bold tracking-tight">
            {token ? nombre : "Invitado"}
        </span>
        </div>

        <h1 className="text-2xl font-bold text-blue-600">
        Sistema de Asistencia
        </h1>
        
    </header>
    );
}
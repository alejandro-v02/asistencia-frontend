import { Link, useLocation } from "react-router-dom";
import React from "react";

interface SidebarItemProps {
    path: string;
    name: string;
    icon: React.ReactNode;
}

export default function SidebarItem({ path, name, icon }: SidebarItemProps) {
    const location = useLocation();
    const isActive = location.pathname === itemPathMatch(path, location.pathname);

    // Helper simple para mejorar matching si es necesario, por ahora exacto o startWith
    // en este caso el original usaba exact match: location.pathname === item.path

    return (
        <Link
            to={path}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${location.pathname === path
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "hover:bg-blue-50 hover:text-blue-600"
                }`}
        >
            <span className={`${location.pathname === path ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`}>
                {icon}
            </span>
            <span className="font-medium">{name}</span>
        </Link>
    );
}

function itemPathMatch(itemPath: string, currentPath: string) {
    // Lógica simple por defecto, se puede expandir
    return currentPath === itemPath ? currentPath : "";
}

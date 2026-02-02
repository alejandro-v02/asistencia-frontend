import React from "react";

interface StatusBadgeProps {
    status: "activo" | "inactivo" | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const isActive = status === "activo";

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${isActive
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
        >
            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${isActive ? "bg-green-500" : "bg-red-500"}`}></span>
            {status}
        </span>
    );
}

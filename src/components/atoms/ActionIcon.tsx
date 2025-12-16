import React from "react";

interface ActionIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    label?: string;
}

export default function ActionIcon({ icon, label, className = "", ...props }: ActionIconProps) {
    return (
        <button
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors text-blue-600 ${className}`}
            title={label}
            {...props}
        >
            {icon}
        </button>
    );
}

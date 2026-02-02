import React from "react";

interface ActionHeaderProps {
    children?: React.ReactNode;
    className?: string;
}

export default function ActionHeader({ children, className = "" }: ActionHeaderProps) {
    return (
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 ${className}`}>
            {children}
        </div>
    );
}

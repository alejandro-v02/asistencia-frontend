import React from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  highlight?: string; // Parte del texto a resaltar en azul/color principal
}

export default function PageTitle({ title, subtitle, highlight }: PageTitleProps) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
        {title} {highlight && <span className="text-blue-600">{highlight}</span>}
      </h1>
      {subtitle && (
        <p className="text-slate-500 text-sm font-medium mt-1">{subtitle}</p>
      )}
    </div>
  );
}

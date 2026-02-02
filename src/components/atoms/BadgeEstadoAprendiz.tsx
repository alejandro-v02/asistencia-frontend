interface Props {
  estado: "activa" | "cerrada";
}

export default function BadgeEstadoAprendiz({ estado }: Props) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
        ${
          estado === "activa"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-200 text-gray-600"
        }`}
    >
      {estado === "activa" ? "Activa" : "Cerrada"}
    </span>
  );
}

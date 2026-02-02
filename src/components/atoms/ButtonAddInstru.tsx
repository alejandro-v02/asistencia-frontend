import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
  text?: string;
}

export default function ButtonAddInstru({
  onClick,
  text = "Nueva Asistencia",
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-2
        px-6 py-2
        bg-blue-600 text-white
        rounded-xl
        hover:bg-blue-700
        transition
        shadow-lg shadow-blue-200
        font-bold
        ml-72
      "
    >
      <Plus size={18} />
      {text}
    </button>
  );
}

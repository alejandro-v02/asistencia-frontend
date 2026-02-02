import { MoreVertical } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function MenuDotsInstru({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full hover:bg-blue-100 transition"
    >
      <MoreVertical size={18} className="text-blue-700" />
    </button>
  );
}

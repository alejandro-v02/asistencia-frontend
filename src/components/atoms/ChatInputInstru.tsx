interface Props {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export default function ChatInputInstru({
  value,
  onChange,
  onSend,
}: Props) {
  return (
    <div className="flex gap-2 p-4 border-t">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escribe tu mensaje…"
        className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => e.key === "Enter" && onSend()}
      />
      <button
        onClick={onSend}
        className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold"
      >
        Enviar
      </button>
    </div>
  );
}

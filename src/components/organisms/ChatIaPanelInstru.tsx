import { useState } from "react";
import ChatInputInstru from "../atoms/ChatInputInstru";
import ChatMessageListInstru from "../molecules/ChatMessageListInstru";

export default function ChatIaPanelInstru() {
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);

  const enviarMensaje = async () => {
    if (!input.trim()) return;

    setMensajes((prev) => [...prev, { rol: "user", texto: input }]);
    setInput("");
    setEscribiendo(true);

    // Simulación IA (n8n)
    setTimeout(() => {
      setMensajes((prev) => [
        ...prev,
        { rol: "ia", texto: "Respuesta generada por la IA " },
      ]);
      setEscribiendo(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-sm border border-gray-100">

      {/* HEADER */}
      <div className="p-4 border-b text-center">
        <h3 className="text-xl font-bold text-blue-600">
          Explorador IA
        </h3>
        <p className="text-sm text-gray-500">
          Asistente inteligente para instructores
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ChatMessageListInstru
          mensajes={mensajes}
          escribiendo={escribiendo}
        />
      </div>

      <ChatInputInstru
        value={input}
        onChange={setInput}
        onSend={enviarMensaje}
      />
    </div>
  );
}

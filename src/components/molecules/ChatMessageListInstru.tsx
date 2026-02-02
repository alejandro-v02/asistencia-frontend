import ChatBubbleInstru from "../atoms/ChatBubbleInstru";
import ChatTypingInstru from "../atoms/ChatTypingInstru";

interface Props {
  mensajes: any[];
  escribiendo: boolean;
}

export default function ChatMessageListInstru({
  mensajes,
  escribiendo,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {mensajes.map((m, i) => (
        <ChatBubbleInstru
          key={i}
          texto={m.texto}
          rol={m.rol}
        />
      ))}

      {escribiendo && <ChatTypingInstru />}
    </div>
  );
}

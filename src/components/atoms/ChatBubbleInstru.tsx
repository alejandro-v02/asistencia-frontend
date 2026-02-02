import { motion } from "framer-motion";

interface Props {
  texto: string;
  rol: "user" | "ia";
}

export default function ChatBubbleInstru({ texto, rol }: Props) {
  const esUsuario = rol === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow
        ${esUsuario
          ? "bg-blue-600 text-white ml-auto rounded-br-sm"
          : "bg-gray-100 text-gray-800 mr-auto rounded-bl-sm"}
      `}
    >
      {texto}
    </motion.div>
  );
}

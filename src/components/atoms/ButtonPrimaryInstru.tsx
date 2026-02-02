interface Props {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function ButtonPrimaryInstru({
  text,
  onClick,
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full
        bg-blue-600
        text-white
        py-2
        rounded-xl
        hover:bg-blue-700
        transition
        shadow-lg shadow-blue-200
        font-bold
      "
    >
      {text}
    </button>
  );
}

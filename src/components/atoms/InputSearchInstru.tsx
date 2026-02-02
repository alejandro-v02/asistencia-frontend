interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputSearchInstru({
  placeholder = "Buscar...",
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-1/2 
        px-4 
        py-2 
        border
        border-gray-300 
        rounded-lg 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500
        transition
        ml-8
      "
    />
  );
}

import InputSearchInstru from "../atoms/InputSearchInstru";
import ButtonAddInstru from "../atoms/ButtonAddInstru";

interface Props {
  onNueva: () => void;
}

export default function SearchBarInstru({ onNueva }: Props) {
  return (
    <div className="flex gap-4 items-center mb-6">
      <InputSearchInstru placeholder="Buscar asistencia..." />
      <ButtonAddInstru onClick={onNueva} />
    </div>
  );
}

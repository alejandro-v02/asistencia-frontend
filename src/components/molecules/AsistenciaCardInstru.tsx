import MenuDotsInstru from "../atoms/MenuDotsInstru";

interface Props {
  ficha: string;
  programa: string;
  horaInicio: string;
  horaFin: string;
  onOpenInfo: () => void;
}

export default function AsistenciaCardInstru({
  ficha,
  programa,
  horaInicio,
  horaFin,
  onOpenInfo,
}: Props) {
  return (
    <div className="relative p-5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition">

      {/* MENÚ */}
      <div className="absolute top-3 right-3">
        <MenuDotsInstru onClick={onOpenInfo} />
      </div>

      {/* INFO */}
      <h3 className="font-bold text-blue-600 text-lg">
        {programa}
      </h3>

      <p className="text-sm text-gray-600">
        Ficha: {ficha}
      </p>

      <p className="text-sm text-gray-600">
        {horaInicio} - {horaFin}
      </p>

      {/* ESTADO */}
      <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
        Activa
      </span>
    </div>
  );
}

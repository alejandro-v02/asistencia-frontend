interface Props {
  fecha: string;
  curso: string;
  ambiente: string;
}

export default function SessionCardInstru({
  fecha,
  curso,
  ambiente,
}: Props) {
  return (
    <div className="p-3 border rounded-xl bg-gray-50">
      <p className="font-semibold">{curso}</p>
      <p className="text-sm text-gray-600">{fecha}</p>
      <p className="text-sm text-gray-600">Ambiente: {ambiente}</p>
    </div>
  );
}

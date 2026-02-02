interface Props {
  onClick?: () => void;
}

export default function ButtonConfirmarAprendiz({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-4 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
    >
      Confirmar asistencia
    </button>
  );
}

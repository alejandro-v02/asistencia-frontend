import { useEffect, useState } from "react";

interface Props {
  minutos: number;
}

export default function CountdownAprendiz({ minutos }: Props) {
  // Inicializamos el estado
  const [time, setTime] = useState(minutos * 60);

  // CORRECCIÓN: Si la prop 'minutos' cambia desde el padre, actualizamos el contador
  useEffect(() => {
    setTime(minutos * 60);
  }, [minutos]);

  useEffect(() => {
    // Si llegamos a cero, no crear más intervalos
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    // Limpieza del intervalo
    return () => clearInterval(interval);
  }, [time]); // Se ejecuta cada vez que 'time' cambia

  const min = Math.floor(time / 60);
  const sec = time % 60;

  return (
    <p className={`text-sm font-semibold ${time < 60 ? "text-red-500" : "text-blue-500"}`}>
      Tiempo restante: {min}:{sec.toString().padStart(2, "0")}
    </p>
  );
}
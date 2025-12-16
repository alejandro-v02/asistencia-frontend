import { useState, useEffect } from "react";
import Button from "../atoms/Button";

interface AttendanceTimerControlProps {
  onEnable: (minutes: number) => void;
  isRateDisabled?: boolean;
}

export default function AttendanceTimerControl({ onEnable, isRateDisabled = false }: AttendanceTimerControlProps) {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    let interval: any;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && selectedTime !== null) {
      
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleEnable = () => {
    if (selectedTime) {
      onEnable(selectedTime);
      setTimeLeft(selectedTime * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
      <h3 className="text-lg font-semibold mb-4">Habilitar Asistencia Temporal</h3>

      {timeLeft > 0 ? (
        <div className="py-8">
          <div className="text-5xl font-mono font-bold text-green-600 mb-2">
            {formatTime(timeLeft)}
          </div>
          <p className="text-gray-500 animate-pulse">Asistencia Habilitada</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-3 mb-6">
            {[5, 10, 15].map((min) => (
              <button
                key={min}
                onClick={() => setSelectedTime(min)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedTime === min
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {min} Min
              </button>
            ))}
          </div>

          <Button
            onClick={handleEnable}
            disabled={!selectedTime || isRateDisabled}
            className={!selectedTime ? "opacity-50 cursor-not-allowed" : ""}
          >
            Habilitar Registro
          </Button>
        </>
      )}
    </div>
  );
}

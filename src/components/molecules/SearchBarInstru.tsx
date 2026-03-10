// MOLECULE - INSTRUCTOR
// Barra de búsqueda con botón de nueva asistencia

import InputInstru from '../atoms/InputInstru';
import ButtonInstru from '../atoms/ButtonInstru';

interface SearchBarInstruProps {
  onNueva: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export default function SearchBarInstru({ 
  onNueva,
  searchValue = '',
  onSearchChange
}: SearchBarInstruProps) {
  return (
    <div className="flex gap-4 mb-6">
      {onSearchChange && (
        <div className="flex-1">
          <InputInstru
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Buscar asistencia..."
          />
        </div>
      )}
      <ButtonInstru 
        text="+ Nueva Asistencia" 
        onClick={onNueva}
        variant="primary"
      />
    </div>
  );
}
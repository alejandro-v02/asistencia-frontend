// ATOM - INSTRUCTOR
// Input reutilizable

interface InputInstruProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export default function InputInstru({ 
  value, 
  onChange, 
  placeholder = '',
  type = 'text',
  disabled = false,
  className = ''
}: InputInstruProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all ${className}`}
    />
  );
}
// ATOM - INSTRUCTOR
// Botón reutilizable con variantes de color

interface ButtonInstruProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export default function ButtonInstru({ 
  text, 
  onClick, 
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = ''
}: ButtonInstruProps) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md ${className}`}
    >
      {text}
    </button>
  );
}
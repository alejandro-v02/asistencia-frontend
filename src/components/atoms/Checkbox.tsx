import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Checkbox({ label, className = "", ...props }: CheckboxProps) {
    return (
        <input
            type="checkbox"
            className={`w-6 h-6 text-green-600 border-2 border-gray-300 rounded-full focus:ring-green-500 cursor-pointer accent-green-600 ${className}`}
            {...props}
        />
    );
}

import React from 'react';
import Checkbox from '../atoms/Checkbox';

interface CheckboxGroupProps {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxGroup({ label, checked, onChange }: CheckboxGroupProps) {
    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
            <Checkbox
                id="attendance-check"
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor="attendance-check" className="text-lg font-medium text-gray-700 cursor-pointer">
                {label}
            </label>
        </div>
    );
}

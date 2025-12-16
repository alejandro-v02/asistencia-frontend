

interface InfoFieldProps {
    label: string;
    value: string;
}

export default function InfoField({ label, value }: InfoFieldProps) {
    return (
        <div className="flex flex-col">
            <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">{label}</span>
            <span className="text-lg font-semibold text-gray-800">{value}</span>
        </div>
    );
}

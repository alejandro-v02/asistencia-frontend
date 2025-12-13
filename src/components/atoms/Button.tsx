export default function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
return (
    <button
    {...props}
    className={`w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 ${props.className}`}
    >
    {children}
    </button>
);
}

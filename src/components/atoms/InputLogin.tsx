export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
    <input
        {...props}
        className={`w-full border p-2 rounded-full  ${props.className}`}
    />
);
}
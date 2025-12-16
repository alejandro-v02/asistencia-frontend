export default function CentroSelect({ children, ...props }: any) {
  return (
    <select
      {...props}
      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  );
}

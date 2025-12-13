export default function Select({ children, ...props }: any) {
  return (
    <select className="border p-2 rounded-xl w-full " {...props}>
      {children}
    </select>
  );
}

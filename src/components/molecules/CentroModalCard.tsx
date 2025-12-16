export default function CentroModalCard({ children }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}

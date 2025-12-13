export default function ModalCard({ children }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-4 w-[650px] h-[600px] rounded-xl shadow-md">
        {children}
      </div>
    </div>
  );
}

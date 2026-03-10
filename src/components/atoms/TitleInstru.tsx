// ATOM - INSTRUCTOR
// Componente de título para módulo de instructor

interface TitleInstruProps {
  text: string;
}

export default function TitleInstru({ text }: TitleInstruProps) {
  return (
    <h1 className="text-3xl font-bold text-gray-800 mb-6">
      {text}
    </h1>
  );
}
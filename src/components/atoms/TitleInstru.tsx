interface Props {
  text: string;
}

export default function TitleInstru({ text }: Props) {
  return (
    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
      {text}
    </h2>
  );
}

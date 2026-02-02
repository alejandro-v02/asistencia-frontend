interface Props {
  text: string;
}
export default function TitleInstru({ text }: { text: string }) {
  return <h2 className="text-2xl font-bold text-slate-800">{text}</h2>;
}

import Input from "../atoms/UserInput";

export default function InputGroup({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <Input {...props} />
    </div>
  );
}

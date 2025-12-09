import Select from "../atoms/UserSelect";

export default function SelectGroup({ label, children, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <Select {...props}>{children}</Select>
    </div>
  );
}

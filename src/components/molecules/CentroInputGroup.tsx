import CentroInput from "../atoms/CentroInput";

export default function CentroInputGroup({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <CentroInput {...props} />
    </div>
  );
}

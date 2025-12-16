import CentroSelect from "../atoms/CentroSelect";

export default function CentroSelectGroup({ label, children, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <CentroSelect {...props}>{children}</CentroSelect>
    </div>
  );
}

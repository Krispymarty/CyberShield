type FieldProps = {
  label: string;
  value: string;
  className?: string;
};

export function Field({ label, value, className = "" }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="block font-semibold mb-3">{label}</span>
      <input
        readOnly
        value={value}
        className="w-full h-11 rounded border border-slate-300 bg-[#eef4ff] px-5 text-slate-500"
      />
    </label>
  );
}
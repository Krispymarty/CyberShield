type Props = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: string;
};

export function Field({
  label,
  value,
  onChange,
  placeholder,
  className = "",
  type = "text",
}: Props) {
  return (
    <label className={`block ${className}`}>
      <span className="block font-semibold mb-3">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        readOnly={!onChange}
        className="w-full h-11 rounded border border-slate-300 bg-[#eef4ff] px-5 text-slate-700 outline-none"
      />
    </label>
  );
}
interface SelectFieldProps {
    label: string;
    value: string;
    options: Array<{ value: string; label: string } | string>;
    onChange: (value: string) => void;
    error?: string;
    disabled?: boolean;
  }  

export const SelectField:React.FC<SelectFieldProps> = ({
  label,
  value,
  options,
  onChange,
  error,
  disabled = false
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      className="w-full px-3 py-2 border rounded-lg"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options?.map((opt: any) => (
        <option key={opt.value || opt} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

interface InputFieldProps {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    disabled?: boolean;
  }
  
export const InputField: React.FC<InputFieldProps> = ({
    label,
    type = "text",
    value,
    onChange,
    error,
    disabled = false
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
      type={type}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full px-3 py-2 border rounded-lg"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
  
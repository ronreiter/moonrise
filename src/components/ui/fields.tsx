type Option = { value: string; label: string };

export function TextField({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="label text-stone">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-none border-b border-hairline bg-transparent pb-2.5 text-base text-ink outline-none transition-colors placeholder:text-stone/50 focus:border-ink"
      />
    </label>
  );
}

export function SelectField({
  label,
  name,
  options,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  options: Option[];
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="label text-stone">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full appearance-none rounded-none border-b border-hairline bg-transparent pb-2.5 text-base text-ink outline-none transition-colors focus:border-ink"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="label text-stone">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-none border-b border-hairline bg-transparent pb-2.5 text-base text-ink outline-none transition-colors placeholder:text-stone/50 focus:border-ink"
      />
    </label>
  );
}

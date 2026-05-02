export function RangeField({ label, value, min, max, step = 1, unit, onChange }) {
  return (
    <label className="field">
      <span>
        {label}
        <b>
          {value}
          {unit ? ` ${unit}` : ""}
        </b>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

export function SelectField({ label, value, options, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={String(value)} onChange={(event) => onChange(parseSelectValue(event.target.value))}>
        {options.map((option) => (
          <option key={String(option)} value={String(option)}>
            {typeof option === "boolean" ? (option ? "Yes" : "No") : option}
          </option>
        ))}
      </select>
    </label>
  );
}

function parseSelectValue(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}

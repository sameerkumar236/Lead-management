const FilterDropdown = ({
  label,
  value,
  options,
  onChange
}) => {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase text-slate-500">
        {label}
      </span>
      <select
        className="select-field"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FilterDropdown;

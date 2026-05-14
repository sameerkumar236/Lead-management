import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search leads" }) => {
  return (
    <label className="relative block w-full">
      <span className="sr-only">{placeholder}</span>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
      <input
        className="input-field pl-10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
      />
    </label>
  );
};

export default SearchBar;

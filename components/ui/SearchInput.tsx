import { Search, X } from "lucide-react";
import { forwardRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onKeyDown, onClear, placeholder = "Search..." }, ref) => {
    return (
      <div className="relative flex items-center gap-3 px-4 py-4 border-b border-purple-500/20">
        <Search className="w-5 h-5 text-purple-400 shrink-0" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
        />
        <button
          onClick={onClear}
          className="p-1 hover:bg-purple-500/20 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;

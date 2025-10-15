import { useCitySuggestions } from "../hooks/useCitySuggestions";

interface SearchBarProps {
  city: string;
  setCity: (v: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchBar({ city, setCity, onSearch, loading }: SearchBarProps) {
  const suggestions = useCitySuggestions(city);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && city.trim() && !loading) {
      onSearch();
    }
  };

  const handleClickSuggestion = (suggestion: string) => {
    setCity(suggestion);
    onSearch();
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none"
        />
        <button
          onClick={onSearch}
          disabled={loading || !city.trim()}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white disabled:opacity-50"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-gray-800 border border-gray-700 rounded mt-1 w-full max-h-48 overflow-y-auto">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleClickSuggestion(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

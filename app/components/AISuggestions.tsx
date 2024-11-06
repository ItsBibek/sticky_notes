'use client'

interface AISuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export default function AISuggestions({ suggestions, onSuggestionClick }: AISuggestionsProps) {
  if (!suggestions?.length) return null;

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Suggestions:</h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded-full hover:bg-opacity-70 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
} 
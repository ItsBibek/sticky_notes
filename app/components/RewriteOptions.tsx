'use client'

interface RewriteOptionsProps {
  onRewrite: (style: string) => void;
  isLoading: boolean;
}

export default function RewriteOptions({ onRewrite, isLoading }: RewriteOptionsProps) {
  const styles = [
    { id: 'professional', label: 'Professional' },
    { id: 'casual', label: 'Casual' },
    { id: 'formal', label: 'Formal' },
    { id: 'creative', label: 'Creative' },
  ];

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onRewrite(style.id)}
          disabled={isLoading}
          className={`text-xs px-2 py-1 rounded-full transition-colors ${
            isLoading 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-white bg-opacity-50 hover:bg-opacity-70'
          }`}
        >
          {isLoading ? 'Rewriting...' : `Rewrite ${style.label}`}
        </button>
      ))}
    </div>
  );
} 
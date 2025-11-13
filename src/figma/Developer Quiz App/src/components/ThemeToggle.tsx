import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
        isDark ? 'bg-red-900/30' : 'bg-red-200'
      } border ${isDark ? 'border-red-800/50' : 'border-red-300'}`}
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
          isDark 
            ? 'left-1 bg-gradient-to-br from-red-700 to-red-900 shadow-lg shadow-red-900/50' 
            : 'left-9 bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/50'
        }`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-red-100" />
        ) : (
          <Sun className="w-3 h-3 text-white" />
        )}
      </div>
    </button>
  );
}

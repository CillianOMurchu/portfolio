import type { QuestionType } from '../data/quizData';
import { Filter } from 'lucide-react';

interface FilterPanelProps {
  isDark: boolean;
  selectedTypes: QuestionType[];
  onTypeToggle: (type: QuestionType) => void;
}

export function FilterPanel({ isDark, selectedTypes, onTypeToggle }: FilterPanelProps) {
  const filterButtons = [
    { type: 'critical-thinking' as QuestionType, label: 'Critical Thinking', color: 'purple' },
    { type: 'pattern-recognition' as QuestionType, label: 'Pattern Recognition', color: 'blue' },
    { type: 'numeral' as QuestionType, label: 'Numeral', color: 'emerald' },
  ];

  const getFilterClasses = (type: QuestionType, color: string) => {
    const isSelected = selectedTypes.includes(type);
    const baseClasses = 'mat-button transition-all duration-200';

    if (!isSelected) {
      return `${baseClasses} ${
        isDark
          ? 'bg-slate-700/30 text-gray-400 border-slate-600/50 hover:bg-slate-600/40'
          : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
      }`;
    }

    const colorMap = {
      purple: isDark
        ? 'bg-gradient-to-r from-purple-900/40 to-purple-800/40 text-purple-200 border-purple-700/50 shadow-lg shadow-purple-900/20'
        : 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-900 border-purple-300 shadow-md',
      blue: isDark
        ? 'bg-gradient-to-r from-blue-900/40 to-blue-800/40 text-blue-200 border-blue-700/50 shadow-lg shadow-blue-900/20'
        : 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-900 border-blue-300 shadow-md',
      emerald: isDark
        ? 'bg-gradient-to-r from-emerald-900/40 to-emerald-800/40 text-emerald-200 border-emerald-700/50 shadow-lg shadow-emerald-900/20'
        : 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-900 border-emerald-300 shadow-md',
    };

    return `${baseClasses} ${colorMap[color as keyof typeof colorMap]}`;
  };

  return (
    <div className={`rounded-lg ${
      isDark 
        ? 'bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50' 
        : 'bg-white/60 border border-gray-200'
    } backdrop-blur-sm p-6 shadow-xl`}>
      <div className="flex items-center gap-4 flex-wrap">
        <div className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <Filter className="w-5 h-5" />
          <span>Filter by type:</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {filterButtons.map(({ type, label, color }) => (
            <button
              key={type}
              onClick={() => onTypeToggle(type)}
              className={getFilterClasses(type, color)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

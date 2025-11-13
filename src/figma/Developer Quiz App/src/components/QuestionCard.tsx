import type { Question } from '../data/quizData';

interface QuestionCardProps {
  question: Question;
  isDark: boolean;
  showAnswer: boolean;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
}

export function QuestionCard({
  question,
  isDark,
  showAnswer,
  selectedAnswer,
  onAnswerSelect,
}: QuestionCardProps) {
  const getTypeBadge = () => {
    const baseClasses = 'inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wide';
    switch (question.type) {
      case 'critical-thinking':
        return isDark
          ? `${baseClasses} bg-purple-900/30 text-purple-300 border border-purple-800/50`
          : `${baseClasses} bg-purple-100 text-purple-700 border border-purple-300`;
      case 'pattern-recognition':
        return isDark
          ? `${baseClasses} bg-blue-900/30 text-blue-300 border border-blue-800/50`
          : `${baseClasses} bg-blue-100 text-blue-700 border border-blue-300`;
      case 'numeral':
        return isDark
          ? `${baseClasses} bg-emerald-900/30 text-emerald-300 border border-emerald-800/50`
          : `${baseClasses} bg-emerald-100 text-emerald-700 border border-emerald-300`;
    }
  };

  const getTypeLabel = () => {
    switch (question.type) {
      case 'critical-thinking':
        return 'Critical Thinking';
      case 'pattern-recognition':
        return 'Pattern Recognition';
      case 'numeral':
        return 'Numeral';
    }
  };

  const getAnswerClasses = (index: number) => {
    const baseClasses = 'mat-button w-full justify-start transition-all duration-200';
    
    if (!showAnswer) {
      return `${baseClasses} ${
        isDark
          ? 'bg-slate-700/30 hover:bg-slate-600/40 text-gray-200 border-slate-600/50'
          : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-300'
      }`;
    }

    const isCorrect = index === question.correctAnswer;
    const isSelected = index === selectedAnswer;

    if (isCorrect) {
      return `${baseClasses} ${
        isDark
          ? 'bg-green-900/40 text-green-200 border-green-700/70 shadow-lg shadow-green-900/30'
          : 'bg-green-100 text-green-900 border-green-400 shadow-md shadow-green-200/50'
      }`;
    }

    if (isSelected && !isCorrect) {
      return `${baseClasses} ${
        isDark
          ? 'bg-red-900/40 text-red-200 border-red-700/70 shadow-lg shadow-red-900/30'
          : 'bg-red-100 text-red-900 border-red-400 shadow-md shadow-red-200/50'
      }`;
    }

    return `${baseClasses} ${
      isDark
        ? 'bg-slate-700/20 text-gray-400 border-slate-700/30'
        : 'bg-gray-50 text-gray-500 border-gray-200'
    }`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className={`mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            {question.question}
          </div>
          {question.code && (
            <pre className={`p-4 rounded-md overflow-x-auto ${
              isDark 
                ? 'bg-slate-900/60 border border-slate-700/50 text-gray-300' 
                : 'bg-gray-100 border border-gray-300 text-gray-800'
            }`}>
              <code>{question.code}</code>
            </pre>
          )}
        </div>
        <span className={getTypeBadge()}>{getTypeLabel()}</span>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={showAnswer}
            className={getAnswerClasses(index)}
          >
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
              showAnswer && index === question.correctAnswer
                ? isDark
                  ? 'bg-green-700/50 text-green-200'
                  : 'bg-green-200 text-green-900'
                : showAnswer && index === selectedAnswer
                ? isDark
                  ? 'bg-red-700/50 text-red-200'
                  : 'bg-red-200 text-red-900'
                : isDark
                ? 'bg-slate-600/40 text-gray-400'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>

      {showAnswer && (
        <div className={`mt-6 p-4 rounded-md ${
          isDark
            ? 'bg-slate-700/30 border border-slate-600/50'
            : 'bg-gray-50 border border-gray-300'
        }`}>
          <div className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
            Explanation:
          </div>
          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            {question.explanation}
          </div>
        </div>
      )}
    </div>
  );
}

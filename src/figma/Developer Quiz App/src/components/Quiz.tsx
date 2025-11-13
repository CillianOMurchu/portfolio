import { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { FilterPanel } from './FilterPanel';
import { quizData, QuestionType } from '../data/quizData';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface QuizProps {
  isDark: boolean;
}

export function Quiz({ isDark }: QuizProps) {
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>([
    'critical-thinking',
    'pattern-recognition',
    'numeral',
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const filteredQuestions = quizData.filter((q) =>
    selectedTypes.includes(q.type)
  );

  const currentQuestion = filteredQuestions[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (!showAnswer) {
      setSelectedAnswer(index);
      setShowAnswer(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
  };

  const handleTypeToggle = (type: QuestionType) => {
    if (selectedTypes.includes(type)) {
      if (selectedTypes.length > 1) {
        setSelectedTypes(selectedTypes.filter((t) => t !== type));
        setCurrentIndex(0);
        setShowAnswer(false);
        setSelectedAnswer(null);
      }
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        No questions available with the selected filters.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FilterPanel
        isDark={isDark}
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
      />

      <div className={`rounded-lg ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50' 
          : 'bg-white/80 border border-gray-200'
      } backdrop-blur-sm shadow-2xl p-8`}>
        <div className={`flex items-center justify-between mb-6 pb-4 border-b ${
          isDark ? 'border-slate-700/50' : 'border-gray-200'
        }`}>
          <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Question {currentIndex + 1} of {filteredQuestions.length}
          </div>
          <button
            onClick={handleReset}
            className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
              isDark
                ? 'bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 border border-slate-600/50'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <QuestionCard
          question={currentQuestion}
          isDark={isDark}
          showAnswer={showAnswer}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`mat-button ${
              currentIndex === 0
                ? isDark
                  ? 'bg-slate-800/30 text-gray-600 cursor-not-allowed border-slate-700/30'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                : isDark
                ? 'bg-gradient-to-r from-red-900/40 to-red-800/40 hover:from-red-900/60 hover:to-red-800/60 text-red-100 border-red-800/50 shadow-lg shadow-red-900/20'
                : 'bg-gradient-to-r from-red-100 to-red-50 hover:from-red-200 hover:to-red-100 text-red-900 border-red-300 shadow-md'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {showAnswer ? (
              <span className={selectedAnswer === currentQuestion.correctAnswer ? 'text-green-400' : 'text-red-400'}>
                {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
              </span>
            ) : (
              'Select an answer'
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredQuestions.length - 1}
            className={`mat-button ${
              currentIndex === filteredQuestions.length - 1
                ? isDark
                  ? 'bg-slate-800/30 text-gray-600 cursor-not-allowed border-slate-700/30'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                : isDark
                ? 'bg-gradient-to-r from-red-900/40 to-red-800/40 hover:from-red-900/60 hover:to-red-800/60 text-red-100 border-red-800/50 shadow-lg shadow-red-900/20'
                : 'bg-gradient-to-r from-red-100 to-red-50 hover:from-red-200 hover:to-red-100 text-red-900 border-red-300 shadow-md'
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

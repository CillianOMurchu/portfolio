import { useState } from 'react';
import { Quiz } from './components/Quiz';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              Developer Interview Quiz
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Sharpen your skills with critical thinking, pattern recognition, and numeral challenges
            </p>
          </div>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
        <Quiz isDark={isDark} />
      </div>
    </div>
  );
}

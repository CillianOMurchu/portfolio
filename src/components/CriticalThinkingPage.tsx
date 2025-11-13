import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

interface Question {
  id: string;
  question_text: string;
  question_images: string[];
  question_type: string;
  possible_answers: Array<{ text: string; images: string[] }>;
  correct_answer_indices: number[];
  time_limit_seconds: number | null;
  difficulty: number | null;
  category: string | null;
}

const CriticalThinkingPage: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [result, setResult] = useState<'success' | 'fail' | null>(null);
  // filter: 'all' | 'numerical' | 'pattern'
  const [filter, setFilter] = useState<'all' | 'numerical' | 'pattern'>('all');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    setSelectedIdx(null);
    setResult(null);
    let query = supabase.from('questions').select('id');
    if (filter === 'numerical') {
      query = query.eq('category', 'Numerical Reasoning');
    } else if (filter === 'pattern') {
      query = query.eq('category', 'Pattern Recognition');
    }
    query.then(({ data: ids, error: idError }) => {
      if (idError || !ids || ids.length === 0) {
        setError('Failed to load question');
        setLoading(false);
        return;
      }
      const randomIdx = Math.floor(Math.random() * ids.length);
      const randomId = ids[randomIdx].id;
      supabase
        .from('questions')
        .select('*')
        .eq('id', randomId)
        .maybeSingle()
        .then(({ data, error }) => {
          if (error || !data) {
            setError('Failed to load question');
          } else {
            setQuestion(data as Question);
          }
          setLoading(false);
        });
    });
  }, [filter, reloadKey]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!question) return <div className="p-8 text-center">No question found.</div>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <div className="flex flex-wrap gap-2 justify-end mb-4">
        <button
          className={`px-4 py-2 rounded font-medium border-2 transition-colors duration-150 ${filter === 'all' ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-gray-100 border-gray-300 text-gray-700'}`}
          onClick={() => setFilter('all')}
        >
          All Questions
        </button>
        <button
          className={`px-4 py-2 rounded font-medium border-2 transition-colors duration-150 ${filter === 'numerical' ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-gray-100 border-gray-300 text-gray-700'}`}
          onClick={() => setFilter('numerical')}
        >
          Numerical Only
        </button>
        <button
          className={`px-4 py-2 rounded font-medium border-2 transition-colors duration-150 ${filter === 'pattern' ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-gray-100 border-gray-300 text-gray-700'}`}
          onClick={() => setFilter('pattern')}
        >
          Pattern Recognition
        </button>
        <button
          className="px-4 py-2 rounded font-medium border-2 border-green-500 text-green-700 bg-green-50 ml-auto"
          onClick={() => setReloadKey((k) => k + 1)}
        >
          Next
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">Critical Thinking</h1>
      <div className="mb-4">
        <div className="font-medium mb-2">{question.question_text}</div>
        {question.question_images && question.question_images.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-2">
            {question.question_images.map((img, i) => (
              <img key={i} src={img} alt="question visual" className="max-h-32 rounded shadow" />
            ))}
          </div>
        )}
      </div>
      <div className="space-y-3">
        {question.possible_answers.map((ans, idx) => {
          const isCorrect = question.correct_answer_indices.includes(idx);
          const isSelected = selectedIdx === idx;
          let border = 'border-gray-300';
          if (selectedIdx !== null) {
            if (isSelected && isCorrect) border = 'border-green-500';
            else if (isSelected && !isCorrect) border = 'border-red-500';
            else if (isCorrect) border = 'border-green-300';
          }
          return (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 p-2 border-2 rounded transition-colors duration-200 focus:outline-none ${border} ${selectedIdx === null ? 'hover:bg-gray-50' : ''}`}
              disabled={selectedIdx !== null}
              onClick={() => {
                if (selectedIdx !== null) return;
                setSelectedIdx(idx);
                if (isCorrect) setResult('success');
                else setResult('fail');
              }}
            >
              {ans.text && <span>{ans.text}</span>}
              {ans.images && ans.images.length > 0 && (
                <div className="flex gap-1">
                  {ans.images.map((img, j) => (
                    <img key={j} src={img} alt="answer visual" className="max-h-12 rounded" />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
      {selectedIdx !== null && (
        <div className="mt-6 text-center">
          {result === 'success' ? (
            <span className="text-green-600 font-bold text-lg">Success!</span>
          ) : (
            <>
              <span className="text-red-600 font-bold text-lg">Fail.</span>
              <div className="mt-2 text-sm text-gray-700">
                Correct answer:
                <ul className="mt-1">
                  {question.correct_answer_indices.map((idx) => {
                    const ans = question.possible_answers[idx];
                    return (
                      <li key={idx} className="inline-flex items-center gap-2">
                        {ans.text && <span className="font-semibold text-green-700">{ans.text}</span>}
                        {ans.images && ans.images.length > 0 && (
                          <span className="flex gap-1">
                            {ans.images.map((img, j) => (
                              <img key={j} src={img} alt="correct answer visual" className="max-h-8 rounded inline" />
                            ))}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CriticalThinkingPage;
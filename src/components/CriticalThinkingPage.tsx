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

  useEffect(() => {
    setLoading(true);
    // Step 1: Get all question IDs
    supabase
      .from('questions')
      .select('id')
      .then(({ data: ids, error: idError }) => {
        if (idError || !ids || ids.length === 0) {
          setError('Failed to load question');
          setLoading(false);
          return;
        }
        // Step 2: Pick a random ID
        const randomIdx = Math.floor(Math.random() * ids.length);
        const randomId = ids[randomIdx].id;
        // Step 3: Fetch the question by ID
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
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!question) return <div className="p-8 text-center">No question found.</div>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
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
        {question.possible_answers.map((ans, idx) => (
          <div key={idx} className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50">
            {ans.text && <span>{ans.text}</span>}
            {ans.images && ans.images.length > 0 && (
              <div className="flex gap-1">
                {ans.images.map((img, j) => (
                  <img key={j} src={img} alt="answer visual" className="max-h-12 rounded" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriticalThinkingPage;
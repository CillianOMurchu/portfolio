// Supabase Edge Function: validate-answer
// POST { questionId, selectedIdx } => { correct: boolean, explanation: string, correctAnswer: number }
import { serve } from 'std/server';
import { createClient } from '@supabase/supabase-js';

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  const { questionId, selectedIdx } = await req.json();
  if (!questionId || typeof selectedIdx !== 'number') {
    return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { data, error } = await supabase
    .from('questions')
    .select('correct_answer_indices, explanation')
    .eq('id', questionId)
    .maybeSingle();

  if (error || !data) {
    return new Response(JSON.stringify({ error: 'Question not found' }), { status: 404 });
  }

  const correctAnswer = Array.isArray(data.correct_answer_indices)
    ? data.correct_answer_indices[0]
    : data.correct_answer_indices;
  const correct = selectedIdx === correctAnswer;

  return new Response(
    JSON.stringify({
      correct,
      explanation: data.explanation || '',
      correctAnswer,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});

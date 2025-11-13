import { useState } from "react";
import { validateAnswer } from "../../supabase/supabaseApi";

export default function QuizQuestion({ q_id }: { q_id: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    if (selected === null) return;
    try {
      const res = await validateAnswer(q_id, selected);
      setResult(res);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={() => setSelected(0)}>Answer 0</button>
      <button onClick={() => setSelected(1)}>Answer 1</button>
      <button onClick={handleSubmit}>Submit</button>

      {result && (
        <div>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <p>Correct? {result.correct ? "Yes" : "No"}</p>
              <p>Explanation: {result.explanation}</p>
              <p>Correct Answer: {result.correctAnswer}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

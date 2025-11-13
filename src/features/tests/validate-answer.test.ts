
import { describe, it, expect } from "vitest";

// Reusable API service
const apiService = {
  async get(url: string, headers: Record<string, string> = {}) {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`GET failed: ${res.status}`);
    return res.json();
  },
  async post(url: string, body: any, headers: Record<string, string> = {}) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`POST failed: ${res.status} ${text}`);
    }
    return res.json();
  },
  async put(url: string, body: any, headers: Record<string, string> = {}) {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PUT failed: ${res.status}`);
    return res.json();
  },
};

// Use the service to fetch a question
async function getFirstQuestion() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const url = `${supabaseUrl}/rest/v1/questions?select=id,correct_answer_indices`;
  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  };
  const data = await apiService.get(url, headers);
  if (!data || !data.length) throw new Error("No questions found in Supabase");
  return data[0];
}

// Use the service to validate answer (simulate Edge Function as a REST endpoint)
async function validateAnswer(questionId: number, selectedIdx: number) {
  const edgeUrl = import.meta.env.VITE_EDGE_FUNCTION_URL;
  const url = `${edgeUrl}/validate-answer`;
  return apiService.post(url, { questionId, selectedIdx });
}

describe("validate-answer Edge Function (integration)", () => {
  it("returns correct=true for correct answer, and correct=false for incorrect", async () => {
    const { id: questionId, correct_answer_indices } = await getFirstQuestion();
    const correctIdx = Array.isArray(correct_answer_indices)
      ? correct_answer_indices[0]
      : correct_answer_indices;

    // Test correct answer
    const resCorrect = await validateAnswer(questionId, correctIdx);
    expect(resCorrect.correct).toBe(true);
    expect(typeof resCorrect.explanation).toBe("string");
    expect(resCorrect.correctAnswer).toBe(correctIdx);

    // Test incorrect answer (pick a different index)
    const wrongIdx = (correctIdx + 1) % 4;
    const resWrong = await validateAnswer(questionId, wrongIdx);
    expect(resWrong.correct).toBe(false);
    expect(typeof resWrong.explanation).toBe("string");
    expect(resWrong.correctAnswer).toBe(correctIdx);
  });
});

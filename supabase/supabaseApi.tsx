import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_KEY ?? "";

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Generic RPC caller
 * @param fnName - the name of the RPC function
 * @param params - object containing parameters for the RPC
 */
async function callRpc<T>(
  fnName: string,
  params: Record<string, unknown>
): Promise<T> {
  const { data, error } = await supabase.rpc(fnName, params);
  if (error) throw error;
  return data as T;
}

/**
 * Validate an answer for a question
 * @param q_id - UUID of the question
 * @param selected_idx - selected answer index
 */
export async function validateAnswer(q_id: string, selected_idx: number) {
  return callRpc<{
    correct: boolean;
    explanation: string;
    correctAnswer: number;
    error?: string;
  }>("validate_answer", { q_id, selected_idx });
}

/**
 * Example: wrapper for future RPC functions
 * @param fnName - RPC function name
 * @param params - parameters object
 */
export async function callRpcWrapper<T>(
  fnName: string,
  params: Record<string, unknown>
) {
  return callRpc<T>(fnName, params);
}

export default supabase;

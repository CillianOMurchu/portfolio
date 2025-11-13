// Supabase Edge Function: get-random-question
import { serve } from "https://esm.sh/serve@1.1.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

// @ts-expect-error Deno global is available in Edge Functions runtime
const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL');
// @ts-expect-error Deno global is available in Edge Functions runtime
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
export const supabase = createClient(supabaseUrl, supabaseKey);

serve(async () => {
  // Fetch one random question
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("RANDOM()")
    .limit(1)
    .maybeSingle();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

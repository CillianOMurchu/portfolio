// import React, { useEffect, useState } from "react";
// import { supabase } from "../utils/supabaseClient";
// import { QuestionCard } from "../figma/Developer Quiz App/src/components/QuestionCard";
// import { FilterPanel } from "../figma/Developer Quiz App/src/components/FilterPanel";
// import { Sun, Moon } from "lucide-react";
// import { Quiz } from "../figma/Developer Quiz App/src/components/Quiz";
// import QuizQuestion from "./QuizQuestion";

// // Helper to call Edge Function for answer validation
// async function validateAnswer(questionId: string, selectedIdx: number) {
//   const res = await fetch("/functions/v1/validate-answer", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ questionId, selectedIdx }),
//     "Access-Control-Allow-Origin": "*", // or your domain
//   });
//   if (!res.ok) throw new Error("Failed to validate answer");
//   return res.json(); // { correct: boolean, explanation: string, correctAnswer: number }
// }

// // Supabase Question type
// interface SupabaseQuestion {
//   id: string;
//   question_text: string;
//   question_images: string[];
//   question_type: string;
//   possible_answers: Array<{ text: string; images: string[] }>;
//   correct_answer_indices: number[];
//   time_limit_seconds: number | null;
//   difficulty: number | null;
//   category: string | null;
//   explanation?: string;
//   code?: string;
// }

// type QuestionType = "critical-thinking" | "pattern-recognition" | "numeral";

// const typeMap: Record<string, QuestionType> = {
//   "Critical Thinking": "critical-thinking",
//   "Pattern Recognition": "pattern-recognition",
//   "Numerical Reasoning": "numeral",
// };

const CriticalThinkingPage: React.FC = () => {

  return (
    <h1>Critical Thinking</h1>
  );
  //   const [question, setQuestion] = useState<SupabaseQuestion | null>(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState<string | null>(null);
  //   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  //   const [showAnswer, setShowAnswer] = useState(false);
  //   const [answerResult, setAnswerResult] = useState<{
  //     correct: boolean;
  //     explanation: string;
  //     correctAnswer: number;
  //   } | null>(null);
  //   const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>([
  //     "critical-thinking",
  //     "pattern-recognition",
  //     "numeral",
  //   ]);
  //   const [reloadKey, setReloadKey] = useState(0);
  //   const [isDark, setIsDark] = useState(false);
  //   // Fetch a random question from Supabase, filtered by selectedTypes
  //   useEffect(() => {
  //     setLoading(true);
  //     setSelectedAnswer(null);
  //     setShowAnswer(false);
  //     setError(null);
  //     // Map selectedTypes to Supabase categories
  //     const categories = selectedTypes.map((type) => {
  //       if (type === "critical-thinking") return "Critical Thinking";
  //       if (type === "pattern-recognition") return "Pattern Recognition";
  //       if (type === "numeral") return "Numerical Reasoning";
  //       return "";
  //     });
  //     supabase
  //       .from("questions")
  //       .select("id")
  //       .in("category", categories)
  //       .then(({ data: ids, error: idError }) => {
  //         if (idError || !ids || ids.length === 0) {
  //           setError("Failed to load question");
  //           setLoading(false);
  //           return;
  //         }
  //         const randomIdx = Math.floor(Math.random() * ids.length);
  //         const randomId = ids[randomIdx].id;
  //         supabase
  //           .from("questions")
  //           .select("*")
  //           .eq("id", randomId)
  //           .maybeSingle()
  //           .then(({ data, error }) => {
  //             if (error || !data) {
  //               setError("Failed to load question");
  //             } else {
  //               setQuestion(data as SupabaseQuestion);
  //             }
  //             setLoading(false);
  //           });
  //       });
  //   }, [selectedTypes, reloadKey]);
  //   const handleTypeToggle = (type: QuestionType) => {
  //     if (selectedTypes.includes(type)) {
  //       if (selectedTypes.length > 1) {
  //         setSelectedTypes(selectedTypes.filter((t) => t !== type));
  //       }
  //     } else {
  //       setSelectedTypes([...selectedTypes, type]);
  //     }
  //   };
  //   if (loading)
  //     return (
  //       <div
  //         className={`p-8 text-center ${isDark ? "text-gray-200 bg-slate-900" : ""}`}
  //       >
  //         Loading...
  //       </div>
  //     );
  //   if (error)
  //     return (
  //       <div
  //         className={`p-8 text-center text-red-500 ${isDark ? "bg-slate-900" : ""}`}
  //       >
  //         {error}
  //       </div>
  //     );
  //   if (!question)
  //     return (
  //       <div
  //         className={`p-8 text-center ${isDark ? "text-gray-200 bg-slate-900" : ""}`}
  //       >
  //         No question found.
  //       </div>
  //     );
  //   // Map Supabase question to Figma UI question shape (no answer/explanation)
  //   const figmaQuestion = {
  //     type:
  //       typeMap[question.category || "Critical Thinking"] || "critical-thinking",
  //     question: question.question_text,
  //     code: question.code,
  //     options: question.possible_answers.map((a) => a.text),
  //     // correctAnswer and explanation are not sent until answer is validated
  //     correctAnswer: answerResult?.correctAnswer ?? -1,
  //     explanation: answerResult?.explanation ?? "",
  //   };
  //   return (
  //     <>
  //       <Quiz />
  //       <div
  //         className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-white to-blue-50"}`}
  //       >
  //         <div className="w-full max-w-2xl p-4">
  //           <div className="flex items-center justify-between mb-6">
  //             <h1
  //               className={`text-2xl font-bold ${isDark ? "text-gray-100" : "text-gray-900"}`}
  //             >
  //               Critical Thinking Quiz
  //             </h1>
  //             <button
  //               className={`rounded-full p-2 border transition-colors duration-200 ${isDark ? "bg-slate-800 border-slate-700 text-yellow-300" : "bg-white border-gray-300 text-gray-700"}`}
  //               onClick={() => setIsDark((d) => !d)}
  //               aria-label="Toggle dark mode"
  //             >
  //               {isDark ? (
  //                 <Sun className="w-5 h-5" />
  //               ) : (
  //                 <Moon className="w-5 h-5" />
  //               )}
  //             </button>
  //           </div>
  //           <FilterPanel
  //             isDark={isDark}
  //             selectedTypes={selectedTypes}
  //             onTypeToggle={handleTypeToggle}
  //           />
  //           <div className="mt-8">
  //             <QuestionCard
  //               question={figmaQuestion}
  //               isDark={isDark}
  //               showAnswer={showAnswer}
  //               selectedAnswer={selectedAnswer}
  //               onAnswerSelect={async (idx) => {
  //                 setSelectedAnswer(idx);
  //                 setShowAnswer(true);
  //                 try {
  //                   const result = await validateAnswer(question.id, idx);
  //                   setAnswerResult(result);
  //                 } catch (e) {
  //                   setAnswerResult({
  //                     correct: false,
  //                     explanation: "Error validating answer.",
  //                     correctAnswer: -1,
  //                   });
  //                 }
  //               }}
  //             />
  //           </div>
  //           <div className="flex justify-end gap-4 mt-8">
  //             <button
  //               className={`mat-button px-6 py-2 rounded-md font-semibold transition-all duration-200 ${isDark ? "bg-green-900/40 text-green-200 border-green-700/70 hover:bg-green-900/60" : "bg-green-100 text-green-900 border-green-400 hover:bg-green-200"}`}
  //               onClick={() => {
  //                 setReloadKey((k) => k + 1);
  //                 setSelectedAnswer(null);
  //                 setShowAnswer(false);
  //                 setAnswerResult(null);
  //               }}
  //             >
  //               Next
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
};

export default CriticalThinkingPage;

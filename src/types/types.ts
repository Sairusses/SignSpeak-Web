// types.ts
export interface Mistake {
  picked: string;
  expected: string;
}

export interface AlphabetQuiz {
  id: number;
  display_name: string;
  score: number;
  mistakes: Mistake[];
  created_at: string;
  uid: string | null;
}

export interface CategoryQuiz {
  id: number;
  user_id: string;
  category: string;
  score: number;
  total_questions: number;
  created_at: string;
}

// Analytics Types
export interface MistakeAnalysis {
  letter: string;
  count: number;
  mostCommonConfusion: string;
}

export interface UserAnalytics {
  avgScore: number;
  totalQuizzes: number;
  topWeakness: string;
  history: { date: string; score: number }[];
}
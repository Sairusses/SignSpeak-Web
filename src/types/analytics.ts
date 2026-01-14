// types/analytics.ts

export interface Mistake {
  picked: string;
  expected: string;
}

export interface AlphabetQuizSession {
  id: number;
  display_name: string;
  score: number;
  mistakes: Mistake[]; // JSONB parsed as array
  created_at: string;
  uid: string | null;
}

export interface CategoryQuizSession {
  id: number;
  user_id: string;
  category: string;
  score: number;
  total_questions: number;
  created_at: string;
}

// Data structure for the charts/tables
export interface MistakeInsight {
  letter: string;
  errorCount: number;
  mostCommonConfusion: string;
}
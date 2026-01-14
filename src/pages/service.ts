// services/analytics.ts
import { supabase } from "@/lib/supabaseClient";
import { AlphabetQuizSession, MistakeInsight } from "@/types/analytics";

// --- HELPERS ---

// Logic to process raw JSON mistakes into "Hardest Letters"
const processMistakes = (sessions: AlphabetQuizSession[]): MistakeInsight[] => {
  const stats: Record<string, { total: number; confusedWith: Record<string, number> }> = {};

  sessions.forEach(session => {
    if (Array.isArray(session.mistakes)) {
      session.mistakes.forEach(m => {
        const correct = m.expected;
        const wrong = m.picked;

        if (!stats[correct]) stats[correct] = { total: 0, confusedWith: {} };

        stats[correct].total += 1;
        stats[correct].confusedWith[wrong] = (stats[correct].confusedWith[wrong] || 0) + 1;
      });
    }
  });

  return Object.entries(stats)
    .map(([letter, data]) => {
      // Find which letter was picked most often by mistake
      const commonConfusion = Object.entries(data.confusedWith)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "?";

      return {
        letter,
        errorCount: data.total,
        mostCommonConfusion: commonConfusion,
      };
    })
    .sort((a, b) => b.errorCount - a.errorCount); // Sort highest errors first
};

// --- FETCHERS ---

// services/analytics.ts (Updated)

// ... existing imports and processMistakes ...

export interface CategoryStat {
  category: string;
  avgAccuracy: number;
  totalAttempts: number;
  lastScore: number;
}

const processCategoryPerformance = (sessions: any[]): CategoryStat[] => {
  const stats: Record<string, { totalScore: number; totalQuestions: number; attempts: number; last: number }> = {};

  sessions.forEach(s => {
    if (!stats[s.category]) {
      stats[s.category] = { totalScore: 0, totalQuestions: 0, attempts: 0, last: s.score };
    }
    stats[s.category].totalScore += s.score;
    stats[s.category].totalQuestions += s.total_questions;
    stats[s.category].attempts += 1;
  });

  return Object.entries(stats).map(([category, data]) => ({
    category,
    avgAccuracy: (data.totalScore / data.totalQuestions) * 100,
    totalAttempts: data.attempts,
    lastScore: data.last
  })).sort((a, b) => b.avgAccuracy - a.avgAccuracy);
};

export const getUserAnalytics = async (userId: string) => {
  // ... existing alphaData fetch ...
  const { data: alphaData } = await supabase.from("alphabet_quiz").select("*").eq("uid", userId).order("created_at", { ascending: false });

  const { data: catData } = await supabase
    .from("categories_quiz")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const categoryStats = processCategoryPerformance(catData || []);
  const weakSpots = processMistakes(alphaData || []);

  return {
    recentQuizzes: alphaData || [],
    categoryStats, // New field
    weakSpots,
    stats: {
      totalPlayed: (alphaData?.length || 0) + (catData?.length || 0),
      averageScore: alphaData?.length
        ? (alphaData.reduce((acc: any, curr: any) => acc + curr.score, 0) / alphaData.length).toFixed(1)
        : 0
    }
  };
};

export const getAdminAnalytics = async () => {
  const { data: alphaData } = await supabase.from("alphabet_quiz").select("*").limit(1000);
  const { data: catData } = await supabase.from("categories_quiz").select("*").limit(1000);

  return {
    globalWeakSpots: processMistakes(alphaData || []),
    globalCategoryStats: processCategoryPerformance(catData || []), // New field
    recentActivity: alphaData?.slice(0, 10) || [],
    totalUsers: new Set(alphaData?.map((u: any) => u.display_name)).size
  };
};
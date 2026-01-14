// pages/user-dashboard.tsx
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Progress,
  Tooltip,
  Spinner
} from "@heroui/react";
import { getUserAnalytics } from "./service.ts";
import { Info } from "lucide-react";

export default function UserAnalytics({ userId }: { userId: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAnalytics(userId).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Spinner /></div>;

  const masteryLevel = Math.min(100, (data.stats.averageScore / 26) * 100);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Learning Insights
        </h1>
        <p className="text-gray-500">Track your sign language fluency and quiz history.</p>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-600 text-white shadow-blue-200">
          <CardBody className="p-6">
            <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Overall Mastery</p>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-4xl font-bold">{masteryLevel.toFixed(0)}%</span>
              <span className="mb-1 text-blue-200">fluency</span>
            </div>
            <Progress color="warning" size="sm" value={masteryLevel} className="mt-4" />
          </CardBody>
        </Card>

        <StatTile label="Total Quizzes" value={data.stats.totalPlayed} sub="Sessions completed" />
        <StatTile label="Avg. Score" value={data.stats.averageScore} sub="Out of 26 letters" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Signs to Practice */}
        <Card className="lg:col-span-1 shadow-sm border-none bg-red-50/50">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-red-700">Critical Weaknesses</h3>
              <Tooltip content="Signs you consistently miss in quizzes">
                <Info size={16} className="text-red-400 cursor-pointer" />
              </Tooltip>
            </div>

            <div className="space-y-3">
              {data.weakSpots.length === 0 ? (
                <div className="text-center py-10 text-gray-400 italic">Excellent! No weaknesses found.</div>
              ) : (
                data.weakSpots.slice(0, 4).map((m: any) => (
                  <div key={m.letter} className="bg-white p-4 rounded-xl shadow-sm border border-red-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-red-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-red-200">
                        {m.letter}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Confused with</p>
                        <p className="text-lg font-bold text-gray-800">{m.mostCommonConfusion}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-red-500 font-bold text-sm">{m.errorCount} fails</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardBody>
        </Card>

        {/* Category Proficiency Section */}
        <Card className="shadow-sm border-none">
          <CardBody className="p-6">
            <h3 className="font-bold text-lg mb-6">Category Proficiency</h3>
            <div className="space-y-6">
              {data.categoryStats.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No category quizzes taken yet.</p>
              ) : (
                data.categoryStats.map((stat: any) => (
                  <div key={stat.category} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div>
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-tight">
                  {stat.category}
                </span>
                        <p className="text-xs text-gray-400">{stat.totalAttempts} sessions completed</p>
                      </div>
                      <span className="text-sm font-bold text-blue-600">{stat.avgAccuracy.toFixed(0)}%</span>
                    </div>
                    <Progress
                      size="md"
                      value={stat.avgAccuracy}
                      color={stat.avgAccuracy > 80 ? "success" : stat.avgAccuracy > 50 ? "primary" : "warning"}
                      className="bg-gray-100"
                    />
                  </div>
                ))
              )}
            </div>
          </CardBody>
        </Card>

        {/* Recent History Table */}
        <Card className="lg:col-span-2 shadow-sm border-none">
          <CardBody className="p-6">
            <h3 className="font-bold text-lg mb-6">Recent Performance</h3>
            <Table aria-label="Recent Quizzes" removeWrapper selectionMode="single">
              <TableHeader>
                <TableColumn>QUIZ DATE</TableColumn>
                <TableColumn>ACCURACY</TableColumn>
                <TableColumn>SCORE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                {data.recentQuizzes.map((quiz: any) => (
                  <TableRow key={quiz.id} className="hover:bg-gray-50 transition">
                    <TableCell className="font-medium text-gray-600">
                      {new Date(quiz.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </TableCell>
                    <TableCell>
                      <Progress size="sm" value={(quiz.score / 26) * 100} color={quiz.score > 20 ? "success" : "primary"} />
                    </TableCell>
                    <TableCell className="font-bold">{quiz.score}/26</TableCell>
                    <TableCell>
                      <Chip variant="flat" color={quiz.score > 20 ? "success" : "warning"} size="sm">
                        {quiz.score > 20 ? "Mastered" : "Needs Review"}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function StatTile({ label, value, sub }: any) {
  return (
    <Card className="shadow-sm border-none bg-white">
      <CardBody className="p-6 flex flex-col justify-center">
        <p className="text-gray-400 text-sm font-medium">{label}</p>
        <p className="text-4xl font-black text-gray-800 my-1">{value}</p>
        <p className="text-xs text-blue-500 font-bold">{sub}</p>
      </CardBody>
    </Card>
  );
}
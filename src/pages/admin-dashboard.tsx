// components/AdminAnalytics.tsx
import { useEffect, useState } from "react";
import {Card, CardBody, Progress, User} from "@heroui/react";
import { getAdminAnalytics } from "./service.ts";

export default function AdminAnalytics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getAdminAnalytics().then(setData);
  }, []);

  if (!data) return <div>Loading admin data...</div>;

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Global Insights</h1>
          <p className="text-gray-500">Analytics for {data.totalUsers} active users</p>
        </div>
      </div>

      {/* 1. Global Weaknesses Chart */}
      <Card className="shadow-md">
        <CardBody className="p-6">
          <h3 className="text-xl font-bold mb-6">Hardest Signs (Global)</h3>
          <div className="space-y-5">
            {data.globalWeakSpots.slice(0, 5).map((item: any) => (
              <div key={item.letter}>
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-lg">Letter {item.letter}</span>
                  <span className="text-sm text-gray-500">
                    Confused with <span className="font-bold text-red-500">{item.mostCommonConfusion}</span>
                  </span>
                </div>
                <Progress
                  size="md"
                  color="danger"
                  value={item.errorCount * 5} // Scale visually
                  className="max-w-full"
                />
                <p className="text-xs text-gray-400 mt-1">{item.errorCount} total misses</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>




      {/* 2. Live Feed */}
      <div className="grid grid-cols-1 gap-4">
        <h3 className="font-bold text-gray-700">Recent User Sessions</h3>
        {data.recentActivity.map((session: any) => (
          <Card key={session.id} className="w-full">
            <CardBody className="flex flex-row items-center justify-between p-4">
              <User
                name={session.display_name}
                description={session.uid ? "Registered User" : "Guest"}
                avatarProps={{
                  src: `https://api.dicebear.com/7.x/initials/svg?seed=${session.display_name}`
                }}
              />
              <div className="text-right">
                <div className="font-bold text-xl">{session.score} pts</div>
                <div className="text-xs text-gray-400">
                  {new Date(session.created_at).toLocaleTimeString()}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
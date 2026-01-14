import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Spinner } from "@heroui/react";

import IndexPage from "@/pages/index";
import DefaultLayout from "@/layouts/default";
import UserAnalytics from "@/pages/user-dashboard";
import AdminAnalytics from "@/pages/admin-dashboard";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import DownloadPage from "@/pages/download";

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Your Admin UID
  const adminID = "25edde6c-3b21-48f8-bc7f-860eb529faaa";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner label="Loading..." color="primary" />
      </div>
    );
  }

  const isLoggedIn = !!session;
  const isAdmin = session?.user?.id === adminID;

  return (
    <DefaultLayout>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <IndexPage />
            ) : isAdmin ? (
              <Navigate to="/admin-dashboard" replace />
            ) : (
              <Navigate to="/user-dashboard" replace />
            )
          }
        />

        {/* Auth Pages */}
        <Route path="/sign-in" element={!isLoggedIn ? <SignInPage /> : <Navigate to="/" replace />} />
        <Route path="/sign-up" element={!isLoggedIn ? <SignUpPage /> : <Navigate to="/" replace />} />

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            isLoggedIn ? (
              isAdmin ? <Navigate to="/admin-dashboard" replace /> : <UserAnalytics userId={session.user.id} />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={isLoggedIn && isAdmin ? <AdminAnalytics /> : <Navigate to="/" replace />}
        />

        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
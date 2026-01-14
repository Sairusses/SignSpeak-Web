import React, { useState } from "react";
import { Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabaseClient";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
//
    if (error) {
      setError(error.message);
    } else {
      // TODO: wtg
      console.log("Signed in:", data);
      navigate("/"); // Redirect to home after success
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white">
      {/* Compact mobile banner (visible on small screens) */}
      <div className="md:hidden w-full bg-blue-600 text-white py-6 px-5">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold">Bridging the Gap.</h2>
          <p className="text-sm text-blue-100 mt-1">
            Translate sign language into real-time text and vice versa.
          </p>
        </motion.div>
      </div>

      {/* Left Side: Animated Hero Section (Visible on MD screens and up) */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-20 -mt-20 opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full -ml-20 -mb-20 opacity-50" />

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 text-white max-w-md"
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Bridging the Gap.
          </h2>
          <p className="text-lg text-blue-100 leading-relaxed">
            Join SignSpeak to translate sign language into real-time text and
            vice versa.
          </p>
          <div className="mt-8 flex gap-3">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
              <p className="text-xs md:text-sm font-medium">Real-time AI</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
              <p className="text-xs md:text-sm font-medium">Accessible UI</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Sign In Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12 overflow-auto">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
              Welcome Back
            </h1>
            <p className="text-sm md:text-base text-gray-500">
              Please enter your details to sign in.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
            <Input
              fullWidth
              className="font-medium"
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              size="md"
              type="email"
              value={email}
              variant="bordered"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              fullWidth
              label="Password"
              labelPlacement="outside"
              placeholder="••••••••"
              size="md"
              type="password"
              value={password}
              variant="bordered"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div
                aria-live="polite"
                className="p-3 bg-red-50 border border-red-100 rounded-lg"
                role="alert"
              >
                <p className="text-red-500 text-sm text-center font-medium">
                  {error}
                </p>
              </div>
            )}

            <Button
              fullWidth
              className="h-12 md:h-14 text-md font-bold shadow-lg shadow-blue-200"
              color="primary"
              isLoading={loading}
              size="md"
              type="submit"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center mt-6 text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              className="text-blue-600 font-semibold hover:underline"
              to="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

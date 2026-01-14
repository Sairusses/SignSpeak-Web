import React, { useState } from "react";
import { Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabaseClient";

export default function SignUpPage() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const validate = () => {
    if (!fullName.trim()) return "Please enter your full name.";
    if (!email.trim()) return "Please enter your email address.";
    // basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) return "Please enter a valid email address.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";

    return null;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setSuccess(null);

    const validationError = validate();

    if (validationError) {
      setError(validationError);

      return;
    }

    setLoading(true);

    try {
      // Supabase v2 signUp
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      console.log(data);

      if (signUpError) {
        setError(signUpError.message);
      } else {
        // TODO: where to go hehe
        // If your Supabase project requires email confirmation, inform the user
        setSuccess(
          "Account created. Check your email to confirm your address, or sign in if confirmation is not required.",
        );
        // Optionally redirect after a short delay
        setTimeout(() => {
          navigate("/sign-in");
        }, 1600);
      }
    } catch (err: any) {
      setError(err?.message ?? "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white">
      {/* Mobile banner */}
      <div className="md:hidden w-full bg-blue-600 text-white py-6 px-5">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="text-sm text-blue-100 mt-1">
            Join SignSpeak and get started.
          </p>
        </motion.div>
      </div>

      {/* Left hero for md+ */}
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
            Translate sign language into real-time text and speech. Accessible,
            fast, and private.
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

      {/* Right: Sign Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12 overflow-auto">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
              Create account
            </h1>
            <p className="text-sm md:text-base text-gray-500">
              Sign up to start using SignSpeak.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
            <Input
              fullWidth
              label="Full name"
              labelPlacement="outside"
              placeholder="Your full name"
              size="md"
              type="text"
              value={fullName}
              variant="bordered"
              onChange={(e) => setFullName(e.target.value)}
            />

            <Input
              fullWidth
              label="Email"
              labelPlacement="outside"
              placeholder="you@example.com"
              size="md"
              type="email"
              value={email}
              variant="bordered"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex flex-col gap-2">
              <div className="relative">
                <Input
                  fullWidth
                  label="Password"
                  labelPlacement="outside"
                  placeholder="At least 8 characters"
                  size="md"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  variant="bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-[32px] text-sm text-gray-500"
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <Input
                fullWidth
                label="Confirm password"
                labelPlacement="outside"
                placeholder="Repeat your password"
                size="md"
                type="password"
                value={confirmPassword}
                variant="bordered"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Inline password hints */}
            <div className="text-xs text-gray-500">
              <p>
                Use at least 8 characters. Avoid common words or easily guessed
                phrases.
              </p>
            </div>

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

            {success && (
              <div
                aria-live="polite"
                className="p-3 bg-green-50 border border-green-100 rounded-lg"
                role="status"
              >
                <p className="text-green-700 text-sm text-center font-medium">
                  {success}
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
              Create account
            </Button>
          </form>

          <p className="text-center mt-6 text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              className="text-blue-600 font-semibold hover:underline"
              to="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

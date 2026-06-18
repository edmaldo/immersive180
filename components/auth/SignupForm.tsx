"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://immersive180.com/auth/callback",

          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      // optional profile insert
      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: fullName,
          email,
        });
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.25),transparent_45%)]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center px-8 py-8">
          <img src="/logo.svg" alt="Immersive180" className="h-10 w-auto" />
        </div>

        {/* Card */}
        <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h2 className="text-4xl font-semibold mb-2">Create your account</h2>

          <p className="text-white/50 mb-8">
            Join Immersive180 and start sharing your world.
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-sm text-white/80 mb-2 block">
                Full name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full h-14 rounded-2xl bg-black/40 border border-white/10 px-4 outline-none focus:border-violet-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-white/80 mb-2 block">
                Email address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 rounded-2xl bg-black/40 border border-white/10 px-4 outline-none focus:border-violet-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-white/80 mb-2 block">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-14 rounded-2xl bg-black/40 border border-white/10 px-4 outline-none focus:border-violet-500 transition"
              />
            </div>

            {/* Error */}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 font-medium text-lg hover:opacity-90 transition"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Login */}
          <div className="mt-8 text-center text-white/50">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/")}
              className="text-violet-400 hover:text-violet-300"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

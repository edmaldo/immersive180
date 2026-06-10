"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Zap, ShieldCheck, Users } from "lucide-react";
import Footer from "@/components/home/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://immersive180.com/auth/callback",
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email!");
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="relative bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,119,198,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.18),transparent_30%)]" />

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-7xl grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Left Side */}
          <div className="flex flex-col justify-center">
            {/* Logo */}
            <div className="mb-10 flex items-center">
              <div className="rounded-2xl border border-white/20 bg-white/[0.03] px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.12)]">
                <span
                  className="
      text-[16px]
      sm:text-[22px]
      md:text-[28px]
      font-extralight
      tracking-[0.25em]
      sm:tracking-[0.35em]
      md:tracking-[0.45em]
      text-white
      whitespace-nowrap
    "
                >
                  IMMERSIVE
                  <span className="ml-2 sm:ml-3 bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
                    180
                  </span>
                </span>
              </div>
            </div>

            <h1 className="max-w-xl text-5xl font-light leading-tight tracking-tight md:text-7xl">
              <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
                Premium VR Experiences
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/60">
              The all-in-one platform for VR creators, publishers, and
              consumers.
            </p>

            {/* Features */}
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Zap size={18} />
                <span>Fast</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={18} />
                <span>Secure</span>
              </div>

              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>Community-Driven</span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-2xl">
              <div className="mb-8">
                <h2 className="text-4xl font-semibold tracking-tight">
                  Welcome
                </h2>

                <p className="mt-3 text-white/50">
                  Enter email and password to access your dashboard
                </p>
              </div>

              {/* Email */}
              <div className="mb-5">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition-all focus-within:border-violet-500/50">
                  <Mail size={18} className="text-white/40" />

                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-4 transition-all focus-within:border-violet-500/50">
                  <Lock size={18} className="text-white/40" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent outline-none placeholder:text-white/30"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-white/40 transition hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="mb-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 py-4 text-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.45)]"
              >
                Sign-In
              </button>

              {/* Divider */}
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-sm text-white/30">OR</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Sign Up */}
              <button
                onClick={handleSignup}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-4 text-lg font-medium transition-all duration-300 hover:bg-white/10"
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

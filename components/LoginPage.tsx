'use client'

import { useState } from 'react'
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, Zap, ShieldCheck, Users } from "lucide-react"
import ImmersiveCanvasSection from "@/components/immersive/ImmersiveCanvasSection"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://immersive180.com/auth/callback",
  },
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email!')
    }
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,119,198,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.18),transparent_30%)]" />

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      {/* Bottom Wave Glow */}
      <div className="absolute bottom-[-200px] left-[-100px] h-[500px] w-[1200px] rounded-full bg-white/10 blur-3xl opacity-20" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-7xl grid-cols-1 gap-20 lg:grid-cols-2">

          {/* Left Side */}
          <div className="flex flex-col justify-center">
            
            {/* Logo */}
            <div className="mb-10 flex items-center">
  <div className="rounded-2xl border border-white/20 bg-white/[0.03] px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.12)]">
    
    <span className="
      text-[16px]
      sm:text-[22px]
      md:text-[28px]
      font-extralight
      tracking-[0.25em]
      sm:tracking-[0.35em]
      md:tracking-[0.45em]
      text-white
      whitespace-nowrap
    ">
      IMMERSIVE
      <span className="ml-2 sm:ml-3 bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
        180
      </span>
    </span>

  </div>
</div>

            <h1 className="max-w-xl text-5xl font-light leading-tight tracking-tight md:text-7xl">
              <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
                Monetize Immersive Experiences.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/60">
              The all-in-one platform for VR creators, publishers, and consumers.
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
                <span>Built for creators</span>
              </div>
            </div>

            <p className="mt-16 text-sm text-white/30">
              © 2026 Immersive180. All rights reserved.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-2xl">

              <div className="mb-8">
                <h2 className="text-4xl font-semibold tracking-tight">
                  Welcome back
                </h2>

                <p className="mt-3 text-white/50">
                  Login to your account or create a new one.
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
                Login
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
                Create Account
              </button>

              {/* Footer */}
              <p className="mt-8 text-center text-sm leading-relaxed text-white/30">
                By continuing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </div>


    {/* Futuristic Feature Section */}
<section className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-28 text-white">
  {/* Background Glow Effects */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(91,33,182,0.18),transparent_35%)]" />
  <div className="absolute left-[-10%] top-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-3xl" />
  <div className="absolute right-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

  <div className="relative mx-auto max-w-7xl">
    {/* Top Badge */}
    <div className="mb-8 flex justify-center">
      <div className="rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-xs tracking-[0.25em] text-violet-300 backdrop-blur-md">
        BUILT FOR CREATORS. MADE FOR EXPLORERS.
      </div>
    </div>

    {/* Heading */}
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-5xl font-semibold leading-none tracking-tight md:text-7xl">
        The home for{" "}
        <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
          immersive
        </span>
        <br />
        experiences
      </h2>

      <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 md:text-xl">
        Buy and sell 180° experiences in a marketplace built for creators and
        adventurers.
      </p>
    </div>

    {/* Feature Icons */}
    <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-4">
      {[
        {
          title: "Immersive 180° Content",
          desc: "High-quality VR experiences that place viewers inside the moment.",
        },
        {
          title: "Creator Marketplace",
          desc: "Upload, monetize, and reach audiences around the world.",
        },
        {
          title: "Secure Payments",
          desc: "Stripe Connect payouts with secure global transactions.",
        },
        {
          title: "Global Reach",
          desc: "Deliver immersive experiences instantly across devices.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.05]"
        >
          {/* Glow Hover */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-blue-500/10" />
          </div>

          {/* Icon Circle */}
          <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-2xl text-violet-300">
            ✦
          </div>

          <h3 className="relative text-xl font-medium">{item.title}</h3>

          <p className="relative mt-4 leading-relaxed text-white/60">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Bottom CTA Cards */}
    <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-3">
      {[
        {
          title: "For Creators",
          desc: "Upload immersive content, set pricing, and grow your audience.",
          button: "Start Selling",
        },
        {
          title: "For Buyers",
          desc: "Discover cinematic VR experiences from creators worldwide.",
          button: "Start Exploring",
        },
        {
          title: "Secure Payments",
          desc: "Fast onboarding and automated creator payouts with Stripe.",
          button: "Learn More",
        },
      ].map((card, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-10 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/30"
        >
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10" />
          </div>

          <div className="relative">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl">
              ✦
            </div>

            <h3 className="text-2xl font-semibold">{card.title}</h3>

            <p className="mt-4 leading-relaxed text-white/60">
              {card.desc}
            </p>

            <button className="mt-8 text-sm font-medium text-violet-300 transition hover:text-white">
              {card.button} →
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom Stripe Line */}
    <div className="mt-20 flex items-center justify-center">
      <div className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white/50 backdrop-blur-xl">
        Powered by Stripe Connect
      </div>
    </div>
  </div>
</section>
<ImmersiveCanvasSection />
    </main>
  )
}
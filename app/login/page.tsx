'use client'

import { useState } from 'react'
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
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
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="flex flex-col gap-4 p-10 max-w-sm">
      <input
        className="border p-2"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-black text-white p-2"
        onClick={handleSignup}
      >
        Sign Up
      </button>

      <button
        className="bg-gray-700 text-white p-2"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  )
}
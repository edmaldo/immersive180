"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginButton() {
  return (
   <Button
      asChild
      className="
        h-14
        w-64
        rounded-2xl
        bg-gradient-to-r
        from-violet-600
        to-cyan-500
        text-lg
        font-semibold
        text-white
        shadow-lg
        shadow-violet-500/20
        transition-all
        duration-300
        hover:scale-105
        hover:from-violet-500
        hover:to-cyan-400
        hover:shadow-cyan-500/30
      "
    >
      <Link href="/login">
        LOGIN
      </Link>
    </Button>
  )
}
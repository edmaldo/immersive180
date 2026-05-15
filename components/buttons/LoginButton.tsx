"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginButton() {
  return (
    <Button
      className="
        group
        relative
        inline-flex
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        px-10
        py-4
        text-sm
        font-semibold
        tracking-wide
        text-white
        transition-all
        duration-300
        hover:scale-[1.02]
      "
    >
      <Link href="/login">
      {/* Outer Glow */}
      <span
        className="
          absolute
          inset-0
          rounded-2xl
          bg-gradient-to-r
          from-blue-500
          via-purple-500
          to-pink-500
          opacity-80
          blur-md
          transition-all
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Dark Inner Background */}
      <span
        className="
          absolute
          inset-[2px]
          rounded-2xl
          bg-black
        "
      />

      {/* Border Glow */}
      <span
        className="
          absolute
          inset-0
          rounded-2xl
          border
          border-white/10
        "
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
          />
        </svg>

        <span>
            LOGIN
        </span>
      </span>
      </Link>
    </Button>
  );
}
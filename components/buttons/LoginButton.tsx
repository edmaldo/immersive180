"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginButton() {
  return (
    <Button
      asChild
      className="bg-violet-600 text-white hover:bg-violet-500"
    >
      <Link href="/login">
        Login
      </Link>
    </Button>
  )
}
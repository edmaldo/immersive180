"use client"
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  const handleLogout = async () => {
    const supabase = createClient()

    await supabase.auth.signOut()

    redirect("/")
  }

  return (
    <Button
      className="bg-red-600 text-white hover:bg-red-500"
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}
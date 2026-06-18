"use client";

import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    redirect("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-zinc-300
        transition
        hover:bg-red-950/40
        hover:text-red-300
      "
    >
      <LogOut className="h-[18px] w-[18px]" />

      <span className="text-sm font-medium">Logout</span>
    </button>
  );
}

import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Home, Compass, Upload, Menu, Settings } from "lucide-react";

import LogoutButton from "@/components/buttons/LogoutButton";
import UploadButton from "@/components/dashboard/UploadButton";
import MobileSidebar from "@/components/dashboard/MobileSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/signup");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden w-[260px] border-r border-white/5 bg-zinc-950 lg:flex lg:flex-col">
          <nav className="flex flex-1 flex-col px-4 py-8">
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-xl bg-blue-600/10 px-4 py-3 text-sm hover:bg-blue-600/15"
              >
                <Home size={18} />
                Dashboard
              </Link>

              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                <Compass size={18} />
                Browse
              </button>
            </div>

            <div className="mt-10">
              <p className="mb-3 px-4 text-xs uppercase tracking-widest text-zinc-500">
                Creator
              </p>

              <UploadButton />
              <LogoutButton />
            </div>
          </nav>
        </aside>

        {/* MAIN AREA */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* HEADER */}
          <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
            <div className="flex h-[72px] items-center justify-between px-4 md:px-8">
              {/* LEFT */}
              <div className="flex items-center gap-4">
                {/* MOBILE MENU PLACEHOLDER */}
                <div className="lg:hidden">
                  <MobileSidebar />
                </div>

                {/* LOGO */}
                <Link
                  href="/dashboard"
                  className="
                    inline-flex
                    items-center
                    whitespace-nowrap
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                  "
                >
                  <span
                    className="
                      text-3xl
                      font-extralight
                      tracking-[0.12em]
                      text-white
                      uppercase
                      drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]
                    "
                  >
                    IMMERSIVE
                  </span>

                  <span
                    className="
                      text-3xl
                      font-medium
                      tracking-[0.08em]
                      bg-gradient-to-r
                      from-violet-400
                      via-blue-400
                      to-indigo-500
                      bg-clip-text
                      text-transparent
                      drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]
                    "
                  >
                    180
                  </span>
                </Link>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                {/* SETTINGS PLACEHOLDER */}
                <button className="rounded-xl border border-zinc-800 p-2 text-zinc-400 transition hover:text-white">
                  <Settings size={18} />
                </button>

                {/* FUTURE PROFILE BUTTON */}
                <button className="h-10 w-10 overflow-hidden rounded-full border border-zinc-700">
                  <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-sm">
                    {profile.full_name?.charAt(0) || "U"}
                  </div>
                </button>
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </main>
  );
}

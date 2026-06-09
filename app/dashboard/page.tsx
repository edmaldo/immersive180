import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import UploadButton from "@/components/dashboard/UploadButton";
import VideoLibrary from "@/components/dashboard/VideoLibrary";
import {
  Home,
  Compass,
  Download,
  Settings,
} from "lucide-react";

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
        active
          ? "bg-blue-600/15 text-white"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
  .from("profiles")
  .select("full_name, avatar_url")
  .eq("id", user?.id)
  .single();

    const { data: videos, error } = await supabase
    .from("videos")
    .select("*")
    .eq("creator_id", user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }



  return (
    <main className="flex min-h-screen bg-black text-white">

      <aside className="hidden w-[260px] border-r border-zinc-900 bg-zinc-950 xl:flex xl:flex-col">
        <div className="px-8 py-8">
          <h1 className="text-3xl font-bold tracking-tight">
            IMMERSIVE
            <span className="text-blue-500">180</span>
          </h1>
        </div>

<nav className="flex-1 px-4">
  {/* MAIN */}
  <div className="space-y-2">
    <SidebarItem
      icon={<Home size={18} />}
      label="Dashboard"
      active
    />

    <SidebarItem
      icon={<Compass size={18} />}
      label="Browse"
    />
  </div>

  {/* CREATOR */}
<div className="mt-10">
  <p className="mb-3 px-4 text-xs uppercase tracking-widest text-zinc-500">
    Creator
  </p>
    <UploadButton />
</div>

  {/* LIBRARY */}
  <div className="mt-10">
    <p className="mb-3 px-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
      Library
    </p>

    <div className="space-y-2">
      <SidebarItem
        icon={<Download size={18} />}
        label="Purchased"
      />
    </div>
  </div>
</nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1">
        {/* TOPBAR */}
        <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <h1 className="text-3xl font-bold">
                
                Welcome {profile?.full_name || ""}</h1>

              <p className="mt-1 text-zinc-400">
                Dive back into immersive experiences.
              </p>
            </div>

            <div className="flex items-center gap-5">

              <button className="text-zinc-400 transition hover:text-white">
                <Settings />
              </button>


              <div className="h-11 w-11 overflow-hidden rounded-full border border-zinc-700">
                  {profile?.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800 text-sm text-white">
                      {profile?.full_name?.charAt(0) || "U"}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="px-6 py-8">
            <VideoLibrary videos={videos || []} />
        </div>
      </section>
    </main>
  )
}
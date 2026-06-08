import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import UploadButton from "@/components/dashboard/UploadButton";
import {
  Home,
  Compass,
  Download,
  Settings,
} from "lucide-react";

const purchasedVideos = [
  {
    title: "Hiking the Canadian Rockies",
    creator: "Peak Perspective",
    duration: "8:24",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    youtube: "https://youtube.com",
  },
  {
    title: "Swim with Sea Turtles",
    creator: "Oceanic 180",
    duration: "6:47",
    thumbnail:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
    youtube: "https://youtube.com",
  },
  {
    title: "Northern Lights in Iceland",
    creator: "Arctic Visuals",
    duration: "7:15",
    thumbnail:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1600&auto=format&fit=crop",
    youtube: "https://youtube.com",
  },
  {
    title: "Waterfalls of Costa Rica",
    creator: "Jungle Frames",
    duration: "5:32",
    thumbnail:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1600&auto=format&fit=crop",
    youtube: "https://youtube.com",
  },
];

function Section({
  title,
  subtitle,
  videos,
}: {
  title: string;
  subtitle: string;
  videos: any[];
}) {
  return (
    <section className="mb-12">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        </div>

        <button className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-white transition hover:border-zinc-700">
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {videos.map((video, index) => (
          <Link
            href={video.youtube || "#"}
            key={index}
            className="group overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 transition hover:border-blue-500/40"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                {video.duration}
              </div>
            </div>

            <div className="p-4">
              <h3 className="line-clamp-1 text-base font-medium text-white">
                {video.title}
              </h3>

              <p className="mt-1 text-sm text-zinc-400">
                by {video.creator}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

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
        <div className="m-4 rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5">
          <h3 className="text-lg font-semibold">
            Community Member
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Upload your videos and share your immersive experiences with the world.
          </p>

          <button className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-medium transition hover:bg-blue-500">
            Become a Creator
          </button>
        </div>
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
          <Section
            title="Your Uploads"
            subtitle="Your immersive collection"
            videos={purchasedVideos}
          />
        </div>
      </section>
    </main>
  )
}
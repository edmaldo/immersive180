import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/buttons/LogoutButton";

import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Compass,
  Grid2X2,
  Users,
  Heart,
  Download,
  Settings,
  Search,
  Bell,
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

const suggestedVideos = [
  {
    title: "Desert Adventures",
    creator: "Beyond 180",
    duration: "6:11",
    thumbnail:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Coral Reefs of Palau",
    creator: "Oceanic 180",
    duration: "7:02",
    thumbnail:
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Into the Ice Caves",
    creator: "Arctic Visuals",
    duration: "6:38",
    thumbnail:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Cappadocia Sunrise",
    creator: "Wanderlust VR",
    duration: "5:45",
    thumbnail:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1600&auto=format&fit=crop",
  },
];

const featuredVideos = [
  {
    title: "Earth From Space",
    creator: "Horizon 180",
    duration: "8:03",
    thumbnail:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Wildlife of Africa",
    creator: "Safari 180",
    duration: "7:28",
    thumbnail:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Surfing Pipeline POV",
    creator: "Wave Riders",
    duration: "6:19",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Machu Picchu Explorer",
    creator: "Timeless Journeys",
    duration: "6:55",
    thumbnail:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1600&auto=format&fit=crop",
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

              <div className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                8K
              </div>

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
    
      if (!user) {
        redirect("/");
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
          <div className="space-y-2">
            <SidebarItem icon={<Home size={18} />} label="Dashboard" active />
            <SidebarItem icon={<Compass size={18} />} label="Browse" />
            <SidebarItem icon={<Grid2X2 size={18} />} label="Categories" />
            <SidebarItem icon={<Users size={18} />} label="Creators" />
            <SidebarItem icon={<Heart size={18} />} label="Favorites" />
          </div>

          <div className="mt-10">
            <p className="mb-3 px-4 text-xs uppercase tracking-widest text-zinc-500">
              Library
            </p>

            <div className="space-y-2">
              <SidebarItem
                icon={<Download size={18} />}
                label="Purchased"
              />
            </div>
          </div>

          <div className="mt-10">
            <p className="mb-3 px-4 text-xs uppercase tracking-widest text-zinc-500">
              Account
            </p>

            <div className="space-y-2">
              <SidebarItem
                icon={<Settings size={18} />}
                label="Settings"
              />

              <LogoutButton />
            </div>
          </div>
        </nav>

        <div className="m-4 rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5">
          <h3 className="text-lg font-semibold">
            Create & Sell 180° Videos
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Share your immersive content with audiences around the world.
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
              <h1 className="text-3xl font-bold">Welcome back, Explorer 👋</h1>

              <p className="mt-1 text-zinc-400">
                Dive back into immersive experiences.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <button className="text-zinc-400 transition hover:text-white">
                <Search />
              </button>

              <button className="text-zinc-400 transition hover:text-white">
                <Bell />
              </button>

              <div className="h-11 w-11 overflow-hidden rounded-full border border-zinc-700">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
                  alt="User avatar"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="px-6 py-8">
          <Section
            title="Your Purchased Videos"
            subtitle="Your immersive collection"
            videos={purchasedVideos}
          />

          <Section
            title="Suggested For You"
            subtitle="Based on your viewing history"
            videos={suggestedVideos}
          />

          <Section
            title="Featured on Immersive180"
            subtitle="Handpicked immersive experiences"
            videos={featuredVideos}
          />
        </div>
      </section>
    </main>
  )
}
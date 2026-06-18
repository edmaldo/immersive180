"use client";

import Link from "next/link";
import { Home, Compass, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import UploadButton from "@/components/dashboard/UploadButton";
import LogoutButton from "@/components/buttons/LogoutButton";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="rounded-lg p-2 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[280px] border-zinc-800 bg-black p-0 text-white"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-zinc-900 px-6 py-6">
            <Link
              href="/dashboard"
              className="text-2xl font-bold tracking-tight"
            >
              IMMERSIVE
              <span className="text-blue-500">180</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-xl bg-blue-600/10 px-4 py-3 text-sm transition hover:bg-blue-600/15"
              >
                <Home size={18} />
                Dashboard
              </Link>

              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                <Compass size={18} />
                Browse
              </button>
            </div>

            {/* Creator */}
            <div className="mt-10">
              <p className="mb-3 px-4 text-xs uppercase tracking-widest text-zinc-500">
                Creator
              </p>

              <UploadButton />
              <LogoutButton />
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

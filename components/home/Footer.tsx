// components/home/Footer.tsx

import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-24">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,92,255,0.14),transparent_55%)] pointer-events-none" />

      {/* MAIN GRID */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-20 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* BRAND */}
          <div className="overflow-visible">
            <img
              src="/logo.svg"
              alt="Immersive180 Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* SOCIAL BUTTONS */}
          <div className="mt-5 flex items-center gap-4">
            <SocialButton />
            <SocialButton />
            <SocialButton />
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <FooterHeading title="Explore" />

          <div className="mt-6 space-y-4">
            <FooterLink label="Browse Videos" />
            <FooterLink label="Featured Creators" />
          </div>
        </div>

        {/* ABOUT */}
        <div>
          <FooterHeading title="About" />

          <div className="mt-6 space-y-4">
            <FooterLink label="About Us" />
            <FooterLink label="How It Works" />
            <FooterLink label="Contact" />
          </div>
        </div>

        {/* JOIN */}
        <div>
          <FooterHeading title="Join" />

          <div className="mt-6 space-y-4">
            <FooterLink label="Create Account" />
            <FooterLink label="Sign In" />
          </div>
        </div>
      </div>

      {/* META STYLE LEGAL LINKS */}
      <div className="relative border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* LEGAL LINKS */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
            <Link href="#" className="transition hover:text-[#9f93ff]">
              Terms
            </Link>

            <div className="h-4 w-px bg-white/10" />

            <Link href="#" className="transition hover:text-[#9f93ff]">
              Privacy
            </Link>

            <div className="h-4 w-px bg-white/10" />

            <Link href="#" className="transition hover:text-[#9f93ff]">
              Cookies
            </Link>

            <div className="h-4 w-px bg-white/10" />

            <Link href="#" className="transition hover:text-[#9f93ff]">
              Creator Guidelines
            </Link>

            <div className="h-4 w-px bg-white/10" />

            <Link href="#" className="transition hover:text-[#9f93ff]">
              DMCA
            </Link>

            <div className="h-4 w-px bg-white/10" />

            <Link href="#" className="transition hover:text-[#9f93ff]">
              Support
            </Link>
          </div>

          {/* BOTTOM ROW */}
          <div className="mt-8 flex flex-row items-center justify-center gap-4 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <Globe size={15} />
              <span>English (US)</span>
            </div>

            <div className="h-4 w-px bg-white/10" />

            <p>© 2026 Immersive180. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ title }: { title: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-300">
        {title}
      </h3>

      <div className="mt-4 h-px w-12 bg-linear-to-r from-[#8b7cff] to-transparent" />
    </div>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <Link
      href="#"
      className="block text-zinc-500 transition duration-200 hover:text-[#9f93ff]"
    >
      {label}
    </Link>
  );
}

function SocialButton() {
  return (
    <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/3 text-zinc-400 transition-all duration-300 hover:border-[#8b7cff]/50 hover:bg-[#8b7cff]/10 hover:text-white">
      <Globe size={18} />
    </button>
  );
}

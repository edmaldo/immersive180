// components/home/Footer.tsx

import Link from "next/link";
import { SocialButton } from "@/components/buttons/SocialButton";
import { SiInstagram, SiTiktok, SiX } from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-14">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,92,255,0.14),transparent_55%)] pointer-events-none" />

      {/* MAIN GRID */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* LOGO */}
          <div
            className="
                  text-sm
                  font-extralight
                  tracking-[0.25em]
                  sm:tracking-[0.35em]
                  md:tracking-[0.45em]
                  text-white
                  whitespace-nowrap
                "
          >
            IMMERSIVE
            <span className="ml-2 sm:ml-3 bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
              180
            </span>
          </div>

          {/* SOCIAL BUTTONS */}
          <div className="mt-5 flex items-center gap-4">
            <SocialButton icon={SiX} href="https://www.x.com/" />
            <SocialButton
              icon={SiInstagram}
              href="https://www.instagram.com/"
            />
            <SocialButton icon={SiTiktok} href="https://www.tiktok.com/" />
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
          </div>
        </div>

        {/* JOIN */}
        <div>
          <FooterHeading title="Join" />

          <div className="mt-6 space-y-4">
            <FooterLink label="Create Account" href="/signup" />
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

function FooterLink({ label, href }: { label: string; href?: string }) {
  return (
    <Link
      href={href || "#"}
      className="block text-zinc-500 transition duration-200 hover:text-[#9f93ff]"
    >
      {label}
    </Link>
  );
}

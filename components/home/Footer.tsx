// components/home/Footer.tsx

import Link from "next/link";
import {
  Music2,
  ShieldCheck,
  BadgeCheck,
  Headphones,
  Globe,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black text-white">
      {/* TOP */}
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.4fr]">
        {/* BRAND */}
        <div>
          <h2 className="text-5xl font-bold tracking-tight">
            IMMERSIVE
            <span className="text-blue-500">180</span>
          </h2>

          <p className="mt-6 max-w-sm text-lg leading-relaxed text-zinc-400">
            Explore the world from every angle. Premium 180° & VR experiences
            from top creators.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <SocialButton icon={<Globe size={20}     />} />
            <SocialButton icon={<Globe size={20} />} />
            <SocialButton icon={<Globe size={20} />} />
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <FooterHeading title="Explore" />

          <div className="mt-6 space-y-4 text-zinc-400">
            <FooterLink label="Browse All Videos" />
            <FooterLink label="Categories" />
            <FooterLink label="Featured" />
            <FooterLink label="Creators" />
            <FooterLink label="Collections" />
          </div>
        </div>

        {/* ABOUT */}
        <div>
          <FooterHeading title="About" />

          <div className="mt-6 space-y-4 text-zinc-400">
            <FooterLink label="About Us" />
            <FooterLink label="How It Works" />
            <FooterLink label="For Creators" />
          </div>
        </div>

        {/* ACCOUNT */}
        <div>
          <FooterHeading title="Account" />

          <div className="mt-6 space-y-4 text-zinc-400">
            <FooterLink label="My Library" />
            <FooterLink label="Favorites" />
            <FooterLink label="Purchases" />
            <FooterLink label="Settings" />
          </div>
        </div>
      </div>

      {/* MIDDLE STRIP */}
      <div className="border-y border-zinc-900">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-4">
          <InfoCard
            icon={<BadgeCheck size={28} />}
            title="Premium Quality"
            text="8K immersive experiences from top creators."
          />

          <InfoCard
            icon={<ShieldCheck size={28} />}
            title="Secure Payments"
            text="Payments powered securely with Stripe Connect."
          />

          <InfoCard
            icon={<Headphones size={28} />}
            title="Creator Support"
            text="Helping creators build immersive businesses."
          />

          <div className="flex flex-col justify-center">
            <p className="text-lg text-zinc-300">
              Secure payments powered by
            </p>

            <h3 className="mt-2 text-4xl font-bold text-blue-500">stripe</h3>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 text-sm text-zinc-500 md:flex-row">
        <p>© 2026 Immersive180. All rights reserved.</p>

        <div className="flex items-center gap-3">
          <Globe size={16} />
          English
        </div>

        <p>Made for explorers everywhere.</p>
      </div>
    </footer>
  );
}

function FooterHeading({ title }: { title: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold uppercase tracking-wide">
        {title}
      </h3>

      <div className="mt-4 h-[2px] w-10 bg-blue-500" />
    </div>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <Link
      href="#"
      className="block transition hover:text-white"
    >
      {label}
    </Link>
  );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition hover:border-blue-500 hover:text-white">
      {icon}
    </button>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-blue-500">{icon}</div>

      <div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>

        <p className="mt-2 text-zinc-400">{text}</p>
      </div>
    </div>
  );
}
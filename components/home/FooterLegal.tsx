// components/home/FooterLegal.tsx

import Link from "next/link";

export default function FooterLegal() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Legal Links */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
          <FooterLink href="/terms" label="Terms" />

          <div className="h-4 w-px bg-white/10" />

          <FooterLink href="/privacy" label="Privacy" />

          <div className="h-4 w-px bg-white/10" />

          <FooterLink href="/cookies" label="Cookies" />

          <div className="h-4 w-px bg-white/10" />

          <FooterLink href="/creator-guidelines" label="Creator Guidelines" />

          <div className="h-4 w-px bg-white/10" />

          <FooterLink href="/contact" label="Contact" />
        </div>

        {/* Bottom Row */}
        <div className="mt-8 flex items-center justify-center text-sm text-zinc-600">
          <p>© {new Date().getFullYear()} Immersive180. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="transition duration-200 hover:text-[#9f93ff]">
      {label}
    </Link>
  );
}

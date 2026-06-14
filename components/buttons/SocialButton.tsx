import type { ComponentType, SVGProps } from "react";

type SimpleIcon = ComponentType<SVGProps<SVGSVGElement>>;

type SocialButtonProps = {
  icon: SimpleIcon;
  href: string;
};

export function SocialButton({ icon: Icon, href }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 hover:border-[#8b7cff]/50 hover:bg-[#8b7cff]/10 hover:text-white"
    >
      <Icon width={16} height={16} />
    </a>
  );
}

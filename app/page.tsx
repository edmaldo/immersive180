import LoginButton from "@/components/buttons/LoginButton"

export default function HomePage() {
  return (
    <main className="hero-glow flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="
        font-sans
        animate-[glow_4s_ease-in-out_infinite]
        bg-gradient-to-r
        from-white
        via-violet-200
        to-cyan-300
        bg-clip-text
        text-7xl
        text-transparent
        md:text-8xl
        lg:text-9xl
        font-[650]
        tracking-[-0.06em]
        drop-shadow-[0_0_30px_rgba(168,85,247,0.18)]
        uppercase
        ">
          immersive180
        </h1>

        <p className="mt-6 text-sm tracking-[0.25em] text-white/45 uppercase">
          The future of VR storytelling
        </p>

        <div className="mt-10 flex justify-center">
          <LoginButton />
        </div>
      </div>
    </main>
  )
}
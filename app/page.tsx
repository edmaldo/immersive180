import LoginButton from "@/components/buttons/LoginButton"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-white">
      <div className="text-center">
        <h1 className="
        animate-[glow_4s_ease-in-out_infinite]
        bg-gradient-to-r
        from-white
        via-violet-200
        to-cyan-300
        bg-clip-text
        text-7xl
        font-black
        tracking-tight
        text-transparent
        drop-shadow-[0_0_25px_rgba(124,58,237,0.35)]
        md:text-8xl
        lg:text-9xl
        ">
          IMMERSIVE180
        </h1>

        <p className="mt-6 text-xl text-zinc-400">
          The future of immersive VR storytelling.
        </p>

        <div className="mt-10 flex justify-center">
          <LoginButton />
        </div>
      </div>
    </main>
  )
}
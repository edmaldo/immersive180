export default function FeaturedSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-28 text-white">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(91,33,182,0.18),transparent_35%)]" />
      <div className="absolute left-[-10%] top-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-3xl" />
      <div className="absolute right-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Top Badge */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-xs tracking-[0.25em] text-violet-300 backdrop-blur-md">
            BUILT FOR CREATORS. MADE FOR EXPLORERS.
          </div>
        </div>

        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-semibold leading-none tracking-tight md:text-7xl">
            The home for{" "}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              immersive
            </span>
            <br />
            experiences
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 md:text-xl">
            Buy and sell 180° experiences in a marketplace built for creators
            and adventurers.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-4">
          {[
            {
              title: "Immersive 180° Content",
              desc: "High-quality VR experiences that place viewers inside the moment.",
            },
            {
              title: "Creator Marketplace",
              desc: "Upload, monetize, and reach audiences around the world.",
            },
            {
              title: "Secure Payments",
              desc: "Stripe Connect payouts with secure global transactions.",
            },
            {
              title: "Global Reach",
              desc: "Deliver immersive experiences instantly across devices.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.05]"
            >
              {/* Glow Hover */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-blue-500/10" />
              </div>

              {/* Icon Circle */}
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-2xl text-violet-300">
                ✦
              </div>

              <h3 className="relative text-xl font-medium">
                {item.title}
              </h3>

              <p className="relative mt-4 leading-relaxed text-white/60">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Cards */}
        <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "For Creators",
              desc: "Upload immersive content, set pricing, and grow your audience.",
              button: "Start Selling",
            },
            {
              title: "For Buyers",
              desc: "Discover cinematic VR experiences from creators worldwide.",
              button: "Start Exploring",
            },
            {
              title: "Secure Payments",
              desc: "Fast onboarding and automated creator payouts with Stripe.",
              button: "Learn More",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-10 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/30"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10" />
              </div>

              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl">
                  ✦
                </div>

                <h3 className="text-2xl font-semibold">{card.title}</h3>

                <p className="mt-4 leading-relaxed text-white/60">
                  {card.desc}
                </p>

                <button className="mt-8 text-sm font-medium text-violet-300 transition hover:text-white">
                  {card.button} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stripe Line */}
        <div className="mt-20 flex items-center justify-center">
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white/50 backdrop-blur-xl">
            Powered by Stripe Connect
          </div>
        </div>
      </div>
    </section>
  );
}
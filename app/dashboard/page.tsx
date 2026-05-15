import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import BuyButton from "@/components/buttons/BuyButton";
import LogoutButton from "@/components/buttons/LogoutButton";
import UploadButton from '@/components/buttons/UploadButton'

export default async function DashboardPage() {
      const supabase = await createClient();
    
      const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        redirect("/");
      }
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Top Navigation */}
      <header className="border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Immersive180
            </h1>
            <p className="text-sm text-zinc-400">
              Creator Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <BuyButton />

            <UploadButton />

            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            Welcome Back
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            {user.email}
          </h2>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Manage your immersive VR content, upload new experiences,
            and monitor creator performance from your dashboard.
          </p>

          <div className="mt-8 flex gap-4">
            <UploadButton />

            <Button
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10"
            >
              Browse Marketplace
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
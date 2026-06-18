import { createClient } from "@/lib/supabase/server";
import VideoLibrary from "@/components/dashboard/VideoLibrary";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: videos, error } = await supabase
    .from("videos")
    .select("*")
    .eq("creator_id", user?.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
      <VideoLibrary videos={videos || []} />
    </section>
  );
}

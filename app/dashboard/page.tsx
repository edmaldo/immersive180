import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BuyButton from "@/components/BuyButton";
import LogoutButton from "@/components/LogoutButton";
import UploadButton from '@/components/UploadButton'


export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <p>Welcome {user.email}</p>

      <LogoutButton />
      <BuyButton />
      <UploadButton />
    </main>
  );
}
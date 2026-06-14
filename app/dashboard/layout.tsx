import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // CHECK AUTH
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // NOT LOGGED IN
  if (!user) {
    redirect("/");
  }

  // OPTIONAL:
  // verify profile exists
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  // if somehow auth exists without profile
  // send them back to signup
  if (!profile) {
    redirect("/signup");
  }

  return <>{children}</>;
}

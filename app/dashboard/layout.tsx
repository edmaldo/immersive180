import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import CompleteProfileModal from "@/components/CompleteProfileModal"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const supabase = await createClient()

  // AUTH CHECK
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  // CHECK PROFILE
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()

console.log(profile)
console.log(Error)

  return (
    <div>

      {/* SHOW MODAL IF NO PROFILE */}
      {!profile && (
        <CompleteProfileModal
          userId={user.id}
          email={user.email || ""}
        />
      )}

      {children}

    </div>
  )
}
import SignupForm from "@/components/auth/SignupForm";
import FooterLegal from "@/components/home/FooterLegal";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1">
        <SignupForm />
      </div>

      <FooterLegal />
    </main>
  );
}

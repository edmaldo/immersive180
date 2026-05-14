"use client";

import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/login")}
      className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition mt-4"
    >
      Login
    </button>
  );
}
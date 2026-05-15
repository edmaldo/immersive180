"use client";

import { Button } from "@/components/ui/button"

export default function BuyButton() {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <Button
      onClick={handleCheckout}
      className="bg-violet-600 text-white hover:bg-violet-500"
    >
      Buy VR Video
    </Button>
  );
}
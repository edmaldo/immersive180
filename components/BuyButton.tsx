"use client";

export default function BuyButton() {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-black text-white px-4 py-2 rounded-lg"
    >
      Buy VR Video
    </button>
  );
}
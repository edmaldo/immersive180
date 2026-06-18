export default function ProfileButton({ letter }: { letter: string }) {
  return (
    <button className="h-10 w-10 overflow-hidden rounded-full border border-zinc-700">
      <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-sm">
        {letter}
      </div>
    </button>
  );
}

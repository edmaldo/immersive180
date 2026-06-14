import Image from "next/image";
import Link from "next/link";

interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  duration: string;
  status: string;
}

export default function VideoLibrary({
  videos,
}: {
  videos: Video[];
}) {
  if (videos.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center">
        <h2 className="text-xl font-semibold text-white">
          No uploads yet
        </h2>

        <p className="mt-2 text-zinc-400">
          Upload your first immersive experience.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-white">
          Manage Library
        </h1>

        <p className="mt-1 text-zinc-400">
          Your immersive collection
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {videos.map((video) => (
          <Link
            href={`/dashboard/videos/${video.id}`}
            key={video.id}
            className="group overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 transition hover:border-purple-500/40"
          >
            {/* THUMBNAIL */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={"/placeholders/immersive180_tn.png"}
                alt={video.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {/* STATUS */}
              <div className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-xs text-white backdrop-blur">
                {video.status || "processing"}
              </div>

              {/* DURATION */}
              <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs text-white backdrop-blur">
                {video.duration || "0:00"}
              </div>

              {/* PLAY ICON */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                <div className="rounded-full bg-black/50 p-4 backdrop-blur">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-1.427 1.529-2.33 2.779-1.643l11.25 6.347c1.295.73 1.295 2.556 0 3.286l-11.25 6.347c-1.25.687-2.779-.216-2.779-1.643V5.653z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* TITLE */}
            <div className="p-4">
              <h2 className="line-clamp-1 text-base font-medium text-white">
                {video.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
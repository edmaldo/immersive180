"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function AvatarUpload({
  userId,
}: {
  userId: string;
}) {
  const supabase = createClient();

  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  async function uploadAvatar(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    try {
      setUploading(true);

      const file = event.target.files?.[0];

      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}.${fileExt}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          upsert: true,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
        })
        .eq("id", userId);

      setImageUrl(publicUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Profile Avatar"
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
      />

      {uploading && (
        <p className="text-sm text-zinc-400">
          Uploading...
        </p>
      )}
    </div>
  );
}
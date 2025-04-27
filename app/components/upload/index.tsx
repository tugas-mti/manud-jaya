"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface UploadProps {
  name?: string;
  onChange?: (file: string | null) => void;
  value?: string;
  placeholder?: string;
}

export default function Upload({ name, onChange, value }: UploadProps) {
  const [preview, setPreview] = useState<string | undefined>(value);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // check the file size 2MB
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 1MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);

      // send to server
      const url = "https://mataair-api.orbitallabs.net/upload";
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = (await res.json()) as { data: { full_path: string } };
        onChange?.(data.data.full_path);
      }
    }
  };

  return (
    <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-gray-400 transition-colors">
      <input
        name={name}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      {preview && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}

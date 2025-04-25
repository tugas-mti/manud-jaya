"use client";

import { Dialog } from "@/app/components/dialog";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const YoutubeSchema = z.object({
  url: z.string().url("Invalid URL"),
});

type YoutubeModalProps = {
  youtube?: { url: string };
};

export default function YoutubeModal({ youtube }: YoutubeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(YoutubeSchema),
    defaultValues: {
      url: youtube?.url || "",
    },
  });

  const handleFormSubmit = async (data: { url: string }) => {
    const res = await fetch("/api/youtube", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setIsOpen(false);
    } else {
      console.error("Failed to update Youtube config");
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        onClick={() => setIsOpen(true)}
      >
        Youtube Config
      </button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Youtube Config"
      >
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4"
        >
          <div>
            <label htmlFor="url" className="block mb-2">
              Youtube URL
            </label>
            <input
              type="text"
              id="url"
              {...register("url")}
              className={`border ${
                errors.url ? "border-red-500" : "border-gray-300"
              } p-2 rounded w-full`}
            />
            {errors.url && (
              <span className="text-red-500">{errors.url.message}</span>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

"use client";

import { Dialog } from "@/app/components/dialog";
import { useState } from "react";
import { Gallery } from "@prisma/client";

// zod schema
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Upload from "@/app/components/upload";

const CreateGallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  published: z.enum(["true", "false"]).transform((val) => val === "true"),
});

type GalleryModalProps = {
  type: "create" | "edit";
  gallery?: Gallery;
};

export default function GalleryModal({ type, gallery }: GalleryModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateGallerySchema),
    defaultValues: {
      title: gallery?.title || "",
      description: gallery?.description || "",
      image: gallery?.image || "",
      published: gallery?.published || false,
    },
  });

  const handleFormSubmit = async (data: {
    title?: string;
    description?: string;
    image?: string;
    published?: boolean;
  }) => {
    const url =
      type === "edit" && gallery?.id
        ? `/api/galleries/${gallery.id}`
        : "/api/galleries";

    const res = await fetch(url, {
      method: type === "edit" ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to ${type} gallery`);
    }

    setIsOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!gallery?.id) return;

    try {
      const res = await fetch(`/api/galleries/${gallery.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete gallery");
      }

      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting gallery:", error);
    } finally {
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        onClick={() => setIsOpen(true)}
      >
        {type === "edit" ? "Edit" : "Add New"}
        {type === "edit" ? null : <PlusCircle className="ml-2" />}
      </button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title={type === "edit" ? "Edit Gallery" : "Create Gallery"}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <input
                  type="text"
                  id="title"
                  {...field}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
              )}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <textarea
                  id="description"
                  {...field}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                />
              )}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, value } }) => (
                <Upload value={String(value)} onChange={onChange} />
              )}
            />
            {errors.image && (
              <p className="mt-2 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="published"
              className="block text-sm font-medium text-gray-700"
            >
              Published
            </label>
            <Controller
              control={control}
              name="published"
              render={({ field: { onChange, value } }) => (
                <select
                  id="published"
                  value={String(value)}
                  onChange={(e) => onChange(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              )}
            />
          </div>
          <div className="flex justify-end">
            {type === "edit" && (
              <button
                type="button"
                className="mr-auto bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            )}
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

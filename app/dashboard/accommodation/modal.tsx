"use client";

import { Dialog } from "@/app/components/dialog";
import { useState } from "react";
import { Accommodation } from "@prisma/client";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Upload from "@/app/components/upload";
import RichTextEditor from "@/app/components/rich-text-editor/editor";

const CreateAccommodationSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  image: z.string().min(1, "Image is required"),
  published: z.boolean().optional(),
});

type AccommodationModalProps = {
  type: "create" | "edit";
  accommodation?: Accommodation;
};

export default function AccommodationModal({
  type,
  accommodation,
}: AccommodationModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateAccommodationSchema),
    defaultValues: {
      name: accommodation?.name || "",
      description: accommodation?.description || "",
      price: accommodation?.price || 0,
      /** @ts-ignore */
      image: accommodation?.images?.[0]?.url || "",
      published: accommodation?.published || false,
    },
  });

  const handleFormSubmit = async (data: {
    title?: string;
    description?: string;
    price?: number;
    image?: string;
    published?: boolean;
    location?: string;
    rooms?: number;
  }) => {
    const url =
      type === "edit" && accommodation?.id
        ? `/api/accommodations/${accommodation.id}`
        : "/api/accommodations";

    const res = await fetch(url, {
      method: type === "edit" ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to ${type} accommodation`);
    }

    setIsOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!accommodation?.id) return;

    try {
      const res = await fetch(`/api/accommodations/${accommodation.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete accommodation");
      }

      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting accommodation:", error);
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
        title={type === "edit" ? "Edit Accommodation" : "Create Accommodation"}
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
              name="name"
              render={({ field }) => (
                <input
                  type="text"
                  id="name"
                  {...field}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
              )}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
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
              render={({ field: { value, onChange } }) => (
                <RichTextEditor value={value} onChange={onChange} />
              )}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price per Night
              </label>
              <Controller
                control={control}
                name="price"
                render={({ field: { value, onChange } }) => (
                  <input
                    type="number"
                    id="price"
                    value={value}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      onChange(isNaN(val) ? 0 : val);
                    }}
                    min="0"
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.price ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
              {errors.price && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>
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
                  value={value ? "true" : "false"}
                  onChange={(e) => onChange(e.target.value === "true")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              )}
            />
            {errors.published && (
              <p className="mt-2 text-sm text-red-600">
                {errors.published.message}
              </p>
            )}
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
              {type === "edit" ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

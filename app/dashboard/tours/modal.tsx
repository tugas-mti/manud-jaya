"use client";

import { Dialog } from "@/app/components/dialog";
import { useState } from "react";
import { Tour } from "@prisma/client";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Upload from "@/app/components/upload";
import RichTextEditor from "@/app/components/rich-text-editor/editor";
import { toast } from "sonner";

const CreateTourSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  image: z.string().min(1, "Image is required"),
  published: z.boolean().optional(),
});

type TourModalProps = {
  type: "create" | "edit";
  tour?: Tour;
};

export default function TourModal({ type, tour }: TourModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateTourSchema),
    defaultValues: {
      title: tour?.title || "",
      description: tour?.description || "",
      price: tour?.price || 0,
      /** @ts-ignore */
      image: tour?.images?.[0]?.url || "",
      published: tour?.published || false,
    },
  });

  const handleFormSubmit = async (data: {
    title?: string;
    description?: string;
    price?: number;
    image?: string;
    published?: boolean;
  }) => {
    const url =
      type === "edit" && tour?.id ? `/api/tours/${tour.id}` : "/api/tours";

    const res = await fetch(url, {
      method: type === "edit" ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to ${type} tour`);
    }

    setIsOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!tour?.id) return;

    try {
      const res = await fetch(`/api/tours/${tour.id}`, {
        method: "DELETE",
      });

      if (res.status === 400) {
        toast.error(
          "Cannot delete tour with existing bookings. Please remove bookings first."
        );
        setIsOpen(false);
        router.refresh();
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to delete tour");
      }

      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting tour:", error);
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
        title={type === "edit" ? "Edit Tour" : "Create Tour"}
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
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
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

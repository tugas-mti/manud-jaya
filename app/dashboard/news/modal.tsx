"use client";

import { Dialog } from "@/app/components/dialog";
import { useState } from "react";
import { News } from "@prisma/client";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Upload from "@/app/components/upload";
import RichTextEditor from "@/app/components/rich-text-editor/editor";

const CreateNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(),
  type: z.enum(["news", "event", "festival"]).optional(),
  published: z.boolean().optional(),
});

type NewsModalProps = {
  type: "create" | "edit";
  news?: News;
};

export default function NewsModal({ type, news }: NewsModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateNewsSchema),
    defaultValues: {
      title: news?.title || "",
      content: news?.content || "",
      image: news?.image || "",
      type: (news?.type as "news" | "event" | "festival") || "news",
      published: news?.published || false,
    },
  });

  const handleFormSubmit = async (data: {
    title?: string;
    content?: string;
    image?: string;
    published?: boolean;
  }) => {
    const url =
      type === "edit" && news?.id ? `/api/news/${news.id}` : "/api/news";

    console.log("url", url);
    const res = await fetch(url, {
      method: type === "edit" ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to ${type} news`);
    }

    setIsOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!news?.id) return;

    try {
      const res = await fetch(`/api/news/${news.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete news");
      }

      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting news:", error);
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
        title={type === "edit" ? "Edit News" : "Create News"}
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
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <Controller
              control={control}
              name="content"
              render={({ field: { value, onChange } }) => (
                <RichTextEditor value={value} onChange={onChange} />
              )}
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-600">
                {errors.content.message}
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
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <select
                  id="type"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="news">News</option>
                  <option value="event">Event</option>
                  <option value="festival" selected>
                    Festival
                  </option>
                </select>
              )}
            />
            {errors.type && (
              <p className="mt-2 text-sm text-red-600">{errors.type.message}</p>
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
              Post
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

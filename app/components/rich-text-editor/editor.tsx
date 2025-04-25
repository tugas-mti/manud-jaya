"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false });

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};
export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: string) => {
    onChange(newContent);
  };

  return (
    <QuillEditor
      value={value}
      onChange={handleEditorChange}
      modules={quillModules}
      formats={quillFormats}
      className="w-full h-[70%] mt-10 bg-white"
    />
  );
}

"use client";

import Link from "next/link";
import { toast } from "sonner";
import { FormEvent } from "react";

async function forgotPassword(data: { email: string | null }) {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to reset password");
  }

  return response.json();
}

export default function Page() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    toast.promise(
      forgotPassword({
        email: formData.get("email") as string,
      }),
      {
        loading: "Sending reset link...",
        success: "Reset link sent to your email",
        error: (error) =>
          error instanceof Error ? error.message : "An error occurred",
      }
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-cover"
      style={{ backgroundImage: "url('/images/background1.webp')" }}
    >
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 bg-opacity-70">
        <div>
          <h2 className="text-center text-3xl font-bold">Tourism for Good</h2>
          <p className="text-center italic">
            Transforming Villages, Enriching Lives
          </p>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Forgot your password
          </h1>
          <p className="text-gray-600">
            Please enter the email address you’d like your password reset
            information sent to
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email">Enter email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-md border p-2"
                placeholder="Email address"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              className="relative block w-full rounded-md bg-gray-200 text-black p-2 text-center"
            >
              Request Reset Link
            </button>
            <Link
              href="/login"
              className="relative block w-full rounded-md bg-black text-white p-2 text-center"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

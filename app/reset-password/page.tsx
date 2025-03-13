"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least one letter and one number"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least one letter and one number"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

async function resetPassword(data: ResetPasswordFormValues) {
  const response = await fetch("/api/auth/reset-password", {
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
  const query = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: query.get("token") || "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPassword(data);
      toast.success("Password reset successfully");
      router.replace("/login");
    } catch (err) {
      setFormError("root", {
        message:
          err instanceof Error ? err.message : "Failed to reset password",
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-cover"
      style={{ backgroundImage: "url('/images/background1.jpg')" }}
    >
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 bg-opacity-70">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errors.root && (
            <div className="rounded-md bg-red-50 p-4 text-red-500">
              {errors.root.message}
            </div>
          )}
          <div>
            <label
              htmlFor="token"
              className="block text-sm font-medium text-gray-700"
            >
              Token
            </label>
            <input
              {...register("token")}
              id="token"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
            />
            {errors.token && (
              <p className="mt-1 text-sm text-red-500">
                {errors.token.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
              placeholder="Enter your new password"
              autoFocus
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
              placeholder="Confirm your new password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

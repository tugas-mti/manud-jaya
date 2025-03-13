"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one letter and one number"
    ),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const session = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.error) {
      setFormError("root", {
        message: "Invalid credentials",
      });
      return;
    }

    if (response?.ok) {
      toast.success(`Login successful`);
      router.replace("/dashboard");
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session]);

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
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <div className="rounded-md bg-red-50 p-4 text-red-500">
              {errors.root.message}
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email">Email address</label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className="relative block w-full rounded-md border p-2"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                id="password"
                type="password"
                className="relative block w-full rounded-md border p-2"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            Doesn't have an account? Sign up{" "}
            <Link className="text-black font-bold" href="/register">
              here
            </Link>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              className="relative block w-full rounded-md bg-gray-200 text-black p-2"
            >
              Sign in
            </button>
            <Link
              href="/forgot-password"
              className="relative block w-full rounded-md bg-black text-white p-2 text-center"
            >
              Forgot password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

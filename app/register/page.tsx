"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  idNumber: z.string().min(6, "ID Number must be at least 6 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone Number must be at least 10 characters")
    .regex(
      /^\+62[1-9][0-9]{8,11}$/,
      "Phone number must start with +62 followed by 9-12 digits"
    ),
  dateOfBirth: z.string().refine((date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 10; // Minimum age requirement
  }, "You must be at least 10 years old"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one letter and one number"
    ),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

async function signUp(data: RegisterFormValues) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to register");
  }

  return response.json();
}

export default function RegisterPage() {
  const session = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await signUp(data);
      toast.success("Account created successfully");

      router.replace("/login");
      router.refresh();
    } catch (err) {
      setFormError("root", {
        message: err instanceof Error ? err.message : "Failed to register",
      });
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
      style={{ backgroundImage: "url('/images/background1.jpg')" }}
    >
      <div className="w-full max-w-lg space-y-8 rounded-lg bg-white p-6 bg-opacity-70">
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
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="relative block w-full rounded-md border p-2"
                placeholder="Full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="idNumber">ID Number (KTP)</label>
              <input
                {...register("idNumber")}
                id="idNumber"
                type="text"
                className="relative block w-full rounded-md border p-2"
                placeholder="ID Number"
              />
              {errors.idNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.idNumber.message}
                </p>
              )}
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  type="text"
                  className="relative block w-full rounded-md border p-2"
                  placeholder="Phone Number"
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  {...register("dateOfBirth")}
                  id="dateOfBirth"
                  type="date"
                  className="relative block w-full rounded-md border p-2"
                  placeholder="Date of Birth"
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>

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
            Already have an account? Login{" "}
            <Link className="text-black font-bold" href="/login">
              here
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="relative block w-full rounded-md bg-gray-200 text-black p-2"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserProfile() {
  const { data: session, status } = useSession();

  return (
    <Link
      href={status === "unauthenticated" ? "/login" : "#"}
      className="min-w-[5rem] hover:bg-black hover:text-white p-2 rounded-lg text-center cursor-pointer"
    >
      {status === "unauthenticated" ? "Login" : session?.user?.name}
    </Link>
  );
}

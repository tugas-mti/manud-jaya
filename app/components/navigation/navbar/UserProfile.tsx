"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserProfile() {
  const { data: session, status } = useSession();

  return (
    <div className="min-w-[5rem] flex items-center justify-between rounded-list-item">
      {status === "unauthenticated" ? (
        <Link className="link-items" href="/login">
          Login
        </Link>
      ) : (
        <Link className="link-items" href="/dashboard">
          {session?.user?.name}
        </Link>
      )}
    </div>
  );
}

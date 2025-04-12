"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Dropdown } from "../../dropdown";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Dropdown
        menus={[
          {
            label: "Profile",
            href: "/profile",
          },
          {
            label: "Logout",
            href: "/api/auth/signout",
          },
        ]}
      >
        {session?.user?.name}
      </Dropdown>
    );
  }

  return (
    <Link href="/api/auth/signin">
      <button className="px-4 py-2 rounded">Login</button>
    </Link>
  );
}

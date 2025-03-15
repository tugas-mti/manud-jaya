import { PropsWithChildren } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import DashboardLayout, { MenuItem } from "@/components/dashboard-layout";

const menuItems: MenuItem[] = [
  {
    href: "/dashboard",
    text: "Dashboard",
  },
  {
    href: "/dashboard/users",
    text: "Users",
  },
  {
    href: "/dashboard/settings",
    text: "Settings",
  },
];

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>;
}

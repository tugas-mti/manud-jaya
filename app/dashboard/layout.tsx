import { PropsWithChildren } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import DashboardLayout, { MenuItem } from "@/app/components/dashboard-layout";
import { prisma } from "@/lib/prisma";

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
    href: "/dashboard/news",
    text: "News",
  },
  {
    href: "/dashboard/galleries",
    text: "Galleries",
  },
  {
    href: "/dashboard/bookings",
    text: "Tour Bookings",
  },
  {
    href: "/dashboard/accommodation-bookings",
    text: "Accommodation Bookings",
  },
];

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (user?.isAdmin === false) redirect("/");

  return <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>;
}

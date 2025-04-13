"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Logo from "./Logo";
import UserProfile from "./UserProfile";
import { Menu } from "lucide-react";

type NavbarProps = {
  isOpen: boolean;
  toggle: () => void;
};

const MENU_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "News/Events", path: "/news" },
  { name: "Gallery", path: "/gallery" },
  { name: "Tour", path: "/tour" },
  // { name: "Stay", path: "/accommodation" },
  { name: "Contact", path: "/contacts" },
];

const Navbar = ({ isOpen, toggle }: NavbarProps) => {
  const pathname = usePathname();
  const firstPath = `/${pathname.split("/")[1]}`;

  return (
    <>
      <div className="w-full h-20 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo isOpen={isOpen} toggle={toggle} />
            <button
              type="button"
              className="inline-flex items-center md:hidden"
              onClick={toggle}
            >
              <Menu />
            </button>
            <div className="hidden md:flex gap-x-6 items-center">
              <ul className="hidden md:flex gap-x-6 text-black">
                {MENU_ITEMS.map((item, index) => (
                  <li
                    key={item.name}
                    className={clsx("rounded-list-item", {
                      "bg-black text-white": firstPath === item.path,
                    })}
                  >
                    <Link href={item.path} className="link-items">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <UserProfile />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

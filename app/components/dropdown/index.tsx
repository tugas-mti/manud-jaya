"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { clsx as cn } from "clsx";
import { useEffect, useRef, useState } from "react";

type MenuItem = {
  label: string;
  onClick?: () => void;
  href?: string;
};

type DropdownProps = {
  children?: React.ReactNode;
  menus?: Array<MenuItem>;
};

export function Dropdown({ children, menus }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 max-w-[200px] overflow-hidden"
          >
            <span className="truncate">{children}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isDropdownOpen && "rotate-180"
              )}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md border bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {menus?.map((menu, index) =>
                menu.href ? (
                  <Link
                    key={index}
                    href={menu.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      menu.onClick?.();
                      setIsDropdownOpen(false);
                    }}
                  >
                    {menu.label}
                  </Link>
                ) : (
                  <button
                    key={index}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      menu.onClick?.();
                      setIsDropdownOpen(false);
                    }}
                  >
                    {menu.label}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

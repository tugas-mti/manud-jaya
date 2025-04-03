import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import UserProfile from "./UserProfile";

const Navbar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => {
  return (
    <>
      <div className="w-full h-20 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo isOpen={isOpen} toggle={toggle} />
            <button
              type="button"
              className="inline-flex items-center md:hidden bg-gray-800"
              onClick={toggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>
            </button>
            <div className="hidden md:flex gap-x-6 items-center">
              <ul className="hidden md:flex gap-x-6 text-black ">
                <li className="rounded-list-item">
                  <Link href="/" className="link-items">
                    Home
                  </Link>
                </li>
                <li className="rounded-list-item">
                  <Link href="/about" className="link-items">
                    <p>About</p>
                  </Link>
                </li>
                <li className="rounded-list-item">
                  <Link href="/news" className="link-items">
                    <p>News</p>
                  </Link>
                </li>
                <li className="rounded-list-item">
                  <Link href="/gallery" className="link-items">
                    <p>Gallery</p>
                  </Link>
                </li>
                <li className="rounded-list-item">
                  <Link href="/contacts" className="link-items">
                    <p>Contact</p>
                  </Link>
                </li>
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

import Link from "next/link";
import { JSX } from "react";
import SearchBar from "../../searchbar";
import UserProfile from "../navbar/UserProfile";

const Sidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}): JSX.Element => {
  return (
    <>
      <div
        className="sidebar-container fixed w-full h-full overflow-hidden justify-center bg-white pt-[120px] left-0 z-10"
        style={{
          opacity: `${isOpen ? "1" : "0"}`,
          top: ` ${isOpen ? "0" : "-100%"}`,
        }}
      >
        {/* <button className="absolute right-0 p-5" onClick={toggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            />
          </svg>
        </button> */}

        <ul className="sidebar-nav text-center leading-relaxed text-xl">
          <li>
            <Link href="/about" onClick={toggle}>
              <p>About</p>
            </Link>
          </li>
          <li>
            <Link href="/news" onClick={toggle}>
              <p>News</p>
            </Link>
          </li>
          <li>
            <Link href="/gallery" onClick={toggle}>
              <p>Gallery</p>
            </Link>
          </li>
          <li>
            <Link href="/tour" onClick={toggle}>
              <p>Tour</p>
            </Link>
          </li>
          <li>
            <Link href="/contacts" onClick={toggle}>
              <p>Contacts</p>
            </Link>
          </li>
          <li>
            <div className="flex justify-center">
              <UserProfile />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

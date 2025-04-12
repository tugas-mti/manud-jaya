"use client";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const Logo = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log(isOpen);
    if (isOpen) {
      toggle();
    }
  };

  return (
    <div
      className={clsx("flex items-center space-x-2", {
        "opacity-50": isOpen,
      })}
    >
      <Link href="/" onClick={handleClick}>
        <Image
          src="/logo.png"
          height={64}
          width={160}
          alt="Manud Jaya"
          className="relative"
        />
      </Link>
    </div>
  );
};

export default Logo;

"use client";
import Link from "next/link";
import Image from "next/image";

const Logo = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log(isOpen);
    if (isOpen) {
      toggle();
    }
  };

  return (
    <>
      <Link href="/" onClick={handleClick}>
        <Image
          src="/logo.png"
          height={64}
          width={160}
          alt="Manud Jaya"
          className="relative"
        />
      </Link>
    </>
  );
};

export default Logo;

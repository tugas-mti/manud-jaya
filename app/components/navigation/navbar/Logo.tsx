"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const Logo = ({isOpen, toggle }: {isOpen:boolean; toggle: () => void }) => {

  // change between the logo and the button when the user scrolls
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log(isOpen)
    if(isOpen){
      toggle()
    }
  };

  return (
    <>
      <Link href="/" onClick={handleClick}>
        {/* <Image
          src="/images/logo.png"
          alt="Manud Jaya"
          width="56"
          height="56"
          className="relative"
        /> */}
        <h1 className="font-bold">Manud Jaya</h1>
      </Link>
    </>
  );
};

export default Logo;
"use client";
import Link from "next/link";
import { Link as RouterLink } from "react-router-dom";


const Logo = ({isOpen, toggle }: {isOpen:boolean; toggle: () => void }) => {

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

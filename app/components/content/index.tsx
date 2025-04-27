import React from "react";
import Image from "next/image";
import Link from "next/link";

const Content = ({
  header,
  text,
  image,
  secondImage,
}: {
  header: string;
  text: string;
  image: string;
  secondImage: string;
}) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="min-h-[560px] grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="flex flex-col text-justify justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:col-span-2">
          <h1 className="text-xl font-bold text-black md:text-2xl md:leading-normal text-center">
            {header}
          </h1>
          <p className=" text-lg text-gray-800 md:text-xl md:leading-normal">
            {text}
          </p>
          <Link
            className="w-32 relative block size rounded-md bg-gray-200 font-bold text-black p-2 text-center hover:bg-gray-300 transition duration-300 ease-in-out"
            href="/about"
          >
            Read More
          </Link>
        </div>
        <div className="flex justify-center items-center md:col-span-3">
          <div className="relative w-[720px] h-[420px]">
            <div className="absolute inset-0 border-4 border-white rounded-lg shadow-lg">
              <Image
                src={image}
                alt="foto bagus"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="absolute hidden md:block w-[560px] h-[300px] -bottom-[80px] -right-[80px] border-4 border-white rounded-lg shadow-lg">
              <Image
                src={secondImage}
                alt="foto bagus"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Content = ({header,text,image} : {header:string,text:string,image:string}) =>{
    return (
        <>
        <div className="flex flex-row gap-4 ">
            <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                <h1 className="text-2xl font-bold text-black md:text-4xl md:leading-normal">
                    {header}
                </h1>
                <p className=" text-xl text-gray-800 md:text-3xl md:leading-normal">
                    {text}
                </p>
            </div>
            <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                <Image 
                src={image}
                width={1000}
                height={760}
                alt="foto bagus"
                />
            </div>
        </div>
        </>
    )
}

export default Content;
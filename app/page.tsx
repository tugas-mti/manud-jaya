import Image from "next/image";
export default function Home() {
  return (
    <>
      <div className="w-full ">
        <div>
          <Image
              src="/images/background1.jpg"
              alt="BG"
              layout="responsive"
              width="2880"
              height="1920"
              className="relative"
            />
        </div>
        
        <div className="w-full h-screen bg-green-300"></div>
      </div>
    </>
  );
}
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="absolute inset-0 flex items-center justify-center mt-[100px] sm:mt-[40vh]">
        <div className="flex w-[60%] bg-white rounded-lg shadow-lg overflow-hidden h-[2vh] sm:h-[6vh]">
            <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full px-[2vw] py-[1vh] sm:px-[3vw] sm:py-[1.5vh] text-gray-700 text-[1vh] sm:text-[1.2vw] outline-none"
            />
            <button className="px-[2vw] bg-gray-200 text-gray-600 hover:bg-gray-300 transition">
            <Search className="w-[3vw] h-[3vw]" />
            </button>
        </div>
    </div>
  );
}
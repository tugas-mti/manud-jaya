import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="absolute inset-0 flex items-center justify-center ">
        <div className="flex w-[60%] bg-white rounded-lg shadow-lg overflow-hidden h-[5%]">
            <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full px-[3vw] py-[1.5vh] text-gray-700 text-[1.2vw] outline-none"
            />
            <button className="px-[2%] bg-gray-200 text-gray-600 hover:bg-gray-300 transition">
            <Search className="w-[3vw] h-[3vw]" />
            </button>
        </div>
    </div>
  );
}
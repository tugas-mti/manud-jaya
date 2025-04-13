import Image from "next/image";

const Experience = ()=>{
    return(
        <>
        <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6">
            {/* Card 1 */}
            <div className="min-w-[300px] bg-white shadow-md rounded-lg p-4">
                <Image 
                src="/images/tracking.jpeg" 
                alt="Hills Tracking" 
                width={300} 
                height={180} 
                className="rounded-md object-cover"
                />
                <h2 className="mt-4 font-semibold">Hills Tracking – Trekking sawah dan bukit</h2>
                <p className="text-sm text-justify mt-2">
                Hill and rice field trekking offers a serene nature escape, where each step takes you through lush green paddies and scenic hills, allowing you to breathe in the fresh air and soak in the stunning natural landscapes.
                </p>
                <button className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
                Read More
                </button>
            </div>

            {/* Card 2 */}
            <div className="min-w-[300px] bg-white shadow-md rounded-lg p-4">
                <Image 
                src="/images/danau.jpeg" 
                alt="Lake" 
                width={300} 
                height={180} 
                className="rounded-md object-cover"
                />
                <h2 className="mt-4 font-semibold">Lake - Danau wisata</h2>
                <p className="text-sm text-justify mt-2">
                lake view offers a breathtaking experience, where every step reveals shimmering waters framed by lush landscapes, creating a perfect blend of adventure and tranquility amidst nature's beauty.
                </p>
                <button className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
                Read More
                </button>
            </div>

            {/* Card 3 */}
            <div className="min-w-[300px] bg-white shadow-md rounded-lg p-4">
                <Image 
                src="/images/pool.jpeg" 
                alt="Pool" 
                width={300} 
                height={180} 
                className="rounded-md object-cover"
                />
                <h2 className="mt-4 font-semibold">Pool – Kolam Renang</h2>
                <p className="text-sm text-justify mt-2">
                Our swimming pool provides a refreshing retreat surrounded by natural beauty, where guests can unwind, enjoy the cool water, and relax with stunning views that enhance the serene atmosphere.
                </p>
                <button className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
                Read More
                </button>
            </div>
            </div>
        </div>
        </>
    )
}
export default Experience;
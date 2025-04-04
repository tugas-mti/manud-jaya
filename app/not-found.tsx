"use client";
import Image from "next/image";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div>
        <Image src="/error.png" alt="Error" width={400} height={400} />
      </div>
      <p className="mt-4 text-lg text-gray-700">
        Oops! Something went wrong on our end. Please try again later.
      </p>
      <div className="mt-4 flex items-center space-x-2">
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
        <button
          className="mt-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

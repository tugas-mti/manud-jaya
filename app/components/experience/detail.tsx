// components/DetailModal.tsx
import { useRef, useEffect } from 'react';
import Image from 'next/image';

type ItemData = {
  title: string;
  image:string;
  description: string;
};

type DetailModalProps = {
  data: ItemData;
  onClose: () => void;
};

export default function DetailModal({ data, onClose }: DetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-xl relative p-6"
      >
        {/* "X" close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className='flex flex-col items-center gap-6'>
            <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
            <Image 
                src= {data.image}
                alt="Image" 
                width={300} 
                height={180} 
                className="rounded-md object-cover"
                />
            <p>{data.description.split('\n').map((line, index) => (<span key={index}>{line}<br/></span>))}</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaFigma  } from 'react-icons/fa';
import Image from "next/image";

const logos = [
  { src: '/logos/qris.png', alt: 'QRIS' },
  { src: '/logos/atm-bersama.png', alt: 'ATM Bersama' },
  { src: '/logos/briva.png', alt: 'BRIVA' },
  { src: '/logos/visa.png', alt: 'VISA' },
  { src: '/logos/mastercard.png', alt: 'MasterCard' },
  { src: '/logos/prima.png', alt: 'PRIMA' },
  { src: '/logos/bca.png', alt: 'BCA Virtual Account' },
];

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-white text-black py-6 relative">
      <div className="w-full pl-4 md:pl-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo + Social Icons */}
        <div className="space-y-4">
          <div>
            <a href="https://figma.com" target="_blank" rel="noopener noreferrer">
              <FaFigma size={32} className="text-black" />
            </a>
          </div>
          <div className="flex space-x-4 text-2xl">
            <a href="https://twitter.com" target="_blank" className="hover:text-gray-400">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 1227"
              fill="currentColor"
              width={24}
              height={24}
            >
              <path d="M 1200 0 L 753 548 L 1200 1227 H 941 L 600 757 L 202 1227 H 0 L 460 641 L 0 0 H 263 L 600 450 L 963 0 Z" />
            </svg>
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" className="hover:text-gray-400">
              <FaYoutube size={24}/>
            </a>
          </div>
          <div>
            <Image src="/images/logofix-cropped.png" alt="Wonderful Manud Jaya" width={250} height={80} className="self-start"/>
          </div>
        </div>

         {/* Links */}
         <div>
          <h3 className="font-semibold mb-2">Link</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/about" className="hover:text-gray-400">About</Link></li>
            <li><Link href="/service" className="hover:text-gray-400">Our Services</Link></li>
            <li><Link href="/event" className="hover:text-gray-400">Event</Link></li>
            <li><Link href="/gallery" className="hover:text-gray-400">Gallery</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">
            Kantor Pengelola Badan Daya<br />
            Tarik Wisata Kayangan, Semesta Raya<br /><br />
            +628111223344<br />
            +628123456791<br />
            wonderfulmanudjaya@gmail.com
          </p>
        </div>

        {/* Payment Logos */}
        <div>
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              'qris.png',
              'ATM_BERSAMA_LOGO.png',
              'BRIVA_LOGO.png',
              'VISA_LOGO.png',
              'MASTER_CARD_LOGO.png',
              'ATM_PRIMA_LOGO.png',
              'BCA_VA_LOGO.png',
            ].map((logo, i) => (
              <Image
                key={i}
                src={`/logos/${logo}`}
                alt={logo.split('.')[0]}
                width={60}
                height={40}
                className="object-contain"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
    </>
  );
};

export default Footer;

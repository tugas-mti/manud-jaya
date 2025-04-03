import { Mail, MapPinHouse, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex space-x-4 items-center">
              <a
                href="https://www.x.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/socials/x.png"
                  alt="X"
                  width={24}
                  height={24}
                  quality={100}
                />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/socials/instagram.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  quality={100}
                />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/socials/youtube.png"
                  alt="YouTube"
                  width={24}
                  height={24}
                  quality={100}
                />
              </a>
            </div>
            <div>
              <Image
                src="/logo.png"
                alt="Logo"
                width={256}
                height={160}
                className="rounded shadow hover:shadow-lg transition duration-300"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Our Service
                </Link>
              </li>
              <li>
                <Link
                  href="/event"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Event
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <MapPinHouse className="inline-block mr-2" />
                Kantor Pengelola Badan Daya Tarik Wisata Kayangan, Semesta Raya
              </li>
              <li>
                <Phone className="inline-block mr-2" />
                +628111223344
              </li>
              <li>
                <Phone className="inline-block mr-2" />
                +628123456791
              </li>
              <li>
                <Mail className="inline-block mr-2" />
                wondefulmanudjaya@gmail.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Payment Methods</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                "qris",
                "atm-bersama",
                "briva",
                "visa",
                "prima",
                "bca-va",
                "mastercard",
              ].map((method) => (
                <div
                  key={method}
                  className="bg-white p-2 rounded shadow flex items-center justify-center h-[56px] hover:shadow-lg transition duration-300"
                >
                  <Image
                    src={`/payments/${method}.png`}
                    alt={method}
                    width={60}
                    height={40}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

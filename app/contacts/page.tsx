import { Mail, MapPinHouse, Phone } from "lucide-react";
import React from "react";

export default function Contatcs() {
  return (
    <div className="container mx-auto px-4 py-8">
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
    </div>
  );
}

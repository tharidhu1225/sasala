import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-10">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-8">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-green-600" />
              <span className="text-sm md:text-base">+94 760340851</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-green-600" />
              <span className="text-sm md:text-base">jayasooriyatharidhu@gmail.com</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
              <span className="text-sm md:text-base">No. 73, Weuda, Mawathagama, Sri Lanka</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-800">Follow us on:</p>
            <div className="flex justify-center gap-6 text-2xl text-gray-500">
              <a href="https://www.youtube.com/@sasala-lk" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                <FaYoutube />
              </a>
              <a href="http://wa.me/+94760340851" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                <FaWhatsapp />
              </a>
            </div>

            {/* Optional WhatsApp Button */}
            <a
              href="http://wa.me/+94760340851"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

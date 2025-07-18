import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-10 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo & Info */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">TN International (PVT) LTD</h2>
                        <p className="text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} All rights reserved.<br />
                            Connecting Sri Lanka with smart classifieds.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li><a href="/" className="hover:text-white transition">Home</a></li>
                            <li><a href="/ads" className="hover:text-white transition">Browse Ads</a></li>
                            <li><a href="/post" className="hover:text-white transition">Post an Ad</a></li>
                            <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
                            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.youtube.com/@sasala-lk" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-xl"><FaYoutube /></a>
                            <a href="http://wa.me/+94760340851" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-xl"><FaWhatsapp /></a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-xs">
                    Designed with ❤️ by TN International (PVT) LTD.
                </div>
            </div>
        </footer>
    );
}

import React from 'react';

export default function AboutUsSinhala() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 sm:px-10 mt-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">අපි ගැන - Sasala.lk</h1>

        {/* Intro Section */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-10">
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong>Sasala.lk</strong> යනු <strong>TN International (PVT) LTD</strong> විසින් ක්‍රියාත්මක කරන නවීන හා භාවිතයට පහසු Online වෙළඳපොළක් වේ.
            ශ්‍රී ලංකාවේ සිටින ජනතාවට <span className="text-green-600 font-medium">ඉතා පහසුවෙන් හා ආරක්ෂිතව භාණ්ඩ මිලදී ගැනීම, විකිණීම සහ සෙවීම</span> සඳහා මෙම වේදිකාව සකස් කර ඇත.
            කෘෂිකාර්මික නිෂ්පාදන සියල්ලටම Sasala.lk තුළින් මිනිසුන් එකිනෙකා සමඟ සම්බන්ධ විය හැක.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-green-100 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">අපගේ මෙහෙවර</h2>
            <p className="text-gray-700">
              ශ්‍රී ලංකාවේ ගොවීන්, යෝජකයන් සහ සාමාන්‍ය පරිශීලකයන් සඳහා සරල හා විශ්වාසදායක ඩිජිටල් වෙළඳපොළක් සාදන බවයි අපගේ මෙහෙවර.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">අපගේ දැක්ම</h2>
            <p className="text-gray-700">
              ශ්‍රී ලංකාවේ විශ්වාසදායකම හා පහසුවෙන් ප්‍රවේශ විය හැකි Online දැන්වීම් වේදිකාව බවට පත්වීමයි – සමාජයන් සම්බන්ධ කරමින්, විශ්වාසය ගොඩනගමින්, ව්‍යාපෘතිවල වර්ධනයට සහාය වීමයි අපේ අරමුණ.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">අපි ඔබට ලබාදෙන්නේ</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>නොමිලේ හා පහසු දැන්වීම් පළ කිරීම</li>
            <li>කෘෂිකාර්මික නිෂ්පාදන</li>
            <li>ජංගම හා පරිගණක සඳහා සම්පූර්ණයෙන් ප්‍රතිචාරශීලී (responsive) වීම</li>
            <li>අන්තර්ගත පරික්ෂා කිරීම සහ ආරක්ෂාව</li>
            <li>විකුණුම්කරුවන් සඳහා සේවාදායක සහාය</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

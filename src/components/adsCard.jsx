import React from "react";

export default function ADcard({ title, price, location, category, image, userName, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow hover:shadow-lg transition rounded-lg overflow-hidden cursor-pointer max-w-xs mx-auto"
    >
      <div className="w-full h-40 overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h2 className="text-md font-semibold text-green-800 truncate">{title}</h2>
        <p className="text-gray-700 mt-1 font-semibold">Rs. {price}</p>
        <p className="text-sm text-gray-500 mt-1">By: {userName || "Unknown"}</p>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{location}</span>
          <span className="text-green-600 font-medium">{category}</span>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AdDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ad/${id}`);
        setAd(res.data);
      } catch (err) {
        console.error("Failed to fetch ad details", err);
        alert("Ad not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!ad) {
    return <p className="text-center text-red-500 py-10">Ad details not available.</p>;
  }

  const images = Array.isArray(ad.images) && ad.images.length > 0
    ? ad.images
    : ["https://via.placeholder.com/600x400?text=No+Image"];

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <main className="max-w-4xl mx-auto p-6 pt-20">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
      >
        ← Back to listings
      </button>

      <div className="bg-white rounded shadow p-6">
        {/* Updated Image Slider */}
        <div className="relative w-full max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-hidden rounded mb-4">
          <img
            src={images[currentImageIndex]}
            alt={`${ad.title} - image ${currentImageIndex + 1}`}
            className="w-full h-auto object-contain max-h-[400px] sm:max-h-[500px] md:max-h-[600px]"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-green-700 bg-opacity-70 text-white p-2 rounded-full hover:bg-green-800"
                aria-label="Previous Image"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-700 bg-opacity-70 text-white p-2 rounded-full hover:bg-green-800"
                aria-label="Next Image"
              >
                ›
              </button>
            </>
          )}
          <div className="flex justify-center space-x-2 mt-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === currentImageIndex ? "bg-green-700" : "bg-gray-300"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-900 mb-4">{ad.title}</h1>
        <p className="text-xl text-gray-700 mb-2">Price: Rs. {ad.price}</p>
        <p className="text-gray-600 mb-4">{ad.description}</p>

        <div className="flex flex-col sm:flex-row justify-between text-gray-700 mb-6">
          <div>
            <p>
              <span className="font-semibold">Category:</span> {ad.category}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {ad.location}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Posted by:</span> {ad.user?.name || "Unknown"}
            </p>
          </div>
        </div>

        <a
          href={`tel:${ad.user?.phone || ""}`}
          className="inline-block bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition"
          onClick={(e) => {
            if (!ad.user?.phone) {
              e.preventDefault();
              alert("Phone number not available");
            }
          }}
        >
          Call Seller: {ad.user?.phone || "N/A"}
        </a>
      </div>
    </main>
  );
}

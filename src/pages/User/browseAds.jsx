import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaMapMarkerAlt, FaFilter, FaSearch, FaBoxOpen } from "react-icons/fa";
import ADcard from "../../components/adsCard";

const categories = [
  { label: "Categories", value: "" },
  { label: "All", value: "All" },
  { label: "Vegetables", value: "Vegetables" },
  { label: "Fruits", value: "Fruits" },
  { label: "Dairy Products", value: "Dairy Products" },
  { label: "Bakery & Breads", value: "Bakery & Breads" },
  { label: "Grains & Cereals", value: "Grains & Cereals" },
];

const locations = [
  { label: "Locations", value: "" },
  { label: "All", value: "All" },
  { label: "Ampara", value: "Ampara" },
  { label: "Anuradhapura", value: "Anuradhapura" },
  { label: "Badulla", value: "Badulla" },
  { label: "Batticaloa", value: "Batticaloa" },
  { label: "Colombo", value: "Colombo" },
  { label: "Galle", value: "Galle" },
  { label: "Gampaha", value: "Gampaha" },
  { label: "Hambantota", value: "Hambantota" },
  { label: "Jaffna", value: "Jaffna" },
  { label: "Kalutara", value: "Kalutara" },
  { label: "Kandy", value: "Kandy" },
  { label: "Kegalle", value: "Kegalle" },
  { label: "Kilinochchi", value: "Kilinochchi" },
  { label: "Kurunegala", value: "Kurunegala" },
  { label: "Mannar", value: "Mannar" },
  { label: "Matale", value: "Matale" },
  { label: "Matara", value: "Matara" },
  { label: "Moneragala", value: "Moneragala" },
  { label: "Mullaitivu", value: "Mullaitivu" },
  { label: "Nuwara Eliya", value: "Nuwara Eliya" },
  { label: "Polonnaruwa", value: "Polonnaruwa" },
  { label: "Puttalam", value: "Puttalam" },
  { label: "Ratnapura", value: "Ratnapura" },
  { label: "Trincomalee", value: "Trincomalee" },
  { label: "Vavuniya", value: "Vavuniya" },
];

export default function BrowseAds() {
  const [ads, setAds] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch ads
  const fetchAds = async () => {
    setLoading(true);
    try {
      const params = { approved: "true" };
      if (category && category !== "All") params.category = category;
      if (location && location !== "All") params.location = location;
      if (debouncedSearch.trim()) params.search = debouncedSearch.trim();

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ad`, { params });
      setAds(res.data);
    } catch (err) {
      console.error("Failed to fetch ads", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [category, location, debouncedSearch]);

  return (
    <main className="pt-20 max-w-7xl mx-auto px-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        {/* Category */}
        <div className="relative">
          <FaFilter className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-green-700 text-xl" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none w-full p-3 border border-green-700 rounded-lg text-green-900 font-semibold pl-10 hover:border-green-900 transition"
          >
            {categories.map(({ label, value }) => (
              <option key={value || label} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="relative">
          <FaMapMarkerAlt className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-green-700 text-xl" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="appearance-none w-full p-3 border border-green-700 rounded-lg text-green-900 font-semibold pl-10 hover:border-green-900 transition"
          >
            {locations.map(({ label, value }) => (
              <option key={value || label} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative md:col-span-2">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 transform -translate-y-1/2 text-green-700 text-xl" />
          <input
            type="text"
            placeholder="Search ads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border border-green-700 rounded-lg text-green-900 font-semibold pl-12 hover:border-green-900 transition"
          />
        </div>
      </div>

      {/* Ads */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : ads.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ad) => {
            const imageUrl =
              Array.isArray(ad.images) && ad.images.length > 0
                ? ad.images[0]
                : "https://via.placeholder.com/400x250?text=No+Image";

            return (
              <ADcard
                key={ad._id}
                id={ad._id}
                title={ad.title}
                price={ad.price}
                location={ad.location}
                category={ad.category}
                image={imageUrl}
                userName={ad.user?.name}
                onClick={() => navigate(`/ads/${ad._id}`)}
                className="hover:shadow-xl transition-shadow duration-300 rounded-lg cursor-pointer"
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-500 py-20 space-y-3">
          <FaBoxOpen className="text-6xl" />
          <p className="text-xl">No ads found matching your filters.</p>
          <p className="max-w-md text-center">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </main>
  );
}
// 
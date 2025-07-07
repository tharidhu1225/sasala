import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ADcard from "../../components/adsCard";

const categories = ["All", "Vehicles", "Electronics", "Real Estate"];
const locations = ["All", "Colombo", "Kandy", "Galle", "Jaffna"];

export default function AdminAllAds() {
  const [ads, setAds] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== "All") params.category = category;
      if (location !== "All") params.location = location;
      if (debouncedSearch.trim()) params.search = debouncedSearch.trim();

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ad`, {
        params,
      });

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
    <main className="pt-0 max-w-7xl mx-auto px-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex-1 min-w-[150px]">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded text-green-900 font-medium"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border rounded text-green-900 font-medium"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <input
            type="text"
            placeholder="Search ads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded text-green-900 font-medium"
          />
        </div>
      </div>

      {/* Ads List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : ads.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                onClick={() => navigate(`/admin/${ad._id}`)}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg py-10">
          No ads found matching your filters.
        </p>
      )}
    </main>
  );
}

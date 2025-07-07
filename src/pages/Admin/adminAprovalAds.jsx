import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Load backend URL from .env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminAdApprovalPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(null);
  const [error, setError] = useState("");

  // 🔐 Get token from localStorage
  const token = localStorage.getItem("token");

  // 🔄 Fetch all unapproved ads
  const fetchUnapprovedAds = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/admin/ads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched Ads:", res.data);
      setAds(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load ads. Unauthorized access.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle approve click
  const handleApprove = async (id) => {
    try {
      setApproving(id);
      await axios.patch(
        `${BACKEND_URL}/api/admin/ads/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAds((prev) => prev.filter((ad) => ad._id !== id));
    } catch (err) {
      console.error("Approve error:", err);
      alert("Failed to approve ad.");
    } finally {
      setApproving(null);
    }
  };

  // 🚀 On mount, fetch data
  useEffect(() => {
    fetchUnapprovedAds();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛠️ Admin - Approve Ads</h1>

      {ads.length === 0 ? (
        <p className="text-gray-500">No pending ads to approve.</p>
      ) : (
        <div className="grid gap-4">
          {ads.map((ad) => (
            <div key={ad._id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-xl font-semibold">{ad.title || "Untitled"}</h2>
              <p className="text-sm text-gray-600">
                {ad.description || "No description provided."}
              </p>
              <p className="text-sm text-gray-500 mt-1">Category: {ad.category}</p>
              <p className="text-sm text-gray-500">Location: {ad.location}</p>
              <p className="text-sm text-gray-500">
                User: {ad.user?.name || "Unknown"} ({ad.user?.email || "N/A"})
              </p>

              <div className="flex gap-2 mt-4">
                {ad.images?.slice(0, 2).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Ad image ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>

              <button
                onClick={() => handleApprove(ad._id)}
                disabled={approving === ad._id}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {approving === ad._id ? "Approving..." : "Approve"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

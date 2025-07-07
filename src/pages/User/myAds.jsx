import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function MyAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to view your ads.");
      setLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/ad/my`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAds(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load your ads.");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this ad?");
    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/ad/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Ad deleted successfully.");
      setAds((prev) => prev.filter((ad) => ad._id !== id));
    } catch (err) {
      toast.error("Failed to delete ad.");
    }
  };

  if (loading) return <div className="p-4">Loading your ads...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-green-800">My Ads</h1>

      {ads.length === 0 ? (
        <p className="text-gray-600">You have no ads posted yet.</p>
      ) : (
        <ul className="space-y-6">
          {ads.map((ad) => {
            const isApproved = ad.isApproved ?? ad.approved;
            const imageUrl = ad.image || (ad.images && ad.images[0]);

            return (
              <li
                key={ad._id}
                className={`p-4 rounded-lg border shadow-sm transition hover:shadow-md ${
                  isApproved
                    ? "bg-white"
                    : "bg-yellow-50 text-gray-600 border-yellow-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image Preview */}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={ad.title}
                      className="w-full sm:w-40 h-28 object-cover rounded border border-green-200"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full sm:w-40 h-28 bg-gray-200 flex items-center justify-center rounded text-gray-500 text-sm">
                      No Image
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-green-900">{ad.title}</h2>
                    <p className="mt-1 text-gray-700">{ad.description}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      <strong>Posted:</strong>{" "}
                      {new Date(ad.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-2">
                      <strong>Status:</strong>{" "}
                      {isApproved ? (
                        <span className="text-green-600 font-medium">🟢 Active</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">
                          🕒 Pending Approval by our agent (few minutes)
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Buttons */}
                  {isApproved && (
                    <div className="flex flex-col gap-2 sm:items-end">
                      <button
                        onClick={() => navigate(`/edit-ad/${ad._id}`)}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        ❌ Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

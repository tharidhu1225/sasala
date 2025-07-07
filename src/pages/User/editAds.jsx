import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const categories = [
  { label: "Categories", value: "" },
  { label: "Vegetables", value: "Vegetables" },
  { label: "Fruits", value: "Fruits" },
  { label: "Dairy Products", value: "Dairy Products" },
  { label: "Bakery & Breads", value: "Bakery & Breads" },
  { label: "Grains & Cereals", value: "Grains & Cereals" },
];

const locations = [
  { label: "Locations", value: "" },
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

export default function EditAdForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    price: "",
    images: [],
    existingImages: [],
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // For disabling update button during submit

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/ad/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const ad = res.data;
        setFormData({
          title: ad.title || "",
          description: ad.description || "",
          category: ad.category || "",
          location: ad.location || "",
          price: ad.price || "",
          images: [],
          existingImages: ad.images || [],
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load ad data.");
        setLoading(false);
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.existingImages.length + formData.images.length > 4) {
      toast.error("Maximum 4 images allowed.");
      return;
    }
    setFormData((f) => ({
      ...f,
      images: [...f.images, ...files],
    }));
  };

  const handleRemoveExistingImage = (url) => {
    setFormData((f) => ({
      ...f,
      existingImages: f.existingImages.filter((img) => img !== url),
    }));
  };

  const handleRemoveNewImage = (index) => {
    setFormData((f) => ({
      ...f,
      images: f.images.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.title.trim()) return toast.error("Title is required.");
      if (!formData.description.trim())
        return toast.error("Description is required.");
    }
    if (step === 2) {
      if (!formData.category) return toast.error("Select a category.");
      if (!formData.location) return toast.error("Select a location.");
      if (!formData.price || isNaN(formData.price))
        return toast.error("Enter valid price.");
    }
    if (step < 3) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length + formData.existingImages.length === 0)
      return toast.error("Please upload at least one image.");

    setUpdating(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Login first.");
        navigate("/login");
        return;
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);
      data.append("price", formData.price);
      formData.images.forEach((file) => data.append("images", file));
      data.append("existingImages", JSON.stringify(formData.existingImages));

      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/ad/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Ad updated!");
      navigate("/my-ads");
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading ad data...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold mb-6 text-green-800">Edit Ad</h2>

      {/* Step progress bar */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`flex-1 h-1 mx-1 rounded ${
              step === num
                ? "bg-green-600"
                : num < step
                ? "bg-green-300"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
        </>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <>
          <label className="block mb-2 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          >
            {locations.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">Price (LKR)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            min="0"
            step="any"
            required
          />
        </>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <>
          <label className="block mb-2 font-semibold">Existing Images</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {formData.existingImages.length === 0 ? (
              <p className="text-gray-500">No existing images.</p>
            ) : (
              formData.existingImages.map((url) => (
                <div
                  key={url}
                  className="relative w-24 h-24 border rounded overflow-hidden"
                >
                  <img
                    src={url}
                    alt="Existing"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(url)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-bl px-1"
                    disabled={updating}
                  >
                    &times;
                  </button>
                </div>
              ))
            )}
          </div>

          <label className="block mb-2 font-semibold">Upload New Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="mb-4"
            disabled={updating}
          />
          <div className="flex flex-wrap gap-4 mb-4">
            {formData.images.length === 0 && (
              <p className="text-gray-500">No new images selected.</p>
            )}
            {formData.images.map((file, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border rounded overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="New"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-bl px-1"
                  disabled={updating}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Step navigation */}
      <div className="flex justify-between">
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={updating}
          >
            Previous
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={updating}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className={`px-4 py-2 rounded text-white ${
              updating
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800"
            }`}
            onClick={handleSubmit}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Ad"}
          </button>
        )}
      </div>
    </form>
  );
}

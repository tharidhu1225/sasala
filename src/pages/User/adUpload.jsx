import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

export default function AdUploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    images: [],
  });

  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      toast.error("You can upload up to 4 images only.");
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      return;
    }

    setFormData((prev) => ({ ...prev, images: files }));

    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    const previewList = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previewList);
  };

  const handleNext = () => {
    if (step === 1 && (!formData.category || !formData.location)) {
      toast.error("Please select both category and location");
      return;
    }
    if (step === 2 && (!formData.title.trim() || !formData.description.trim())) {
      toast.error("Please enter title and description");
      return;
    }
    if (step === 3 && (!formData.price || isNaN(formData.price))) {
      toast.error("Please enter a valid price");
      return;
    }
    if (step === 4 && (formData.images.length === 0 || formData.images.length > 4)) {
      toast.error("Please upload between 1 and 4 images");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0 || formData.images.length > 4) {
      toast.error("Please upload between 1 and 4 images before submitting.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to post an ad.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((img) => data.append("images", img));
      } else {
        data.append(key, value);
      }
    });

    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ad`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Ad uploaded successfully! 🚀");
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        location: "",
        images: [],
      });
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewUrls([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      setStep(1);

      setTimeout(() => navigate("/my-ads"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload ad. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // To disable form submit on Enter key press inside input fields
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-green-800 text-center tracking-wide">
        Post a New Ad
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" onKeyDown={handleKeyDown}>

        {/* Step 1: Category & Location */}
        {step === 1 && (
          <div className="space-y-6">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-700 transition"
            >
              {categories.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-700 transition"
            >
              {locations.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step 2: Title & Description */}
        {step === 2 && (
          <div className="space-y-6">
            <input
              type="text"
              name="title"
              placeholder="Ad Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-700 transition"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-700 transition resize-none"
            />
          </div>
        )}

        {/* Step 3: Price */}
        {step === 3 && (
          <div>
            <input
              type="number"
              name="price"
              placeholder="Price (LKR)"
              value={formData.price}
              onChange={handleChange}
              required
              min={0}
              step="0.01"
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-700 transition"
            />
          </div>
        )}

        {/* Step 4: Images */}
        {step === 4 && (
          <div>
            <input
              type="file"
              name="images"
              ref={fileInputRef}
              onChange={handleImageChange}
              multiple
              accept="image/*"
              required
              className="w-full p-3 border border-gray-300 rounded-md cursor-pointer text-gray-700 transition"
            />

            {previewUrls.length > 0 && (
              <div className="flex gap-4 flex-wrap mt-6 justify-center">
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`preview-${index}`}
                    className="h-28 w-28 object-cover rounded-md border border-green-300 shadow-md"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {step === 5 && (
          <div className="text-center text-green-900 font-semibold space-y-6">
            <h3 className="text-2xl font-bold mb-4">Review Your Ad</h3>
            <div className="text-left max-w-xl mx-auto space-y-3 text-gray-700">
              <p>
                <strong>Category:</strong> {formData.category}
              </p>
              <p>
                <strong>Location:</strong> {formData.location}
              </p>
              <p>
                <strong>Title:</strong> {formData.title}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              <p>
                <strong>Price:</strong> LKR {formData.price}
              </p>
            </div>

            {previewUrls.length > 0 && (
              <div className="flex justify-center gap-5 flex-wrap mt-4">
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`preview-${index}`}
                    className="h-28 w-28 object-cover rounded-md border border-green-300 shadow-md"
                  />
                ))}
              </div>
            )}

            <p className="mt-6 text-gray-600">
              Please review all the information. Click Submit when ready.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between items-center">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
              className="px-6 py-3 rounded-md border border-green-700 text-green-700 hover:bg-green-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className="px-8 py-3 rounded-md bg-green-700 text-white hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-md bg-green-700 text-white hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

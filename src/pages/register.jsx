import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiUser, FiLock, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { FaIdCard } from "react-icons/fa";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        formData
      );
      toast.success(res.data.message || "Registration successful!");
      setFormData({ name: "", email: "", password: "", phone: "" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 via-green-50 to-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-xl p-10 max-w-md w-full border border-green-300"
        aria-label="Register form"
      >
        <h2 className="text-3xl font-extrabold text-green-900 mb-8 text-center tracking-wide">
          Register to <span className="text-green-700">sasala.lk</span>
        </h2>

        {/* Name */}
        <div className="mb-5 relative">
          <FiUser
            className="absolute left-4 top-3.5 text-green-500"
            size={20}
            aria-hidden="true"
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="pl-12 pr-4 py-3 w-full rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-600 text-green-900 font-medium shadow-sm"
            aria-label="Full Name"
          />
        </div>

        {/* Email */}
        <div className="mb-5 relative">
          <FaIdCard
            className="absolute left-4 top-3.5 text-green-500"
            size={20}
            aria-hidden="true"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Your NIC Number"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="pl-12 pr-4 py-3 w-full rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-600 text-green-900 font-medium shadow-sm"
            aria-label="Email Address"
          />
        </div>

        {/* Password */}
        <div className="mb-5 relative">
          <FiLock
            className="absolute left-4 top-3.5 text-green-500"
            size={20}
            aria-hidden="true"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            className="pl-12 pr-12 py-3 w-full rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-600 text-green-900 font-medium shadow-sm"
            aria-label="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-3 text-green-600 hover:text-green-800 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </button>
        </div>

        {/* Phone */}
        <div className="mb-8 relative">
          <FiPhone
            className="absolute left-4 top-3.5 text-green-500"
            size={20}
            aria-hidden="true"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
            className="pl-12 pr-4 py-3 w-full rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-600 text-green-900 font-medium shadow-sm"
            aria-label="Phone Number"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-lg text-white font-bold text-lg transition duration-300 shadow-md ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-800"
          }`}
          aria-busy={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-6 w-6 mx-auto text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Register"
          )}
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-green-700 font-semibold">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-900 hover:underline font-bold"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

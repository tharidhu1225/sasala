import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to fetch user profile from backend using token
  const fetchUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();

    // Listen to storage event to detect token changes (e.g., logout/login in another tab)
    const handleStorageChange = () => {
      fetchUser();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMobileMenuOpen(false);

    // Trigger storage event manually so other tabs/components update too
    window.dispatchEvent(new Event("storage"));

    navigate("/");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handlePostAdClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
      setMobileMenuOpen(false);
    }
  };

  const activeClass = ({ isActive }) =>
    isActive ? "underline underline-offset-4 font-semibold" : "";

  return (
    <header className="bg-green-700 text-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <NavLink to="/" className="text-2xl font-bold">
          sasala.lk
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={`hover:underline ${activeClass}`}>
            Home
          </NavLink>
          <NavLink to="/ads" className={`hover:underline ${activeClass}`}>
            Browse Ads
          </NavLink>
          <NavLink
            to="/post"
            onClick={handlePostAdClick}
            className={`hover:underline ${activeClass}`}
          >
            Post Ad
          </NavLink>

          {user ? (
            <div className="relative group">
              <img
                src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"
                alt="User"
                className="w-9 h-9 rounded-full cursor-pointer border-2 border-white"
              />
              <div className="absolute right-0 mt-2 w-48 bg-white text-green-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="px-4 py-2 font-semibold border-b">
                  {user.name}
                  <div className="text-xs text-gray-600">{user.phone}</div>
                </div>
                <NavLink
                  to={`/my-ads`}
                  className="block px-4 py-2 hover:bg-green-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Ads
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-green-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <NavLink to="/login" className={`hover:underline ${activeClass}`}>
                Login
              </NavLink>
              <span>/</span>
              <NavLink
                to="/register"
                className={`hover:underline ${activeClass}`}
              >
                Register
              </NavLink>
            </div>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      ></div>

      {/* Slide Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-green-800 z-50 shadow-lg transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-6 space-y-6">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block text-white text-lg font-medium ${
                isActive ? "underline underline-offset-4 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/ads"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block text-white text-lg font-medium ${
                isActive ? "underline underline-offset-4 font-semibold" : ""
              }`
            }
          >
            Browse Ads
          </NavLink>
          <NavLink
            to="/post"
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                navigate("/login");
              }
              closeMobileMenu();
            }}
            className={({ isActive }) =>
              `block text-white text-lg font-medium ${
                isActive ? "underline underline-offset-4 font-semibold" : ""
              }`
            }
          >
            Post Ad
          </NavLink>

          {user ? (
            <>
              <div className="text-white font-semibold">{user.name}</div>
              <div className="text-white text-sm mb-4">{user.phone}</div>
              <NavLink
                to={`/my-ads`}
                onClick={closeMobileMenu}
                className="block text-white text-lg font-medium hover:underline"
              >
                My Ads
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full text-left text-white hover:underline mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={closeMobileMenu}
                className="block text-white text-lg font-medium hover:underline"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={closeMobileMenu}
                className="block text-white text-lg font-medium hover:underline"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

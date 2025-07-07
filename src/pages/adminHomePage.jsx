import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { MdOutlinePendingActions } from "react-icons/md";
import {
  BsGraphUp,
  BsPeopleFill,
  BsList,
  BsX,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import DashboardPage from "./Admin/dashbord";
import AdminUsers from "./Admin/adminUsers";
import AdminAllAds from "./Admin/adminAllAds";
import AdminAdApprovalPage from "./Admin/adminAprovalAds";



export default function AdminHomePage() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.role !== "admin") { // ✅ FIXED: role instead of type
          toast.error("Unauthorized access");
          navigate("/");
        } else {
          setUser(res.data);
        }
      })
      .catch(() => {
        toast.error("Failed to fetch user data");
        navigate("/login");
      })
      .finally(() => {
        setLoading(false); // ✅ stop loading
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-black relative">
      {/* Sidebar */}
      <div
        className={`bg-black text-white fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out 
          md:relative md:translate-x-0 md:w-1/5 w-3/4 max-w-xs
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          h-full md:min-h-screen`}
      >
        <div className="flex justify-between items-center px-4 py-3 md:hidden">
          <h2 className="text-lg font-semibold">Admin Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-white">
            <BsX size={24} />
          </button>
        </div>

        <div className="flex flex-col items-start space-y-6 px-6 mt-6 md:mt-12">
          <Link
            to="/admin"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <BsGraphUp /> Dashboard
          </Link>
          
          <Link
            to="/admin/customers"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <BsPeopleFill /> Customers
          </Link>
          <Link
            to="/admin/all-ads"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <BiSolidSpreadsheet /> All ADS
          </Link>
          <Link
            to="/admin/aprove-ads"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <MdOutlinePendingActions /> Pending ADS
          </Link>
          
        </div>
      </div>

      {/* Hamburger toggle for mobile */}
      {!sidebarOpen && (
        <button
          className="absolute top-4 left-4 md:hidden text-black z-50"
          onClick={() => setSidebarOpen(true)}
        >
          <BsList size={28} />
        </button>
      )}

      {/* Main Content */}
      <div className="w-full md:w-4/5 p-4 mt-12 md:mt-0">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-black"></div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/customers" element={<AdminUsers />} />
            <Route path="/all-ads" element={<AdminAllAds />} />
            <Route path="/:id" element={<h1>Comming soon</h1>} />
            <Route path="/aprove-ads" element={<AdminAdApprovalPage/>} />
          </Routes>
        )}
      </div>
    </div>
  );
}

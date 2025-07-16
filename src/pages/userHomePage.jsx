import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import AdsLanding from "./User/adsLanding";
import AdUploadForm from "./User/adUpload";
import AdDetails from "./User/adDetail";
import BrowseAds from "./User/browseAds";
import MyAds from "./User/myAds";
import EditAdForm from "./User/editAds";
import LoginForm from "./loging";
import RegisterForm from "./register";
import axios from "axios";
import PopupAd from "./User/popup";


export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // user data

  useEffect(() => {
    // Replace this with your actual auth/user API
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/profile", { withCredentials: true });
        setUser(res.data);

        // Redirect if admin
        if (res.data.role === "admin") {
          navigate("/admin");
        }
      } catch (err) {
        console.error("User not logged in or error:", err);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <PopupAd />

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<AdsLanding />} />
          <Route path="/post" element={<AdUploadForm />} />
          <Route path="/ads/:id" element={<AdDetails />} />
          <Route path="/ads" element={<BrowseAds />} />
          <Route path="/my-ads" element={<MyAds />} />
          <Route path="/edit-ad/:id" element={<EditAdForm />} />
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
        </Routes>
      </div>
    </div>
  );
}

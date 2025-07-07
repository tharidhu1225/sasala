import { useEffect, useState } from "react";
import axios from "axios";
import {
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("");
  const [adminName, setAdminName] = useState("");

  const [totalUsers, setTotalUsers] = useState(0);
  const [activeAds, setActiveAds] = useState(0);
  const [pendingAds, setPendingAds] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else if (hour < 20) setGreeting("Good Evening");
    else setGreeting("Good Night");

    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        const profileRes = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/user/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAdminName(profileRes.data.name);

        const statsRes = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/admin/dashboard-stats",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTotalUsers(statsRes.data.totalUsers);
        setActiveAds(statsRes.data.activeAds);
        setPendingAds(statsRes.data.pendingAds);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {greeting}, <span className="text-green-700">{adminName}</span> 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here's a quick summary of what's going on today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={totalUsers}
          Icon={UserIcon}
          color="blue"
        />
        <StatCard
          title="Active Ads"
          value={activeAds}
          Icon={CheckCircleIcon}
          color="green"
        />
        <StatCard
          title="Pending Ads"
          value={pendingAds}
          Icon={ClockIcon}
          color="yellow"
        />
      </div>
    </div>
  );
}

// Reusable StatCard component
function StatCard({ title, value, Icon, color }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    yellow: "text-yellow-600 bg-yellow-100",
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-all">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${colorMap[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">{title}</h4>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

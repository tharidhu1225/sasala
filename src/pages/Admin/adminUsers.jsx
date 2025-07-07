import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data); // <---- Add this line to update the users state
      } catch (error) {
        setError("Failed to load users.");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        User Management
      </h1>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <div className="text-center py-6 text-gray-600">Loading users...</div>
        ) : error ? (
          <div className="text-center py-6 text-red-600 font-semibold">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No users found.</div>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-2 sm:p-3">Name</th>
                <th className="border p-2 sm:p-3">Email</th>
                <th className="border p-2 sm:p-3">Phone</th>
                <th className="border p-2 sm:p-3">Role</th>
                <th className="border p-2 sm:p-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="border p-2 sm:p-3 whitespace-nowrap">{user.name}</td>
                  <td className="border p-2 sm:p-3 break-words max-w-xs">{user.email}</td>
                  <td className="border p-2 sm:p-3 whitespace-nowrap">{user.phone || "-"}</td>
                  <td className="border p-2 sm:p-3 capitalize whitespace-nowrap">{user.role}</td>
                  <td className="border p-2 sm:p-3 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

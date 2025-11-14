import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null); // user: { firstName, lastName, email, ... }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace with your token management logic
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/users/profile", // Adjust if needed
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <span className="text-xl text-red-600">Not logged in / Profile not found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center">
        {/* Add Image if you fetch it */}
        {user.image && (
          <img src={user.image} alt="Profile" className="w-32 h-32 rounded-full mb-4 object-cover" />
        )}
        <h1 className="text-3xl font-bold mb-2">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-gray-700 text-lg mb-1">{user.email}</p>
        {/* Add other info as desired: phone, role, etc. */}
        <p className="text-gray-500">Role: {user.role}</p>
      </div>
    </div>
  );
}

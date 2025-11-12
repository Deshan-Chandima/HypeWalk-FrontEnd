import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "user",
    Image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const data = {
        ...form,
        Image:
          form.Image ||
          "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=2048x2048&w=is&k=20&c=-g-2McKwLpsyYHPDT3Wf1oo2ppTmNxq797heiFJmwSM=",
        role: form.role || "user",
        isBlocked: false,
        isEmailVerified: "false",
      };
      // Remove confirmPassword before sending to backend
      delete data.confirmPassword;
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users", data);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Try again."
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen bg-[url(./loginpageBG.png)] flex bg-cover bg-center items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[#2D3436] mb-2">Sign Up</h1>
          <p className="text-[#636E72] text-sm">Create an account to continue</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block text-sm font-medium text-[#2D3436] mb-2">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              required
              placeholder="First Name"
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] rounded-xl px-4 py-3 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D3436] mb-2">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              required
              placeholder="Last Name"
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] rounded-xl px-4 py-3 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D3436] mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="example@email.com"
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] rounded-xl px-4 py-3 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D3436] mb-2">
              Phone (optional)
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] rounded-xl px-4 py-3 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D3436] mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] rounded-xl px-4 py-3 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D3436] mb-2">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] rounded-xl px-4 py-3 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00B894] hover:bg-[#00A383] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {isLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-[#636E72] mt-6">
          Already have an account?{" "}
          <Link
            className="text-[#00B894] font-semibold hover:text-[#00A383] hover:underline cursor-pointer transition-colors"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

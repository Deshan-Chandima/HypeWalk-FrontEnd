import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        toast.success("Login successful");
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        if (response.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error("Login failed");
        console.log(error);
      });
  }

  return (
    <div className="h-screen w-screen bg-[url(./loginpageBG.png)] flex bg-cover bg-center items-center justify-center p-4  ">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2D3436] mb-2">Login</h1>
          <p className="text-[#636E72] text-sm">Welcome back to the store</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#2D3436] mb-2">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] rounded-xl px-4 py-3 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D3436] mb-2">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] rounded-xl px-4 py-3 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
            />
          </div>

          <button
            onClick={login}
            className="w-full bg-[#00B894] hover:bg-[#00A383] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </div>

        <p className="text-center text-sm text-[#636E72] mt-6">
          Don't have an account?{" "}
          <Link
            className="text-[#00B894] font-semibold hover:text-[#00A383] hover:underline cursor-pointer transition-colors"
            to="/registerPage"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

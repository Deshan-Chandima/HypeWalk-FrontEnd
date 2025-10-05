
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(){
    axios.post("http://localhost:5000/api/users/login",{
      email:email,
      password:password
    }).then(response=>{
      console.log(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  return (
    <div className="h-screen w-screen bg-[url(./loginpageBG.png)] flex bg-cover bg-center items-center justify-center p-4  ">
      <div className="w-full max-w-md backdrop-blur-md rounded-2xl p-8 border border-red-600/30   ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Login</h1>
          <p className="text-white text-sm">Welcome back to the store</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-md text-zinc-300 mb-2">Email</label>
            <input
              
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Password</label>
            <input
              
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-red-600 focus:outline-none"
            />
          </div>

          <button
             onClick={login}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Sign In
          </button>
        </div>

        <p className="text-center text-sm text-white mt-6">
          Don't have an account? <Link className="text-red-500 cursor-pointer" to="/registerPage">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

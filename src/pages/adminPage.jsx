import { Link, Router, Routes } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="w full  h-screen bg bg-red-900 flex">
      <div className="w-[300px] flex flex-col items-center h-full bg-white">
        <span className="text-3xl font-bold my-5">Admin Page</span>
        
        <Link className="flex flex-row h-[60px] w-full  p-[50px] items-center text-xl gap-25" to="/admin/products">Products</Link>
        <Link className="flex flex-row h-[60px] w-full  p-[50px] items-center text-xl gap-25" to="/admin/orders">Orders</Link>
        <Link className="flex flex-row h-[60px] w-full  p-[50px] items-center text-xl gap-25" to="/admin/users">Users</Link>
        <Link className="flex flex-row h-[60px] w-full  p-[50px] items-center text-xl gap-25" to="/admin/settings">Settings</Link>

      </div>
      <div className="w-[calc(100%-300px)] h-full bg-blue-900">
        <Routes path="/">

        </Routes>

      </div>
      
    </div>
  )
}
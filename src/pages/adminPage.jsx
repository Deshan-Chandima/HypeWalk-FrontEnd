import { Link, Route, Router, Routes } from "react-router-dom";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductsAdminPage from "./admin/addProductAdminPage";


export default function AdminPage() {
  return (
    <div className="w full  h-screen  flex">
      <div className="w-[300px] flex flex-col items-center h-full ">
        <span className="text-3xl font-bold my-5">Admin Page</span>
        
        <Link className="flex flex-row h-[60px] w-full  p-[50px] items-center text-xl gap-25" to="/admin/products">Products</Link>
        <Link className="flex flex-row h-[60px] w-full  p-[50px] items-center text-xl gap-25" to="/admin/orders">Orders</Link>
        <Link className="flex flex-row h-[60px] w-full  p-[50px] items-center text-xl gap-25" to="/admin/users">Users</Link>
        <Link className="flex flex-row h-[60px] w-full  p-[50px] items-center text-xl gap-25" to="/admin/settings">Settings</Link>

      </div>
      <div className="w-[calc(100%-300px)] h-full">
        <Routes path="/">
        <Route path="/" element={<h1>DashBoard</h1>}/>
        <Route path="/products" element={<ProductsAdminPage/>}/>
        <Route path="/orders" element={<h1>Orders</h1>}/>
        <Route path="/newProduct" element={<AddProductsAdminPage/>}/>


        </Routes>

      </div>
      
    </div>
  )
}
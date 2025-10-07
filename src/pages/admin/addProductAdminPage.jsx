import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";

export default function AddProductsAdminPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altName, setAltName] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [labelledPrice, setLabelledPrice] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [category, setCategory] = useState("Sneakers");
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    
    setLoading(true);
    const promisesArray = []

    for(let i=0; i<images.length; i++){
      const promise = mediaUpload(images[i])
      promisesArray[i] = promise
    }

    const responses = await Promise.all(promisesArray)
    console.log(responses);
    
    

    const altNameArray = altName.split(",")
    const sizeArray = size.split(",")
    const colorArray = color.split(",")
    

    const productData = {
      productId: productId,
      name: name,
      altName: altNameArray,
      brand: brand,
      size: sizeArray,
      color: colorArray,
      labelledPrice: Number(labelledPrice),
      price: Number(price),
      images: responses,
      description: description,
      stock: Number(stock),
      isAvailable: isAvailable,
      category: category
    };

    const token = localStorage.getItem("token");

    if (token == null) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    axios.post(
      import.meta.env.VITE_BACKEND_URL + "/api/products",
      productData,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    ).then((res) => {
      console.log("Product Added Successfully");
      toast.success("Product Added Successfully");
      navigate("/admin/products");
    }).catch((error) => {
      console.error("Error Adding Product:", error);
      toast.error("Failed to Add Product");
    })
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F0] overflow-y-auto py-8 px-4">
      <div className="w-full max-w-[900px] mx-auto border border-gray-100 rounded-3xl p-8 bg-white shadow-xl flex flex-col gap-6">
        
        <h2 className="text-3xl font-bold text-[#2D3436] text-center mb-4">Add New Product</h2>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Product ID *</label>
            <input 
              type="text" 
              value={productId} 
              onChange={(e) => setProductId(e.target.value)} 
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              placeholder="nike-air-max-90-001"
              required
            />
          </div>

          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Product Name *</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              placeholder="Nike Air Max 90"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Brand *</label>
            <input 
              type="text" 
              value={brand} 
              onChange={(e) => setBrand(e.target.value)} 
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              placeholder="Nike"
              required
            />
          </div>

          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Category *</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
            >
              <option value="Sneakers">Sneakers</option>
              <option value="Running">Running</option>
              <option value="Basketball">Basketball</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#2D3436]">Alternative Names (comma-separated)</label>
          <input 
            type="text" 
            value={altName} 
            onChange={(e) => setAltName(e.target.value)} 
            className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
            placeholder="Air Max 90, AM90"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Sizes (comma-separated) *</label>
            <input 
              type="text" 
              value={size} 
              onChange={(e) => setSize(e.target.value)} 
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              placeholder="7, 8, 9, 10, 11, 12"
              required
            />
          </div>

          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Colors (comma-separated) *</label>
            <input 
              type="text" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              placeholder="White, Black, Red"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Labelled Price *</label>
            <input 
              type="number" 
              value={labelledPrice} 
              onChange={(e) => setLabelledPrice(e.target.value)} 
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              placeholder="150"
              required
            />
          </div>

          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Selling Price *</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              placeholder="120"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Images</label>
          <input multiple type="file"  
            onChange={(e)=>{
            const files = Array.from(e.target.files);
            setImages((prevImages) => [...prevImages, ...files])

          }} className="w-full border-[2px] h-[40px] rounded-md px-2"/>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#2D3436]">Description *</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[120px] rounded-xl px-4 py-3 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition resize-none"
            placeholder="Describe the product..."
            required
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Stock *</label>
            <input 
              type="number" 
              value={stock} 
              onChange={(e) => setStock(e.target.value)} 
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] placeholder-[#B2BEC3] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
              placeholder="50"
              required
            />
          </div>

          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Availability *</label>
            <select 
              value={isAvailable} 
              onChange={(e) => setIsAvailable(e.target.value === "true")} 
              className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
            >
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-6">
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="cursor-pointer w-[200px] h-[50px] border-2 border-black rounded-md flex justify-center items-center bg-black text-white hover:bg-gray-800 transition"
          >
            Add product
          </button>
          <Link 
            to="/admin/products" 
            className="w-[200px] h-[50px] border-2 border-[#DFE6E9] rounded-xl flex justify-center items-center bg-white text-[#2D3436] hover:bg-[#FAFAFA] transition font-semibold"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
 
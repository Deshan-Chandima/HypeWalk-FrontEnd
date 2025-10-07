import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import uploadFile from "../../utils/mediaUpload";

export default function UpdateProductPage() {
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setProductName] = useState(location.state.name);
  const [altName, setAlternativeName] = useState(location.state.altName?.join(",") || "");
  const [brand, setBrand] = useState(location.state.brand || "");
  const [size, setSize] = useState(location.state.size?.join(",") || "");
  const [color, setColor] = useState(location.state.color?.join(",") || "");
  const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
  const [price, setPrice] = useState(location.state.price);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState(location.state.description);
  const [stock, setStock] = useState(location.state.stock);
  const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
  const [category, setCategory] = useState(location.state.category);
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);

    try {
      let uploadedImages = [];

      // Upload new images if any
      if (images.length > 0) {
        const promisesArray = [];
        for (let i = 0; i < images.length; i++) {
          const promise = uploadFile(images[i]);
          promisesArray.push(promise);
        }
        uploadedImages = await Promise.all(promisesArray);
        console.log("Uploaded images:", uploadedImages);
      }

      // Split comma-separated values and trim
      const altNameArray = altName.split(",").map(item => item.trim());
      const sizeArray = size.split(",").map(item => item.trim());
      const colorArray = color.split(",").map(item => item.trim());

      const productData = {
        productId: productId,
        name: name,
        altName: altNameArray,
        brand: brand,
        size: sizeArray,
        color: colorArray,
        labelledPrice: Number(labelledPrice),
        price: Number(price),
        images: uploadedImages.length > 0 ? uploadedImages : location.state.images,
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

      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId,
        productData,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      console.log("Product Updated Successfully");
      toast.success("Product Updated Successfully");
      navigate("/admin/products");

    } catch (error) {
      console.error("Error Updating Product:", error);
      toast.error("Failed to Update Product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F0] overflow-y-auto py-8 px-4">
      <div className="w-full max-w-[900px] mx-auto border border-gray-100 rounded-3xl p-8 bg-white shadow-xl flex flex-col gap-6">
        
        <h2 className="text-3xl font-bold text-[#2D3436] text-center mb-4">Update Product</h2>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Product ID *</label>
            <input 
              disabled
              type="text" 
              value={productId} 
              onChange={(e) => setProductId(e.target.value)} 
              className="w-full bg-[#F0F0F0] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#636E72] cursor-not-allowed"
            />
          </div>

          <div className="flex-1 min-w-[250px] flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2D3436]">Product Name *</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setProductName(e.target.value)} 
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
            onChange={(e) => setAlternativeName(e.target.value)} 
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

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#2D3436]">Images (Upload new to replace)</label>
          <input 
            multiple 
            type="file" 
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setImages((prevImages) => [...prevImages, ...files]);
            }} 
            className="w-full bg-[#FAFAFA] border border-[#DFE6E9] h-[45px] rounded-xl px-4 text-[#2D3436] focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#00B894] file:text-white hover:file:bg-[#00A383] file:cursor-pointer"
          />
          {images.length > 0 && (
            <p className="text-sm text-[#636E72]">{images.length} new file(s) selected</p>
          )}
          {location.state.images && location.state.images.length > 0 && (
            <p className="text-xs text-[#B2BEC3]">Current: {location.state.images.length} existing image(s)</p>
          )}
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
            className="cursor-pointer w-[200px] h-[50px] rounded-xl flex justify-center items-center bg-[#00B894] text-white hover:bg-[#00A383] transition font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Product"}
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

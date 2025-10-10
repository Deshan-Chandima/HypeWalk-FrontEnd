import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
  Star
} from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function ProductOverview() {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`
      );
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product details.");
      setLoading(false);
    }
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#ECE9E2] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00B894]"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#ECE9E2] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-xl mb-4">{error || "Product not found"}</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-[#00B894] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00A383] transition"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full bg-[#ECE9E2] min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-[#636E72]">
            <button onClick={() => navigate('/')} className="hover:text-[#00B894] transition">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigate(-1)} className="hover:text-[#00B894] transition">
              {product.gender}
            </button>
            <span>/</span>
            <span className="text-[#2D3436] font-medium">{product.name}</span>
          </div>
        </div>

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={product.images?.[selectedImage] || "https://via.placeholder.com/600"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {product.images?.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
                    >
                      <ChevronLeft className="w-6 h-6 text-[#2D3436]" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
                    >
                      <ChevronRight className="w-6 h-6 text-[#2D3436]" />
                    </button>
                  </>
                )}

                {/* Stock Badge */}
                {product.stock < 10 && product.stock > 0 && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Only {product.stock} left!
                  </div>
                )}

                {product.stock === 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {product.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? "border-[#00B894] shadow-lg"
                        : "border-transparent hover:border-[#00B894]/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6">
              {/* Category & Gender Badge */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#00B894]/10 text-[#00B894] rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-[#2D3436]/10 text-[#2D3436] rounded-full text-sm font-medium">
                  {product.gender}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-4xl font-bold text-[#2D3436]">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#FFD700] text-[#FFD700]"
                    />
                  ))}
                </div>
                <span className="text-[#636E72] text-sm">(128 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-[#00B894]">
                  Rs {Number(product.price).toLocaleString()}
                </span>
                {product.labelledPrice > product.price && (
                  <>
                    <span className="text-2xl text-[#636E72] line-through">
                      Rs {Number(product.labelledPrice).toLocaleString()}
                    </span>
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                      Save Rs {(product.labelledPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-[#636E72] leading-relaxed text-lg">
                {product.description || "Experience ultimate comfort and style with this premium footwear. Designed for all-day wear with sustainable materials."}
              </p>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[#2D3436] font-semibold text-lg">
                    Select Size
                  </label>
                  <button className="text-[#00B894] text-sm font-medium hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {[7, 8, 9, 10, 11, 12].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl font-semibold transition ${
                        selectedSize === size
                          ? "bg-[#00B894] text-white shadow-lg"
                          : "bg-white text-[#2D3436] hover:border-[#00B894] border-2 border-transparent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="text-[#2D3436] font-semibold text-lg">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-white rounded-xl font-bold text-xl hover:bg-[#00B894] hover:text-white transition"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-[#2D3436] w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 bg-white rounded-xl font-bold text-xl hover:bg-[#00B894] hover:text-white transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  disabled={product.stock === 0 || !selectedSize}
                  className="flex-1 bg-[#00B894] text-white py-4 rounded-full font-bold text-lg hover:bg-[#00A383] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </button>
                
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition shadow-lg ${
                    isLiked
                      ? "bg-red-500 text-white"
                      : "bg-white text-[#2D3436] hover:bg-red-500 hover:text-white"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
                </button>

                <button className="w-16 h-16 bg-white text-[#2D3436] rounded-full flex items-center justify-center hover:bg-[#00B894] hover:text-white transition shadow-lg">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-white">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-[#00B894]/10 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-[#00B894]" />
                  </div>
                  <span className="text-sm font-medium text-[#2D3436]">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-[#00B894]/10 rounded-full flex items-center justify-center">
                    <RotateCcw className="w-6 h-6 text-[#00B894]" />
                  </div>
                  <span className="text-sm font-medium text-[#2D3436]">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-[#00B894]/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#00B894]" />
                  </div>
                  <span className="text-sm font-medium text-[#2D3436]">1-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

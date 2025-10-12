// src/pages/client/productOverview.jsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  ShoppingCart, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import { addToCart, getCart } from "../../utils/cart.js";

// Helper functions
function getPid(p) {
  return p?.productId || p?._id || p?.id;
}

function clampQty(n) {
  const x = Math.floor(Number(n));
  if (Number.isNaN(x) || x < 1) return 1;
  if (x > 999) return 999;
  return x;
}

export default function ProductOverview() {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  const [adding, setAdding] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  // --- fetch product ---
  useEffect(() => {
    setStatus("loading");
    axios
      .get(import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productId}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
        setQty(1);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load product");
        setStatus("error");
      });
  }, [params.productId]);

  // --- handleAddToCart ---
  async function handleAddToCart() {
    if (!product) return;
    
    if (!selectedSize) {
      toast.error("Please select a size first!");
      return;
    }
    
    try {
      setAdding(true);
      await addToCart(product, qty, selectedSize);
      toast.success(`Added ${qty} x ${product.name} (Size ${selectedSize}) to cart`);
      await getCart();
    } catch (e) {
      if (e?.response?.status === 401 || e?.response?.status === 403) {
        toast.error("Please login to save your cart");
      } else {
        toast.error("Failed to add to cart");
      }
      console.error(e);
    } finally {
      setAdding(false);
    }
  }

  // --- handleBuyNow ---
  function handleBuyNow() {
    if (!product) return;
    
    if (!selectedSize) {
      toast.error("Please select a size first!");
      return;
    }
    
    const pid = getPid(product);
    navigate("/checkout", {
      state: {
        items: [
          {
            productId: pid,
            quantity: qty,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || product.image,
            size: selectedSize,
          },
        ],
      },
    });
  }

  // Image navigation
  const handleNextImage = () => {
    if (!product?.images || product.images.length === 0) return;
    setSelectedImage((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    if (!product?.images || product.images.length === 0) return;
    setSelectedImage((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // Helpers
  const discountPct = useMemo(() => {
    if (!product) return 0;
    if (Number(product?.labellPrice) > Number(product?.price)) {
      return Math.round(
        ((product.labellPrice - product.price) / product.labellPrice) * 100
      );
    }
    return 0;
  }, [product]);

  // ✅ availability logic
  const soldOut = useMemo(() => {
    if (!product) return false;
    const stockNum = Number(product.stock ?? 0);
    return !product.isAvailable || stockNum <= 0;
  }, [product]);

  // Get available sizes from product
  const availableSizes = useMemo(() => {
    if (!product) return [];

    if (Array.isArray(product.sizes) && product.sizes.length > 0) {
      return product.sizes;
    }

    return [7, 8, 9, 10, 11, 12];
  }, [product]);

  // ✅ LOADING STATE
  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#ECE9E2] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00B894]"></div>
            <p className="text-[#636E72] font-medium">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ ERROR STATE
  if (status === "error" || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#ECE9E2] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-xl font-semibold mb-4">
              Error loading product. Please try again later.
            </p>
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

  // ✅ SUCCESS STATE
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
          <div className="bg-white shadow-lg rounded-3xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-[#F5F5F5] rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={product.images?.[selectedImage] || product.images?.[0] || "https://via.placeholder.com/600"}
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

                {soldOut && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
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
              )}
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6">
              {/* Title + status badge */}
              <div className="flex items-start gap-3 w-full flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#2D3436]">
                  {product.name}{" "}
                  {Array.isArray(product.altNames) && product.altNames.length > 0 && (
                    <span className="block sm:inline font-light text-[#636E72] text-base sm:text-xl">
                      {product.altNames.join(" | ")}
                    </span>
                  )}
                </h1>

                <span
                  className={
                    "px-3 py-1 text-xs sm:text-sm font-semibold rounded-full mt-1 " +
                    (soldOut
                      ? "bg-gray-200 text-gray-700"
                      : "bg-green-100 text-green-700")
                  }
                >
                  {soldOut ? "Out of Stock" : "In Stock"}
                </span>
              </div>

              {/* Stock line */}
              <div className="text-sm text-[#636E72]">
                Stock: <b className="text-[#2D3436]">{Number(product.stock ?? 0)}</b>
              </div>

              <p className="text-[#636E72] text-base sm:text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-5 sm:mt-6">
                {Number(product.labellPrice) > Number(product.price) ? (
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <span className="text-xl sm:text-2xl font-medium text-[#636E72] line-through">
                      Rs {Number(product.labellPrice).toFixed(2)}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#00B894]">
                      Rs {Number(product.price).toFixed(2)}
                    </span>
                    {discountPct > 0 && (
                      <span className="px-3 py-1 text-xs sm:text-sm bg-red-500 text-white font-semibold rounded-full">
                        {discountPct}% OFF
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold text-[#00B894]">
                    Rs {Number(product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <label className="text-[#2D3436] font-semibold text-lg">
                  Select Size {!selectedSize && <span className="text-red-500">*</span>}
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={soldOut}
                      className={`py-3 rounded-xl font-semibold transition ${
                        selectedSize === size
                          ? "bg-[#00B894] text-white shadow-lg"
                          : soldOut
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-[#2D3436] hover:border-[#00B894] border-2 border-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && !soldOut && (
                  <p className="text-sm text-orange-600">Please select a size</p>
                )}
              </div>

              {/* Quantity selector */}
              <div className="space-y-3">
                <label className="text-[#2D3436] font-semibold text-lg">
                  Quantity
                </label>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 cursor-pointer border-gray-200 flex items-center justify-center text-lg sm:text-xl hover:bg-[#00B894] hover:text-white hover:border-[#00B894] transition disabled:opacity-50"
                    onClick={() => setQty((q) => clampQty(q - 1))}
                    disabled={soldOut}
                  >
                    –
                  </button>

                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={999}
                    value={qty}
                    onChange={(e) => setQty(clampQty(e.target.value))}
                    className="w-16 sm:w-20 h-9 sm:h-10 rounded-xl border-2 border-gray-200 text-center focus:outline-none focus:border-[#00B894] disabled:bg-gray-100"
                    disabled={soldOut}
                  />

                  <button
                    type="button"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 cursor-pointer border-gray-200 flex items-center justify-center text-lg sm:text-xl hover:bg-[#00B894] hover:text-white hover:border-[#00B894] transition disabled:opacity-50"
                    onClick={() => setQty((q) => clampQty(q + 1))}
                    disabled={soldOut}
                  >
                    +
                  </button>

                  <span className="ml-2 sm:ml-4 text-xs sm:text-sm text-[#636E72]">
                    Subtotal:&nbsp;
                    <b className="text-[#2D3436]">Rs {(Number(product.price) * qty).toFixed(2)}</b>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row flex-wrap gap-3 sm:gap-4">
                <button
                  className={
                    "px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg text-white border-2 transition-all duration-300 " +
                    (soldOut || !selectedSize
                      ? "bg-gray-400 border-gray-400 cursor-not-allowed"
                      : "bg-[#2D3436] border-[#2D3436] hover:bg-[#00B894] hover:border-[#00B894] cursor-pointer")
                  }
                  onClick={handleBuyNow}
                  disabled={soldOut || !selectedSize}
                >
                  {soldOut ? "Out of Stock" : "Buy Now"}
                </button>

                <button
                  className={
                    "px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg text-white border-2 transition-all duration-300 flex items-center gap-2 " +
                    (soldOut || adding || !selectedSize
                      ? "bg-gray-400 border-gray-400 cursor-not-allowed"
                      : "bg-[#00B894] border-[#00B894] hover:bg-[#00A383] hover:border-[#00A383] cursor-pointer")
                  }
                  onClick={handleAddToCart}
                  disabled={soldOut || adding || !selectedSize}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {soldOut ? "Unavailable" : adding ? "Adding..." : "Add to Cart"}
                </button>

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition shadow-lg border-2 ${
                    isLiked
                      ? "bg-red-500 border-red-500 text-white"
                      : "bg-white border-gray-200 text-[#2D3436] hover:bg-red-500 hover:border-red-500 hover:text-white"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                </button>
              </div>



              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-gray-100">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-[#00B894]/10 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-[#00B894]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#2D3436]">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-[#00B894]/10 rounded-full flex items-center justify-center">
                    <RotateCcw className="w-6 h-6 text-[#00B894]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#2D3436]">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-[#00B894]/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#00B894]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#2D3436]">1-Year Warranty</span>
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

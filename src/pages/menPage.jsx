import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import axios from "axios";

export default function MenPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ Fetch with gender=Men (backend returns Men + Unisex)
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/products",
        {
          params: { gender: "Men" }
        }
      );
      
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full bg-[#ECE9E2]">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] bg-gradient-to-r from-[#D4C5B9] to-[#C9B8A8] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold text-[#2D3436] mb-4">
                Men's Collection
              </h1>
              <p className="text-lg text-[#636E72] mb-6">
                Discover the latest collection of men's footwear designed for
                comfort and style.
              </p>
              <div className="flex gap-3">
                <button className="bg-[#2D3436] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00B894] transition-all">
                  Shop Now
                </button>
                <button className="border-2 border-[#2D3436] text-[#2D3436] px-6 py-3 rounded-full font-semibold hover:bg-[#2D3436] hover:text-white transition-all">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00B894] mx-auto"></div>
              <p className="mt-4 text-[#636E72]">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
              <button
                onClick={fetchProducts}
                className="mt-4 bg-[#00B894] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00A383] transition"
              >
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#636E72] text-lg mb-4">
                No men's products available at the moment.
              </p>
              <p className="text-[#B2BEC3] text-sm">
                Check back later for new arrivals.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product.productId || product._id}
                    className="group cursor-pointer"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-xl transition-all">
                      <img
                        src={
                          product.images?.[0] ||
                          "https://via.placeholder.com/400x400?text=No+Image"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x400?text=No+Image";
                        }}
                      />

                      {/* Stock Badge */}
                      {product.stock > 0 && product.stock < 10 && (
                        <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Only {product.stock} left
                        </div>
                      )}

                      {product.stock === 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Out of Stock
                        </div>
                      )}

                      {/* Quick Add Button */}
                      {product.isAvailable && product.stock > 0 && (
                        <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-[#2D3436] px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                          Quick Add
                        </button>
                      )}
                    </div>

                    {/* Product Info */}
                    <div>
                      <h3 className="text-base font-semibold text-[#2D3436] mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#636E72] mb-2">
                        {product.category}
                      </p>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <p className="text-[#00B894] font-bold text-lg">
                          Rs {Number(product.price).toLocaleString()}
                        </p>
                        {product.labelledPrice > product.price && (
                          <p className="text-[#636E72] text-sm line-through">
                            Rs {Number(product.labelledPrice).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <button className="bg-white text-[#2D3436] px-8 py-3 rounded-full font-semibold border-2 border-[#2D3436] hover:bg-[#2D3436] hover:text-white transition-all">
                  Load More Products
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

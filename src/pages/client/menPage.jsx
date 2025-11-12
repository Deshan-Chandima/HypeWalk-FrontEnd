import { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import axios from "axios";
import ProductCard from "../../components/productCard";

export default function MenPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/products",
        {
          params: { gender: "Men" },
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

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full bg-[#ECE9E2]">
        {/* Hero Section */}
        <div className="relative h-[300px] bg-[url(./menHero.png)] bg-cover bg-center bg-no-repeat overflow-hidden">
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Floating decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-xl opacity-0 animate-slideInFromLeft" style={{ animationFillMode: 'forwards' }}>
              <h1 className="text-5xl font-bold text-[#2D3436] mb-4">
                Men's Collection
              </h1>
              <p className="text-lg text-[#636E72] mb-6">
                Discover the latest collection of men's footwear designed for
                comfort and style.
              </p>
              <div className="flex gap-3">
                <button className="bg-[#2D3436] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00B894] transition-all hover:scale-105 hover:shadow-xl">
                  Shop Now
                </button>
                <button className="border-2 border-[#2D3436] text-[#2D3436] px-6 py-3 rounded-full font-semibold hover:bg-[#2D3436] hover:text-white transition-all hover:scale-105">
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
              <p className="mt-4 text-[#636E72] animate-pulse">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 opacity-0 animate-fadeIn" style={{ animationFillMode: 'forwards' }}>
              <p className="text-red-500 text-lg">{error}</p>
              <button
                onClick={fetchProducts}
                className="mt-4 bg-[#00B894] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00A383] transition-all hover:scale-105 hover:shadow-xl"
              >
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 opacity-0 animate-fadeIn" style={{ animationFillMode: 'forwards' }}>
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
                {products.map((product, index) => (
                  <div
                    key={product.productId || product._id}
                    id={`product-${index}`}
                    data-animate
                    className={`transition-all duration-700 ${
                      isVisible[`product-${index}`]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <button className="bg-white text-[#2D3436] px-8 py-3 rounded-full font-semibold border-2 border-[#2D3436] hover:bg-[#2D3436] hover:text-white transition-all hover:scale-105 hover:shadow-xl hover:-translate-y-1">
                  Load More Products
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.8s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </>
  );}
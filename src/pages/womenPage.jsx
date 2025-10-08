import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";

export default function WomenPage() {
  const [filterOpen, setFilterOpen] = useState(false);

  // Sample women's products data
  const products = [
    {
      id: 1,
      name: "Women's Tree Runners",
      category: "Everyday Sneakers",
      price: 12500,
      colors: ["#FFB6C1", "#DDA0DD", "#F5F5DC", "#E6E6FA"],
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      badge: "NEW"
    },
    {
      id: 2,
      name: "Women's Wool Runners",
      category: "Casual Comfort",
      price: 11800,
      colors: ["#F5F5DC", "#DDA0DD", "#D8BFD8"],
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
      badge: "BESTSELLER"
    },
    {
      id: 3,
      name: "Women's Tree Dashers",
      category: "Running Shoes",
      price: 15000,
      colors: ["#000000", "#696969", "#FFB6C1"],
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600",
      badge: null
    },
    {
      id: 4,
      name: "Women's Trail Runners",
      category: "Outdoor Shoes",
      price: 16500,
      colors: ["#DDA0DD", "#D8BFD8", "#E6E6FA"],
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
      badge: null
    },
    {
      id: 5,
      name: "Women's Pipers",
      category: "Slip-Ons",
      price: 9500,
      colors: ["#F5F5DC", "#FAEBD7", "#FFF5EE"],
      image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600",
      badge: null
    },
    {
      id: 6,
      name: "Women's Wool Runner-up Mizzles",
      category: "Weather Ready",
      price: 14500,
      colors: ["#2C3E50", "#696969", "#D3D3D3"],
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600",
      badge: null
    },
    {
      id: 7,
      name: "Women's Tree Loungers",
      category: "Slip-Ons",
      price: 10500,
      colors: ["#FFB6C1", "#F5F5DC", "#E6E6FA"],
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600",
      badge: "SALE"
    },
    {
      id: 8,
      name: "Women's Smallbirds",
      category: "Kids & Teens",
      price: 8500,
      colors: ["#FFB6C1", "#87CEEB", "#98FB98"],
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600",
      badge: null
    },
  ];

  return (
    <div className="w-full bg-[#ECE9E2]">
      {/* Smaller Hero Section */}
      <div className="relative w-full h-[300px] bg-gradient-to-r from-[#E8D5E0] to-[#D8C5D0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-[#2D3436] mb-4">
              Women's Collection
            </h1>
            <p className="text-lg text-[#636E72] mb-6">
              Step into comfort and style with our latest women's footwear collection.
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

      {/* Filter Bar */}
      <div className="w-full bg-white shadow-sm sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-[#DFE6E9] rounded-full hover:border-[#00B894] transition"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
              
              <div className="hidden md:flex gap-2">
                <button className="px-4 py-2 border border-[#DFE6E9] rounded-full text-sm font-medium hover:border-[#00B894] transition">
                  All Shoes
                </button>
                <button className="px-4 py-2 border border-[#DFE6E9] rounded-full text-sm font-medium hover:border-[#00B894] transition">
                  Sneakers
                </button>
                <button className="px-4 py-2 border border-[#DFE6E9] rounded-full text-sm font-medium hover:border-[#00B894] transition">
                  Running
                </button>
                <button className="px-4 py-2 border border-[#DFE6E9] rounded-full text-sm font-medium hover:border-[#00B894] transition">
                  Slip-Ons
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[#636E72]">Sort by:</span>
              <button className="flex items-center gap-2 px-4 py-2 border border-[#DFE6E9] rounded-full text-sm font-medium hover:border-[#00B894] transition">
                <span>Featured</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t border-[#DFE6E9] grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {[5, 6, 7, 8, 9, 10].map(size => (
                    <button key={size} className="px-3 py-1 border border-[#DFE6E9] rounded text-xs hover:border-[#00B894] transition">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {["#FFB6C1", "#DDA0DD", "#F5F5DC", "#E6E6FA", "#000000"].map(color => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-[#DFE6E9] hover:border-[#00B894] transition"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Price Range</h4>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" className="rounded" />
                    Under Rs 12,000
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" className="rounded" />
                    Rs 12,000 - Rs 18,000
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Product Image */}
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-xl transition-all">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    product.badge === "SALE" 
                      ? "bg-red-500 text-white" 
                      : "bg-[#00B894] text-white"
                  }`}>
                    {product.badge}
                  </div>
                )}

                {/* Quick Add Button */}
                <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-[#2D3436] px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                  Quick Add
                </button>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-base font-semibold text-[#2D3436] mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-[#636E72] mb-2">{product.category}</p>
                
                {/* Color Options */}
                <div className="flex gap-1 mb-2">
                  {product.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-5 rounded-full border border-[#DFE6E9]"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-xs text-[#636E72] ml-1">+{product.colors.length - 4}</span>
                  )}
                </div>

                {/* Price */}
                <p className="text-[#00B894] font-bold text-lg">
                  Rs {product.price.toLocaleString()}
                </p>
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
      </div>
    </div>
  );
}

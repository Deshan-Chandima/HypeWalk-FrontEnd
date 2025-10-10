import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link 
      to={`/Overview/`+product._id}
      className="group cursor-pointer block"
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
            e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
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
      </div>

      {/* Product Info */}
      <div>
        <h3 className="text-base font-semibold text-[#2D3436] mb-1 group-hover:text-[#00B894] transition">
          {product.name}
        </h3>
        <p className="text-sm text-[#636E72] mb-2">{product.category}</p>

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
    </Link>
  );
}

import { useEffect, useMemo, useState } from "react";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function createdTimeMs(p) {
  if (p?.createdAt) {
    const t = Date.parse(p.createdAt);
    if (!Number.isNaN(t)) return t;
  }
  const id = String(p?._id || "");
  if (id.length >= 8) {
    const seconds = parseInt(id.substring(0, 8), 16);
    if (!Number.isNaN(seconds)) return seconds * 1000;
  }
  return 0;
}

export default function ProductAdminPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [onlyUnavailable, setOnlyUnavailable] = useState(false);
  const [sortOrder, setSortOrder] = useState("latest");

  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  function fetchAll() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setIsLoading(true);
    
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?includeUnavailable=true`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setProducts(list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load products");
        setIsLoading(false);
      });
  }

  function refresh() {
    fetchAll();
  }

  const filtered = useMemo(() => {
    if (!onlyUnavailable) return products;
    return products.filter(
      (p) => !p?.isAvailable || Number(p?.stock ?? 0) <= 0
    );
  }, [products, onlyUnavailable]);

  const shown = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const ta = createdTimeMs(a);
      const tb = createdTimeMs(b);
      if (sortOrder === "latest") return tb - ta;
      return ta - tb;
    });
    return arr;
  }, [filtered, sortOrder]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F0] p-6">
      {/* Header / Filters Row */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-[#2D3436]">Sort:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 rounded-xl border border-[#DFE6E9] bg-[#FAFAFA] text-sm text-[#2D3436] cursor-pointer focus:border-[#00B894] focus:ring-2 focus:ring-[#00B894]/20 focus:outline-none transition"
          >
            <option value="latest">Sort by Latest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-[#2D3436] cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer accent-[#00B894] rounded"
            checked={onlyUnavailable}
            onChange={(e) => setOnlyUnavailable(e.target.checked)}
          />
          Show only Out of Stock / Unavailable
        </label>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B894]"></div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-2xl bg-white">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#2D3436] text-white text-sm uppercase">
                <th className="p-4 font-semibold">Image</th>
                <th className="p-4 font-semibold">Product ID</th>
                <th className="p-4 font-semibold">Product Name</th>
                <th className="p-4 font-semibold">Label Price</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Availability</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Gender</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {shown.map((product, index) => {
                const stockNum = Number(product?.stock ?? 0);
                const available = !!product?.isAvailable && stockNum > 0;

                return (
                  <tr
                    key={product.productId || product._id || index}
                    className="border-b border-[#DFE6E9] hover:bg-[#FAFAFA] transition-colors"
                  >
                    {/* Product Image */}
                    <td className="p-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        {product.images && product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/100?text=No+Image";
                            }}
                          />
                        ) : (
                          <span className="text-xs text-gray-400">No Image</span>
                        )}
                      </div>
                    </td>

                    {/* Product ID */}
                    <td className="p-4 text-[#636E72] font-medium">
                      {product.productId}
                    </td>

                    {/* Product Name */}
                    <td className="p-4 font-semibold text-[#2D3436]">
                      {product.name}
                    </td>

                    {/* Label Price */}
                    <td className="p-4 text-[#B2BEC3] line-through">
                      Rs {Number(product.labelledPrice || 0).toFixed(2)}
                    </td>

                    {/* Price */}
                    <td className="p-4 text-[#00B894] font-bold text-lg">
                      Rs {Number(product.price || 0).toFixed(2)}
                    </td>

                    {/* Stock */}
                    <td
                      className={classNames(
                        "p-4 font-bold",
                        stockNum > 0 ? "text-[#00B894]" : "text-red-600"
                      )}
                    >
                      {stockNum}
                    </td>

                    {/* Availability */}
                    <td className="p-4">
                      <span
                        className={classNames(
                          "px-3 py-1.5 rounded-full text-xs font-semibold",
                          available
                            ? "bg-[#00B894]/10 text-[#00B894]"
                            : "bg-red-100 text-red-600"
                        )}
                        title={
                          product.isAvailable
                            ? stockNum > 0
                              ? "In Stock"
                              : "Out of Stock (zero stock)"
                            : "Marked as Unavailable"
                        }
                      >
                        {available ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="p-4 text-[#636E72]">{product.category}</td>

                    {/* Gender Column */}
                    <td className="p-4">
                      <span
                        className={classNames(
                          "px-3 py-1.5 rounded-full text-xs font-semibold",
                          product.gender === "Men"
                            ? "bg-blue-100 text-blue-700"
                            : product.gender === "Women"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-purple-100 text-purple-700"
                        )}
                      >
                        {product.gender || "Unisex"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        {/* Edit */}
                        <button
                          onClick={() => {
                            navigate("/admin/updateproduct", {
                              state: product,
                            });
                          }}
                          className="bg-[#00B894] p-2 text-2xl rounded-full text-white shadow-lg cursor-pointer hover:bg-[#00A383] transition-all hover:shadow-xl hover:-translate-y-0.5"
                          title="Edit Product"
                        >
                          <BiEditAlt />
                        </button>

                        {/* Delete */}
                        <button
                          className="bg-red-500 p-2 text-2xl rounded-full text-white shadow-lg cursor-pointer hover:bg-red-600 transition-all hover:shadow-xl hover:-translate-y-0.5"
                          title="Delete Product"
                          onClick={() => {
                            const token = localStorage.getItem("token");
                            if (!token) {
                              navigate("/login");
                              return;
                            }

                            if (
                              !window.confirm(
                                `Delete product ${product.productId}? This cannot be undone.`
                              )
                            ) {
                              return;
                            }

                            axios
                              .delete(
                                `${import.meta.env.VITE_BACKEND_URL}/api/products/${product.productId}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then(() => {
                                toast.success("Product Deleted Successfully");
                                refresh();
                              })
                              .catch((error) => {
                                console.error("Error deleting product:", error);
                                toast.error("Failed to delete product");
                              });
                          }}
                        >
                          <BiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {shown.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="p-12 text-center text-[#B2BEC3] text-base"
                  >
                    No products to show.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add new product button */}
      <Link
        to={"/admin/newproduct"}
        className="fixed right-10 bottom-10 text-white bg-[#00B894] p-4 rounded-full shadow-2xl hover:bg-[#00A383] transition-all hover:shadow-xl hover:scale-110"
        title="Add New Product"
      >
        <HiMiniPlusCircle className="text-5xl" />
      </Link>
    </div>
  );
}

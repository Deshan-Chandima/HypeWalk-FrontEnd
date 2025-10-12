// src/pages/client/CartPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import { 
  getCart, 
  removeFromCart, 
  updateCartItem, 
  getTotal,
  clearCartLocal 
} from "../../utils/cart.js";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      setLoading(true);
      const items = await getCart();
      setCartItems(items);
    } catch (error) {
      console.error("Error loading cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(productId, size) {
    try {
      setUpdating(true);
      await removeFromCart(productId, size);
      await loadCart();
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    } finally {
      setUpdating(false);
    }
  }

  async function handleUpdateQty(productId, size, newQty) {
    if (newQty < 1) {
      handleRemove(productId, size);
      return;
    }

    try {
      setUpdating(true);
      await updateCartItem(productId, size, newQty);
      await loadCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    } finally {
      setUpdating(false);
    }
  }

  async function handleClearCart() {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;
    
    try {
      setUpdating(true);
      clearCartLocal();
      await loadCart();
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    } finally {
      setUpdating(false);
    }
  }

  function handleCheckout() {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout", {
      state: {
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          image: item.image,
          size: item.size,
        })),
      },
    });
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal > 10000 ? 0 : 500) : 0;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />
      <div className="w-full bg-[#ECE9E2] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-[#00B894]" />
              <h1 className="text-3xl font-bold text-[#2D3436]">Shopping Cart</h1>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                disabled={updating}
                className="text-red-500 hover:text-red-600 font-medium transition flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Clear Cart
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00B894]"></div>
            </div>
          )}

          {/* Empty Cart State */}
          {!loading && cartItems.length === 0 && (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
              <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-[#2D3436] mb-3">Your cart is empty</h2>
              <p className="text-[#636E72] mb-8">Looks like you haven't added any items yet</p>
              <button
                onClick={() => navigate("/")}
                className="bg-[#00B894] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#00A383] transition"
              >
                Start Shopping
              </button>
            </div>
          )}

          {/* Cart Items */}
          {!loading && cartItems.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.size}-${index}`}
                    className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition"
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image || "https://via.placeholder.com/150"}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#2D3436] mb-1">
                          {item.name}
                        </h3>
                        {item.altNames && Array.isArray(item.altNames) && (
                          <p className="text-sm text-[#636E72] mb-2">
                            {item.altNames.join(" | ")}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-[#636E72]">
                          <span>Size: <b className="text-[#2D3436]">{item.size}</b></span>
                          <span>Price: <b className="text-[#2D3436]">Rs {item.price.toFixed(2)}</b></span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQty(item.productId, item.size, item.quantity - 1)}
                            disabled={updating}
                            className="w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:bg-[#00B894] hover:text-white hover:border-[#00B894] transition disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="w-12 text-center font-semibold text-[#2D3436]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleUpdateQty(item.productId, item.size, item.quantity + 1)}
                            disabled={updating}
                            className="w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:bg-[#00B894] hover:text-white hover:border-[#00B894] transition disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Subtotal & Remove */}
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-[#00B894]">
                            Rs {(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemove(item.productId, item.size)}
                            disabled={updating}
                            className="text-red-500 hover:text-red-600 transition disabled:opacity-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                  <h2 className="text-xl font-bold text-[#2D3436] mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-[#636E72]">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="font-semibold text-[#2D3436]">
                        Rs {subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-[#636E72]">
                      <span>Shipping</span>
                      <span className="font-semibold text-[#2D3436]">
                        {shipping === 0 ? "FREE" : `Rs ${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    {subtotal < 10000 && subtotal > 0 && (
                      <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                        Add Rs {(10000 - subtotal).toFixed(2)} more for FREE shipping!
                      </div>
                    )}

                    <div className="border-t-2 border-gray-100 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-[#2D3436]">Total</span>
                        <span className="text-2xl font-bold text-[#00B894]">
                          Rs {total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={updating || cartItems.length === 0}
                    className="w-full bg-[#00B894] text-white py-3 rounded-xl font-semibold hover:bg-[#00A383] transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => navigate("/")}
                    className="w-full mt-3 bg-white text-[#2D3436] py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-[#00B894] transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

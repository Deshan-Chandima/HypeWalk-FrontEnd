
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2, Plus, Minus, ShoppingBag, MapPin, Phone, User, CreditCard } from "lucide-react";
import axios from "axios";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer.jsx";
import { clearCartLocal } from "../../utils/cart.js";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Normalize cart: ensure numeric quantity >= 1 and price is numeric
  const [cart, setCart] = useState(() =>
    (location.state?.items || []).map((it) => ({
      ...it,
      quantity: Math.max(1, Number(it.quantity) || 1),
      price: Number(it.price) || 0,
      size: it.size || null,
    }))
  );

  // user + form
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // redirect if no items
  useEffect(() => {
    if (!location.state?.items || location.state.items.length === 0) {
      toast.error("Please select items to checkout");
      navigate("/cart");
    }
  }, []);

  // fetch user (require login)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setName(`${res.data.firstName ?? ""} ${res.data.lastName ?? ""}`.trim());
        setPhone(res.data.phone || "");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch user details.");
        navigate("/login");
      });
  }, [navigate]);

  // qty handlers — pure immutable updates (no in-place mutation)
  function decQty(index) {
    setCart((prev) =>
      prev.map((it, i) =>
        i === index ? { ...it, quantity: Math.max(1, it.quantity - 1) } : it
      )
    );
  }
  
  function incQty(index) {
    setCart((prev) =>
      prev.map((it, i) => (i === index ? { ...it, quantity: it.quantity + 1 } : it))
    );
  }
  
  function removeItem(index) {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    if (newCart.length === 0) {
      toast.error("Cart is empty");
      navigate("/cart");
    }
  }

  const subtotal = useMemo(
    () => cart.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [cart]
  );

  const shipping = subtotal > 0 ? (subtotal > 10000 ? 0 : 500) : 0;
  const total = subtotal + shipping;

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }
    if (!name.trim() || !address.trim() || !phone.trim()) {
      toast.error("Please fill all the details");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const order = {
      address,
      phone,
      items: cart.map((it) => ({ 
        productId: it.productId, 
        qty: it.quantity,
        size: it.size 
      })),
    };

    try {
      setLoading(true);
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Clear local cart after successful order
      clearCartLocal();
      
      toast.success("Order placed successfully!");
      navigate("/orders"); // or navigate("/")
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || "Error placing order";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="w-full bg-[#ECE9E2] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag className="w-8 h-8 text-[#00B894]" />
            <h1 className="text-3xl font-bold text-[#2D3436]">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Items + Delivery Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Items List */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#2D3436] mb-4">Order Items</h2>
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.productId}-${item.size}-${index}`}
                      className="flex gap-4 p-4 bg-[#ECE9E2]/30 rounded-xl hover:bg-[#ECE9E2]/50 transition"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-[#2D3436] line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-[#636E72]">
                            <span>Size: <b className="text-[#2D3436]">{item.size}</b></span>
                            <span>•</span>
                            <span>Rs {item.price.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Qty Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              className="w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:bg-[#00B894] hover:text-white hover:border-[#00B894] transition disabled:opacity-50"
                              onClick={() => decQty(index)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              className="w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:bg-[#00B894] hover:text-white hover:border-[#00B894] transition"
                              onClick={() => incQty(index)}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#00B894]">
                              Rs {(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              className="text-red-500 hover:text-red-600 transition"
                              onClick={() => removeItem(index)}
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#2D3436] mb-4">Delivery Details</h2>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#636E72]" />
                    <input
                      className="w-full h-12 border-2 border-gray-200 rounded-xl pl-11 pr-4 outline-none focus:border-[#00B894] transition"
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#636E72]" />
                    <input
                      className="w-full h-12 border-2 border-gray-200 rounded-xl pl-11 pr-4 outline-none focus:border-[#00B894] transition"
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-4 w-5 h-5 text-[#636E72]" />
                    <textarea
                      className="w-full min-h-[120px] border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#00B894] transition resize-none"
                      placeholder="Delivery Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold text-[#2D3436] mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-[#00B894]" />
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#636E72]">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="font-semibold text-[#2D3436]">
                      Rs {subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#636E72]">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#2D3436]">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `Rs ${shipping.toFixed(2)}`
                      )}
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
                  onClick={placeOrder}
                  disabled={loading || !name.trim() || !address.trim() || !phone.trim() || cart.length === 0}
                  className="w-full bg-[#00B894] text-white py-3 rounded-xl font-semibold hover:bg-[#00A383] transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      Place Order
                    </>
                  )}
                </button>

                <button
                  onClick={() => navigate("/cart")}
                  className="w-full mt-3 bg-white text-[#2D3436] py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-[#00B894] transition"
                >
                  Back to Cart
                </button>

                {/* Payment Info */}
                <div className="mt-6 p-4 bg-[#ECE9E2]/50 rounded-xl text-sm text-[#636E72]">
                  <p className="font-semibold text-[#2D3436] mb-2">Secure Checkout</p>
                  <p>Your payment information is processed securely. We do not store credit card details.</p>
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

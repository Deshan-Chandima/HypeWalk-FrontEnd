import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// auto-attach Authorization if present
API.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

// support productId | _id | id
function getPid(p) {
  return p?.productId || p?._id || p?.id;
}

/* ---------- Local (guest) cart ---------- */
export function getCartLocal() {
  let s = localStorage.getItem("cart");
  if (!s) {
    s = "[]";
    localStorage.setItem("cart", s);
  }
  return JSON.parse(s);
}

export function addToCartLocal(product, qty, size) {
  const pid = getPid(product);
  if (!pid) {
    console.error("addToCartLocal: Missing product id", product);
    return getCartLocal();
  }
  if (!size) {
    console.error("addToCartLocal: Size is required");
    return getCartLocal();
  }

  const cart = getCartLocal();
  // Find item with same productId AND size
  const i = cart.findIndex((it) => it.productId === pid && it.size === size);

  if (i !== -1) {
    const newQty = cart[i].quantity + qty;
    if (newQty <= 0) {
      const next = cart.filter((_, idx) => idx !== i);
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    } else {
      cart[i].quantity = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }
  } else {
    if (qty > 0) {
      cart.push({
        productId: pid,
        name: product.name,
        image: product.images?.[0] || product.image,
        price: product.price,
        quantity: qty,
        size: size,
        altNames: product.altNames,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  }
}

export function removeFromCartLocal(productId, size) {
  const cart = getCartLocal();
  const filtered = cart.filter(
    (it) => !(it.productId === productId && it.size === size)
  );
  localStorage.setItem("cart", JSON.stringify(filtered));
  return filtered;
}

export function updateCartItemLocal(productId, size, quantity) {
  const cart = getCartLocal();
  const i = cart.findIndex((it) => it.productId === productId && it.size === size);
  
  if (i !== -1) {
    if (quantity <= 0) {
      return removeFromCartLocal(productId, size);
    }
    cart[i].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
}

export function clearCartLocal() {
  localStorage.setItem("cart", "[]");
}

/* ---------- Server cart ---------- */
async function getCartServer() {
  const res = await API.get("/api/cart");
  return res.data.items || [];
}

async function addToCartServer(product, qty, size) {
  const pid = getPid(product);
  if (!pid) throw new Error("Missing product id (productId/_id/id)");
  if (!size) throw new Error("Size is required");

  const body = {
    item: {
      productId: pid,
      name: product.name,
      image: product.images?.[0] || product.image,
      price: product.price,
      size: size,
    },
    quantity: qty,
  };
  const res = await API.post("/api/cart", body);
  return res.data.items || [];
}

async function removeFromCartServer(productId, size) {
  const res = await API.delete(`/api/cart/${productId}/${size}`);
  return res.data.items || [];
}

async function updateCartItemServer(productId, size, quantity) {
  const body = { quantity };
  const res = await API.put(`/api/cart/${productId}/${size}`, body);
  return res.data.items || [];
}

export async function clearCartServer() {
  await API.delete("/api/cart");
}

/* ---------- Public API ---------- */
export async function getCart() {
  if (isLoggedIn()) {
    try {
      return await getCartServer();
    } catch (e) {
      console.error("Server getCart failed → local fallback:", e?.response?.status, e);
      return getCartLocal();
    }
  }
  return getCartLocal();
}

export async function addToCart(product, qty, size) {
  if (!size) {
    throw new Error("Size is required for adding to cart");
  }

  if (isLoggedIn()) {
    try {
      const items = await addToCartServer(product, qty, size);
      return items;
    } catch (e) {
      const code = e?.response?.status;
      if (code === 401 || code === 403) {
        console.error("Auth error: token missing/invalid/expired. Not saving to DB.");
        throw e; // UI should show login toast
      }
      console.error("addToCart server failed → local fallback:", e);
      return addToCartLocal(product, qty, size);
    }
  } else {
    return Promise.resolve(addToCartLocal(product, qty, size));
  }
}

export async function removeFromCart(productId, size) {
  if (isLoggedIn()) {
    try {
      return await removeFromCartServer(productId, size);
    } catch (e) {
      console.error("removeFromCart server failed → local fallback:", e);
      return removeFromCartLocal(productId, size);
    }
  } else {
    return Promise.resolve(removeFromCartLocal(productId, size));
  }
}

export async function updateCartItem(productId, size, quantity) {
  if (isLoggedIn()) {
    try {
      return await updateCartItemServer(productId, size, quantity);
    } catch (e) {
      console.error("updateCartItem server failed → local fallback:", e);
      return updateCartItemLocal(productId, size, quantity);
    }
  } else {
    return Promise.resolve(updateCartItemLocal(productId, size, quantity));
  }
}

export async function getTotal() {
  const items = await getCart();
  return items.reduce((sum, it) => sum + it.price * it.quantity, 0);
}

export async function syncGuestCartToServer() {
  if (!isLoggedIn()) return getCartLocal();
  const guest = getCartLocal();
  if (guest.length === 0) return getCartServer();

  for (const it of guest) {
    try {
      await addToCartServer(it, it.quantity, it.size);
    } catch (e) {
      console.error("Sync push failed:", it, e);
    }
  }
  clearCartLocal();
  return await getCartServer();
}

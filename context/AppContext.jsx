"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [guestId,setGuestId]=useState(null);
  const router = useRouter();
  const [user, setUser] = useState();
  const [isSeller, setIsSeller] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const [cart, setCart] = useState({}); // {id: quantity}

  // ❤️ NEW: Wishlist state
  const [wishlist, setWishlist] = useState([]);

  const [products, setProducts] = useState([]);




  const clearCart = () => {
  setCartItems({});
  localStorage.removeItem("cartItems");
};

  // --- Load logged-in user ---
  useEffect(() => {
    const loadUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setUserLoaded(true);
        return;
      }
      try {
        const { data } = await axios.post("/api/user/get-user", { userId });
        if (data.success) {
          localStorage.setItem("userId", data.user._id);
          setUser(data.user);
          setIsSeller(data.user.isSeller); // ← IMPORTANT
        }
      } catch (err) {
        console.error(err);
      } finally {
        setUserLoaded(true);
      }
    };
    loadUser();
  }, []);

  // --- Logout ---
  const logout = () => {
    localStorage.removeItem("userId");
    toast.success("Logged out");
    setUser(null);
    setIsSeller(false);
  };

  // --- Mock login for guest ---
  const mockLogin = () => {
    const id = crypto.randomUUID();
    setGuestId(id);
    setUser({ name: "Guest User", email: "guest@example.com", _id: id });
    toast.success("Logged in as Guest");
  };

  // --- Product Fetch ---
  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
        console.log("working");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  // ---------------- CART ----------------

  // const addToCart = (id) => {
  //   setCart((prev) => ({
  //     ...prev,
  //     [id]: (prev[id] || 0) + 1,
  //   }));
  // };

  const increaseQty = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      if (prev[id] === 1) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return {
        ...prev,
        [id]: prev[id] - 1,
      };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  // ---------------- ❤️ WISHLIST ----------------

  // const toggleWishlist = (id) => {
  //   setWishlist((prev) =>
  //     prev.includes(id)
  //       ? prev.filter((item) => item !== id) // remove
  //       : [...prev, id] // add
  //   );
  // };

  // ---------------- PROVIDER ----------------

  // --- CART (localStorage synced) ---
  const syncCartToLocal = (data) =>
    localStorage.setItem("cartItems", JSON.stringify(data));

  const loadCartFromLocal = () => {
    const stored = localStorage.getItem("cartItems");
    if (stored) setCartItems(JSON.parse(stored));
  };

const addToCart = (itemId, size = null, forceAdd = true) => {
  const idToUse = user?._id || guestId;

  const key = size ? `${itemId}-${size}` : itemId; // 🔥 IMPORTANT

  let cartData = { ...cartItems };

  if (cartData[key]) {
    if (forceAdd) cartData[key] += 1;
  } else {
    cartData[key] = 1;
  }

  setCartItems(cartData);
  localStorage.setItem("cartItems", JSON.stringify(cartData));

  axios
    .post("/api/cart/update", { userId: idToUse, cartItems: cartData })
    .catch(() => {});

  toast.success("Item added to cart");
};

 const updateCartQuantity = (key, quantity) => {
  let cartData = { ...cartItems };

  if (quantity <= 0) delete cartData[key];
  else cartData[key] = quantity;

  setCartItems(cartData);
  syncCartToLocal(cartData);
};

  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);


const getCartAmount = () => {
  let total = 0;

  for (const key in cartItems) {
    const [productId, size] = key.split("-");

    const product = products.find(
      (p) => p._id.toString() === productId
    );

    if (!product) continue;

    const price =
      size === "500ml"
        ? product.offerPrice
        : size === "100ml"
        ? Math.round(product.offerPrice / 2)
        : product.offerPrice;

    total += price * cartItems[key];
  }

  return total.toFixed(2);
};



  // --- Wishlist (localStorage synced) ---
  const toggleWishlist = (productId) => {
    let updated = [...wishlist];
    if (updated.includes(productId)) {
      updated = updated.filter((id) => id !== productId);
      toast.success("Removed from wishlist");
    } else {
      updated.push(productId);
      toast.success("Added to wishlist");
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const loadWishlistFromLocal = () => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  };

  // --- Init ---
  useEffect(() => {
    fetchProductData(); // fectching products
    loadCartFromLocal();
    loadWishlistFromLocal();
  }, []);





  return (
    <AppContext.Provider
    value={{
  user,
  setUser,
  cart,
  isSeller,
  setIsSeller,
  addToCart,
  increaseQty,
  decreaseQty,
  totalItems,
  products,
  fetchProductData,
  router,
  cartItems,
  setCartItems, // ✅ ADD THIS
  updateCartQuantity,
  getCartCount,
  getCartAmount,
  logout,
  wishlist,
  toggleWishlist,
  clearCart,
   userLoaded
}}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

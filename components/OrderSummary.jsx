
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useApp } from "../context/AppContext";

const OrderSummary = () => {
  const {
    router,
    user,
    cartItems,
    setCartItems,
    products,
    getCartAmount,
    currency,
  } = useApp();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Fetch customer addresses
  const fetchUserAddresses = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        toast.error("User not found. Please log in.");
        return;
      }

      const { data } = await axios.get(
        `/api/user/get-address?userId=${userId}`
      );

      if (data.success) {
        setUserAddresses(data.addresses || []);

        if (data.addresses?.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message || "Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Fetch addresses error:", error);
      toast.error(
        error.response?.data?.message || "Failed to load addresses"
      );
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  // Place Cash on Delivery order
  const createOrder = async () => {
    if (placingOrder) return;

    try {
      if (!selectedAddress) {
        return toast.error("Please select a delivery address");
      }

      const userId = localStorage.getItem("userId");

      if (!userId) {
        return toast.error("Please log in to place an order");
      }

      const cartItemsArray = Object.entries(cartItems)
        .map(([key, quantity]) => {
          const [productId, ...sizeParts] = key.split("-");
          const size = sizeParts.join("-") || "default";

          const productExists = products.find(
            (product) => product._id === productId
          );

          if (!productExists) {
            console.warn("Product no longer exists:", productId);
            return null;
          }

          return {
            product: productId,
            size,
            quantity: Number(quantity),
          };
        })
        .filter(
          (item) =>
            item &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );

      if (cartItemsArray.length === 0) {
        return toast.error("Your cart is empty");
      }

      setPlacingOrder(true);

      const { data } = await axios.post("/api/order/create", {
        userId,
        addressId: selectedAddress._id,
        items: cartItemsArray,
        paymentMethod: "COD",
      });

      if (!data.success) {
        toast.error(data.message || "Failed to place order");
        return;
      }

      toast.success("Order placed successfully!");

      if (data.emailsSent === false) {
        toast.error(
          "Order saved, but confirmation emails could not all be sent."
        );
      }

      setCartItems({});
      localStorage.removeItem("cartItems");

      router.push("/order-placed");
    } catch (error) {
      console.error("Place order error:", error);

      toast.error(
        error.response?.data?.message || "Unable to place your order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
  }, [user]);
  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>

      <hr className="border-gray-500/30 my-5" />

      {/* Address */}
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>

          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedAddress
                ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                : "Select Address"}

              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="#6B7280"
                fill="none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city},{" "}
                    {address.state}
                  </li>
                ))}

                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 text-center cursor-pointer"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        {/* Cart Summary */}
        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">
              Items {getCartAmount()}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">Included</p>
          </div>

          <div className="flex justify-between text-lg font-medium border-t pt-3">
            <p>Total</p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-[#009bf1] text-white py-3 mt-5 hover:bg-[#5589a5]"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;

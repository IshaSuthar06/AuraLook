"use client";

import { useApp } from "../context/AppContext";

import products from "../data/Product";

const CartPage = () => {
  const { cart, increaseQty, decreaseQty } = useApp();

  const cartItems = products.filter((p) => cart[p.id]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * cart[item.id],
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
          <p className="text-xl">🛒 Your cart is empty</p>
          <p className="text-sm mt-2">Add some products to get started</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Cart Items */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b last:border-none py-4"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-gray-500 text-sm">
                      ${item.price} each
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 text-lg"
                    >
                      -
                    </button>

                    <span className="px-3 font-medium">
                      {cart[item.id]}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 text-lg"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-semibold w-16 text-right">
                    ${item.price * cart[item.id]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-600">
              <span>Total</span>
              <span className="font-semibold text-black">
                ${totalPrice}
              </span>
            </div>

            <button className="w-full bg-[#1a9f82] text-white py-3 rounded-xl hover:opacity-90 transition">
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartPage;
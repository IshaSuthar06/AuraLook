"use client";

import ProductCard from "../../components/ProductCard";
import { useApp } from "../../context/AppContext";
import Image from "next/image";

const Page = () => {
  const { wishlist, products, toggleWishlist, addToCart } = useApp();

 const items = products.filter(p => wishlist.includes(p._id));

  return (
     <div className="px-6 md:px-16 lg:px-32 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
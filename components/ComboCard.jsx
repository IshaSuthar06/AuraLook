"use client"
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useApp } from "../context/AppContext";

const ComboCard = ({ product }) => {

  const { wishlist, router,toggleWishlist } = useApp();

  const isWishlisted = wishlist.includes(product._id);

  return (
    <div onClick={()=>{
      router.push("/product/"+ product._id);
     }} className="flex flex-col xl:w-[420px] md:w-[380px] rounded-2xl bg-white shadow-md">

      {/* Image */}
      <div className="w-full xl:h-[290px] md:h-[250px] relative bg-gray-100 rounded-t-2xl flex items-center justify-center">
        <img
          src={product.image[0]}
          className=" object-contain"
        />

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product._id);
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
        >
          {isWishlisted ? (
            <AiFillHeart className="text-red-500" size={20} />
          ) : (
            <AiOutlineHeart size={20} />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 px-4 py-2">
        <p className="text-sm text-[#7a767e]">{product.category}</p>
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-500 line-clamp-1">
          {product.description}
        </p>
      </div>

      {/* Bottom */}
      <div className="flex justify-between items-center px-4 py-3">
        <p className="text-base font-medium">₹ {product.price}</p>

        <button className="px-4 py-1.5 rounded-md text-xs bg-[#1a9f82] text-white hover:bg-[#4ca1cf]">
          View Combo
        </button>
      </div>
     

    </div>
  );
};

export default ComboCard;
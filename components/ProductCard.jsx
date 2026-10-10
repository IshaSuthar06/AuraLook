"use client"
import React from 'react'
import { CiShoppingCart } from 'react-icons/ci'
import { useApp } from '../context/AppContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { assets } from '../assets/juvenis-assets';
import Image from 'next/image';

const ProductCard = ({product}) => {

   const { cart, addToCart, increaseQty, decreaseQty,router, wishlist, toggleWishlist } = useApp();

  const isWishlisted = wishlist.includes(product._id);

  const quantity = cart[product.id] || 0;
  return (
    <div 
     onClick={()=>{
      router.push("/product/"+ product._id);
     }} className='flex flex-col w-72 rounded-2xl bg-white shadow-md  '> 
      
      {/* Image */}
      <div className='w-full h-72 overflow-hidden rounded-t-2xl relative'> 
        <img 
          src={product.image[0]} 
          className='w-full h-full object-cover'
        />
        <button
              onClick={(e) => {
                e.stopPropagation();
              toggleWishlist(product._id);

           
            }}
        className='absolute top-3 right-3 bg-white p-2 rounded-full shadow'
  >
    {isWishlisted ? (
      <AiFillHeart className='text-red-500' size={20} />
    ) : (
      <AiOutlineHeart size={20} />
    )}
  </button>
  {product.stock <= 0 ? (
          <div className="absolute top-1 left-1 text-xs bg-white px-2 py-0.5 w-auto h-6 shadow-md rounded-md flex items-center justify-center whitespace-nowrap">
            <div>out of stock</div>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className='flex flex-col gap-1 px-4 py-2'> 
        <p className='text-sm text-[#7a767e]'>{product.category}</p>
        <h2 className='text-lg font-semibold'>{product.name}</h2>
        <p className='w-full text-sm text-gray-500 max-sm:hidden overflow-hidden whitespace-nowrap text-ellipsis'>
         {product.description}
        </p>
        <div className="flex items-center gap-2">
        <p className="text-xs">{4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-4 w-4"
              src={
                index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon
              }
              alt="star_icon"
            />
          ))}
        </div>
      </div>
      </div>

   

      {/* Bottom */}
      <div className='flex justify-between items-center px-4 py-3'>
        <p className="text-base font-medium">Rs {product.offerPrice}</p>

        <button
          className={`px-4 py-1.5 rounded-md border border-gray-500/20 md:rounded-full text-xs transition ${
            product.stock <= 0
              ? "bg-gray-200 text-gray-700 cursor-not-allowed"
              : "bg-[#1a9f82] text-white hover:bg-[#4ca1cf]"
          }`}
          disabled={product.stock <= 0} // disable if stock <= 0
        >
          Buy now
        </button>
        
      </div>

    </div>
  )
}

export default ProductCard
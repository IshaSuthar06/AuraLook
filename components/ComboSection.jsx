"use client"
import React from "react";
import ComboCard from "./ComboCard";
import { useApp } from "../context/AppContext";

const ComboSection = () => {
    const {products}= useApp()

  return (
   
     <div className='flex flex-col justify-center items-center py-10 px-5'>
    <div className='text-center'>
        <h1 className='text-2xl md:text-4xl font-semibold'> FEATURED  COMBO PRODUCTS</h1>
    </div>
        <div className='flex flex-wrap gap-8 justify-center items-center py-10'>
           { products.filter((p) => p?.type === "combo")
           .map((product) => (
    <ComboCard key={product._id} product={product} />
  ))}
        </div>
                
        </div>
  );
};

export default ComboSection;
"use client";
import { Suspense, useEffect, useState } from "react";
import { assets } from "../../../assets/juvenis-assets";
import ProductCard from "../../../components/ProductCard";


import Image from "next/image";
import { useParams } from "next/navigation";

import { useApp } from "../../../context/AppContext";
import React from "react";
import axios from "axios";
import FAQ from "../../../components/FAQ";
import ProductExtraDetails from "../../../components/ProductExtraDetails";

const Product = () => {
  const { id } = useParams();
  const { products, router, addToCart } = useApp();
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState("500ml");
  const selectedSizeData = productData?.sizes?.find(
  (s) => s.label === selectedSize
);

  // notify button
  const [showForm, setShowForm] = useState(false);
const [email, setEmail] = useState("");

const handleNotify = async () => {
  try {
    const { data } = await axios.post("/api/notify", {
      email,
      productId: productData._id,
    });

    alert(data.message);
    setShowForm(false);
    setEmail("");

  } catch (err) {
    console.log(err);
  }
};

  const [mainImage, setMainImage] = useState(null);
  const [related, setRelated] = useState([]);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  useEffect(() => {
    if (products.length > 0 && productData) {
      let productCopy = products.filter(
        (item) => item.category === productData.category && item._id !== productData._id
      );
      setRelated(productCopy.slice(0, 5));
    }
  }, [products, productData]);

  return productData ? (
    <>
      
      <div className="px-6 md:px-8 lg:px-10 md:pt-8 pt-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left - Images */}
          <div className="px-6 lg:px-8 xl:px-10">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={mainImage || productData.image[0]}
                alt={productData.name}
                width={550}
                height={550}
                className="w-full h-auto object-cover mix-blend-multiply"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={image}
                    alt={`product-${index}`}
                    width={200}
                    height={200}
                    className="w-full h-auto object-cover mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4 capitalize">
              {productData.name}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                <Image className="h-4 w-4" src={assets.star_dull_icon} alt="star_dull_icon" />
              </div>
              <p>(4.5)</p>
            </div>
 <div className="overflow-x-auto pt-5">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 mt-3">{productData.description}</p>
            <hr className="bg-gray-600 my-6" />

           
            <div className="flex gap-8 py-2">
              <div className="flex flex-col gap-2">

                <div className="flex items-center gap-2">
                <img className="w-10 " src="/avif/Boosts__metabolism.avif"/> <h2 className="text-gray-600 font-medium">Boosts metabolism</h2>
                </div>

                <div className="flex items-center gap-2">
                <img className="w-10" src="/avif/Helps_soothe_and__calm_the_gut.avif"/>
                <h2 className="text-gray-600 font-medium">Helps soothe and calm the gut</h2>
                </div>

              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                <img className="w-10" src="/avif/Improves__digestion.avif"/><h2 className="text-gray-600 font-medium">Improves digestion</h2>
                </div>

                <div className="flex items-center gap-2">
                <img className="w-10" src="/avif/Manages__Inflammation.avif"/><h2 className="text-gray-600 font-medium">Manages Inflammation</h2>
                 </div>
              </div>

            </div>

            <p className="text-3xl font-medium mt-6">
  Rs {selectedSizeData?.offerPrice || productData.offerPrice}
  <span className="text-base font-normal text-gray-800/60 line-through ml-2">
    Rs {selectedSizeData?.price || productData.price}
  </span>
</p>

            {/* Stock Status */}
            <div className="flex items-center justify-between mt-4">
              {productData.stock <= 0 ? (
                <span className="text-red-600 font-bold">Out of Stock</span>
              ) : (
                <span className="text-green-600 font-semibold">In Stock</span>
              )}
            </div>

{/* size */}
       {productData?.sizes?.length > 0 && (
  <div className="mt-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">
      Select Size
    </h2>

    <div className="flex gap-4 flex-wrap">
      {productData.sizes.map((s) => {
        const isActive = selectedSize === s.label;

        return (
          <button
            key={s.label}
            onClick={() => setSelectedSize(s.label)}
            className={`w-52 rounded-xl border overflow-hidden transition-all duration-200 bg-white
              ${isActive
                ? "border-[#1a9f82] shadow-lg scale-105"
                : "border-gray-200 hover:border-[#1a9f82]"
              }
            `}
          >
            {/* Image (medium size) */}
            <div className="bg-gray-100 flex items-center justify-center h-32">
              {s.image ? (
                <img
                  src={s.image}
                  alt={s.label}
                  className="h-32 object-contain"
                />
              ) : (
                <span className="text-xs text-gray-400">No Image</span>
              )}
            </div>

            {/* Content */}
            <div className="p-2 text-center flex flex-col gap-1">
              
              {/* Prices in same line */}
              <div className="flex justify-center items-center gap-2">
                <span className="text-sm font-semibold text-[#1a9f82]">
                  ₹{s.offerPrice}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{s.price}
                </span>
              </div>

              {/* Size below */}
              <span className="text-xs font-medium text-gray-700">
                {s.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  </div>
)}


            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() =>addToCart(
    productData._id,
    productData.sizes?.length ? selectedSize : null
  )}
                disabled={productData.stock <= 0}
                className={`w-full py-3.5 ${
                  productData.stock <= 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                }`}
              >
                Add to Cart
              </button>
{/* to dooooooooooo */}
              <button 
  onClick={() => {
    if (productData.stock <= 0) {
      setShowForm(true); // ✅ open form
    } else {
      addToCart(productData._id, selectedSize, false);
      router.push("/cart");
    }
  }}
  className="w-full py-3.5 bg-[#1a9f82] text-white hover:bg-[#0f6e5a] transition"
>
  {productData.stock <= 0 ? "Notify Me" : "Buy Now"}
</button>
            </div>
          </div>
        </div>

        {/* BANNER */}
        {productData.banners?.length >0 && (

        <div className="sm:w-full md:w-[1024px] lg:w-[1300px] xl:w-full gap-2 flex flex-col">
          {productData.banners.map((banner,index)=>(

          <img key={index} src={banner} alt={`banner-${index}`} className="w-full h-full "/>
          ))}
          {/* <img src="/Banner/Natural-detox-juice-(500ml)-Banner-02.jpg" className="w-full h-full "/> */}
        </div>
        )}
       <ProductExtraDetails product={productData}/>
       <FAQ/>

        {/* Related Products */}
        <div className="flex flex-col  gap-5">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-4xl font-medium">
              Related <span className="font-medium text-[#1a9f82]">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-[#1a9f82] mt-2"></div>
          </div>
       
          <div className="flex gap-10 flex-col md:flex-row">
            {related.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <div className="flex  justify-center py-10">
          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See more
          </button>
          </div>

           </div>
        </div>


    
      {showForm && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-80">
      <h2 className="text-lg font-semibold mb-4">Notify Me</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />
      

      <div className="flex justify-between">
        <button
          onClick={handleNotify}
          className="bg-[#009bf1] text-white px-4 py-2 rounded"
        >
          Submit
        </button>

        <button
          onClick={() => setShowForm(false)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </>
  ) : (
   <>
   </>
  );
};

export default Product;

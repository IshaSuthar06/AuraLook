"use client";
import React from "react";
import FAQ from "./FAQ";

const ProductExtraDetails = ({ product }) => {
  return (
    <div className="space-y-16  pt-5 md:pt-10  justify-center  flex flex-col">

      {/* ================= BENEFITS ================= */}
      {product?.benefits?.length > 0 && (
     
        <section>
          <h2 className="text-3xl font-semibold text-center">Top Benefits</h2>

          <div className="flex flex-col md:flex-row  py-10 gap-6 justify-center items-center">
            {product.benefits.map((item, i) => (
              <div key={i} className="text-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className=" mx-auto pb-2 rounded-2xl"
                />
                <p className="text-xl text-gray-700 capitalize font-sans">{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= DIRECTIONS ================= */}
      {product?.directions?.length > 0 && (
        <section className="flex flex-col justify-center ">
          <h2 className="text-3xl font-semibold text-center ">Direction to Use</h2>

          <ul className="list-disc space-y-2 p-10 flex flex-col  ">
         
               
            {product.directions.map((item, i) => (
            
              <li key={i} className="text-gray-600 text-2xl font-arimo capitalize">
                {item.step}
              </li>
   
            ))}
       
           </ul>
        </section>
      )}

      {/* ================= INGREDIENTS ================= */}
      {product?.ingredients?.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold text-center">What's Insides ?</h2>

          <div className="flex flex-col md:flex-row  gap-6 justify-center items-center">
            {product.ingredients.map((item, i) => (
              <div key={i} className="text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className=" mx-auto pb-1"
                />
                <p className="text-xl text-gray-700 uppercase">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= FAQ ================= */}
      {product?.faqs?.length > 0 && (
        <section>
          <FAQ faqs={product.faqs} />
        </section>
      )}
    </div>
  );
};

export default ProductExtraDetails;
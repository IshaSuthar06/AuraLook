"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "./ProductCard"

import { useApp } from "../context/AppContext"

const ProductsClient = () => {
const {products}= useApp()
  const [sortType,setSortType]=useState('relevant')
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const [categories, setCategories] = useState([])

  const toggleCategory = (value) => {
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  // 🔥 COMBINED FILTER (SEARCH + CATEGORY)
 const filteredProducts = products.filter((item) => {
  const matchesSearch = item.name
    .toLowerCase()
    .includes(searchQuery.toLowerCase())

  const matchesCategory =
    categories.length === 0 ||
    categories.some(
      (cat) =>
        cat.toLowerCase().trim() === item.category.toLowerCase().trim()
    );

    const isNormal = item.type !== "combo"

  return matchesSearch && matchesCategory && isNormal
})

const sortedProducts = [...filteredProducts].sort((a, b) => {
  const priceA = Number(a.price)
  const priceB = Number(b.price)

  if (sortType === "Low-High") return priceA - priceB
  if (sortType === "High-Low") return priceB - priceA
  return 0
})
  
  

  return (
  


    <div className='flex px-10 gap-8 py-10 flex-col md:flex-row'>

   

      {/* FILTER */}
      <div className='flex flex-col gap-2 w-[280px]'>
        <h2 className='text-xl'>Filter</h2>

        <div className='px-5 py-4 flex flex-col gap-3 border border-black'>
          <h2 className='text-sm font-medium'>CATEGORIES</h2>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {['Detox','Pain Relief','Energy and Performance'].map((category) => (
              <label key={category} className='flex gap-2'>
                <input
                  type='checkbox'
                  checked={categories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className='flex flex-col gap-3  w-full'>
     
             <div className="flex justify-between mb-4 gap-5 items-center">
          <div className="w-[80%]">
            <p className="text-lg md:text-2xl font-medium">All Products</p>
            <div className="w-16 h-0.5 bg-[#1a9f82] rounded-full"></div>
          </div> 

          <select
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className="border-2 flex-1 border-gray-300 text-sm p-0 md:px-2 py-1 rounded "
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="Low-High">Sort by: Low to High</option>
            <option value="High-Low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-8">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-white">No products found</p>
        )}
      </div>
        
      </div>

    </div>
    
  
  )
}

export default ProductsClient;
"use client"
import React from 'react'

import Feature from '../Feature'
import ProductCard from './ProductCard'
import { useApp } from '../context/AppContext'


const FeaturedProduct = () => {
    const {products} = useApp()
  return (
    <div className='flex flex-col justify-center items-center py-10 px-5'>
<div className='text-center'>
    <h1 className='text-2xl md:text-4xl font-semibold'> FEATURED PRODUCTS</h1>
</div>
    <div className='flex flex-wrap gap-8 justify-center items-center py-10'>
        {products.map((product)=>(
            <ProductCard key={product._id} product={product} />

        ))}
    </div>
            
    </div>
  )
}

export default FeaturedProduct

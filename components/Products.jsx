"use client"


import products from '../data/Product'
import { useRouter } from 'next/navigation'
import ProductCard from './ProductCard'
import { useApp } from '../context/AppContext'

const Products = () => {
  const router = useRouter()
  const {products}= useApp()

  return (
    <div className='flex flex-col justify-center items-center bg-gray-100 p-10'>

      <div className='flex items-center flex-col gap-2'>
      <h1 className='text-3xl  font-semibold '>OUR PRODUCTS</h1>
      <p className='text-[#7a767e] text-center'>Browse our wide range of certified pharmaceutical products and health essentials.</p>
      </div>

      <div className='flex flex-wrap gap-8 px-4 py-10 justify-center items-center '>
        {products.filter((p) => p?.type !==  "combo").map((product)=>(
          
          <ProductCard key={product._id} product={product}/>
      
        ))}
 
      </div>
    </div>
  )
}

export default Products

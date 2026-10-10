"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { CiHeart, CiSearch, CiShoppingCart } from 'react-icons/ci'
import { useRouter } from 'next/navigation'



const Navbar = () => {
  const [mobileOpen,setMobileOpen]=useState(false)

    const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (value) => {
    setQuery(value)
    router.push(`/products?search=${value}`)
  }
  return (
    <div className='flex justify-between items-center p-2'>

      {/* left side */}
    <div className='p-2'>
<Image src="/Aryan_Shakti_Logo.png" alt="logo" width={80} height={40} />
    </div>

{/* middle */}
       <div className='flex gap-10 '>
        <Link href="/">HOME</Link>
        <Link href="/products">SHOP</Link>
        <Link href="/about-us">ABOUT US</Link>
        <Link href="/contact-us">CONTACT </Link>
       </div>

{/* right side  */}
  <div className='flex items-center gap-6 relative pr-5'>

  {/* Search Icon */}
  <div className='flex relative justify-center items-center '>

 
  <CiSearch
    size={25}
    onClick={() => setShowSearch(!showSearch)}
    className="absolute cursor-pointer right-3"
  />

  {/* Search Input (INLINE) */}
  {showSearch && (
    <input
      autoFocus
      type="text"
      value={query}
      onChange={(e) => handleSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/products?search=${query}`)
        }
      }}
      placeholder="Search products..."
      className='border px-3 py-1 rounded-full outline-none w-48 bg-white shadow-md transition-all'
    />
  )}
 </div>
  <CiHeart size={25}/>
  <CiShoppingCart size={25}/>
  
</div>
    
    </div>
  )
}

export default Navbar

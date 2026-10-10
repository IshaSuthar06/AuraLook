"use client"
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { CiHeart, CiSearch, CiShoppingCart } from 'react-icons/ci'
import { Menu, X, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState("")

  const router = useRouter()
  const menuRef = useRef(null)

  // ✅ FIX DROPDOWN STUCK ISSUE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = () => {
    router.push(`/products?search=${query}`)
    setMobileOpen(false)
  }

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div className='hidden md:flex justify-between items-center p-4 border-b'>

        {/* LEFT */}
        <Image src="/Aryan_Shakti_Logo.png" alt="logo" width={80} height={40} />

        {/* CENTER */}
        <div className='flex gap-10'>
          <Link href="/">HOME</Link>
          <Link href="/products">SHOP</Link>
          <Link href="/about-us">ABOUT US</Link>
          <Link href="/contact-us">CONTACT</Link>
        </div>

        {/* RIGHT */}
        <div className='flex items-center gap-6'>

          {/* SEARCH */}
          <div className='flex items-center border px-3 py-1 rounded-full'>
            <CiSearch size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search..."
              className='outline-none px-2'
            />
          </div>

          <CiHeart size={25} />
          <CiShoppingCart size={25} />

          {/* PROFILE */}
          <div className="relative" ref={menuRef}>
            <User
              size={25}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen(prev => !prev)
              }}
            />

            {menuOpen && (
              <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-lg w-48 p-3 z-50">
                {[
                  { label: "Home", path: "/" },
                  { label: "Products", path: "/products" },
                  { label: "Cart", path: "/cart" },
                  { label: "Wishlist", path: "/wishlist" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="py-2 px-2 hover:bg-gray-100 cursor-pointer rounded"
                    onClick={() => {
                      router.push(item.path)
                      setMenuOpen(false)
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">

        {/* LEFT: MENU */}
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* CENTER: LOGO */}
        <Image
          src="/Aryan_Shakti_Logo.png"
          alt="logo"
          width={80}
          height={40}
          onClick={() => router.push("/")}
          className="cursor-pointer"
        />

        {/* RIGHT: PROFILE */}
        <div className="relative" ref={menuRef}>
          <User
            size={25}
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen(prev => !prev)
            }}
            className="cursor-pointer"
          />

          {menuOpen && (
            <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-lg w-48 p-3 z-50">
              {[
                { label: "Home", path: "/" },
                { label: "Products", path: "/products" },
                { label: "Cart", path: "/cart" },
                { label: "Wishlist", path: "/wishlist" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="py-2 px-2 hover:bg-gray-100 cursor-pointer rounded"
                  onClick={() => {
                    router.push(item.path)
                    setMenuOpen(false)
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 flex flex-col gap-4">

          {/* SEARCH */}
          <div className='flex items-center border px-3 py-2 rounded-lg'>
            <CiSearch size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search products..."
              className='outline-none px-2 w-full'
            />
          </div>

          {/* LINKS */}
          <Link href="/" onClick={() => setMobileOpen(false)}>HOME</Link>
          <Link href="/products" onClick={() => setMobileOpen(false)}>SHOP</Link>
          <Link href="/about-us" onClick={() => setMobileOpen(false)}>ABOUT</Link>
          <Link href="/contact-us" onClick={() => setMobileOpen(false)}>CONTACT</Link>

        </div>
      )}
    </>
  )
}

export default Navbar
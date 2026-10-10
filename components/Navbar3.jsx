"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { Heart, HomeIcon, Menu, X, User, ShoppingCart } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { useApp } from "../context/AppContext";
import { assets } from "../assets/juvenis-assets";


export default function Navbar3() {
 
 const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState("")


  const handleSearch = (value) => {
    setQuery(value)
    router.push(`/products?search=${value}`)
  }
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const routerNext = useRouter();

  const {totalItems,user,logout,router}=useApp()
  
const isSeller = user?.isSeller;
  const [showModal, setShowModal] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <nav className=" flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 sticky top-0 z-50 bg-white shadow">
        <Image
          className="hidden md:block cursor-pointer"
          onClick={() => routerNext.push("/")} 
           width={80}
          height={40}
          src="/Aryan_Shakti_Logo.png"
          alt="logo"
        />

    {/* Navigation Links */}
<div className="flex items-center gap-6 max-md:hidden ">
  <Link
    href="/"
    className="relative group text-gray-700 hover:text-[#1a9f82] transition"
  >
    Home
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1a9f82] transition-all duration-300 group-hover:w-full"></span>
  </Link>

<div className="relative group">

  <Link
    href="/products"
    className="relative group text-gray-700 hover:text-[#1a9f82] transition"
  >
    Shop
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1a9f82] transition-all duration-300 group-hover:w-full"></span>
  </Link>
  {/* DROPDOWN */}
    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[400px] bg-white shadow-xl rounded-lg p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">

      <div className="flex flex-wrap justify-between gap-2">

        {/* CATEGORY ITEM */}
        <Link href="products" className="group w-[150px] text-center">
          <img
            src="/catagory7.webp"
            alt="Men"
            className="w-full h-28 object-cover rounded-md group-hover:scale-105 transition"
          />
          <p className="mt-2 text-sm font-medium group-hover:text-[#1a9f82]">
          Pills
          </p>
        </Link>

        <Link href="/products" className="group w-[150px] text-center">
          <img
            src="/category-images/health-juices.jpg"
            alt="Women"
            className="w-full h-28 object-cover rounded-md group-hover:scale-105 transition"
          />
          <p className="mt-2 text-sm font-medium group-hover:text-[#1a9f82]">
            Healthy Juices
          </p>
        </Link>

        <Link href="/products" className="group w-[150px] text-center">
          <img
            src="/category-images/Gut-Health-and-Digestion.jpg"
            alt="Kids"
            className="w-full h-28 object-cover rounded-md group-hover:scale-105 transition"
          />
          <p className="mt-2 text-sm font-medium group-hover:text-[#1a9f82]">
           Detox
          </p>
        </Link>

        <Link href="/products" className="group w-[150px] text-center">
          <img
            src="/category-images/Energy-and-Performance.jpg"
            alt="Accessories"
            className="w-full h-28 object-cover rounded-md group-hover:scale-105 transition"
          />
          <p className="mt-2 text-sm font-medium group-hover:text-[#1a9f82]">
          Men Health
          </p>
        </Link>
   
    {/* NEW BULK ORDER ITEM */}
 <button
        onClick={() => router.push("/bulk-order")}
        className="group w-[150px] text-center"
      >
        <img
          src="/1187767.jpg"
          alt="Bulk Order"
          className="w-full h-28 object-cover rounded-md group-hover:scale-105 transition"
        />
        <p className="mt-2 text-sm font-medium group-hover:text-[#1a9f82]">
          Bulk Order
        </p>
      </button>

   

      </div>
  

    </div>

</div>

<Link href="/combo" 
className="relative group text-gray-700 hover:text-[#1a9f82] transition">
 Combo
  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1a9f82] transition-all duration-300 group-hover:w-full"></span>
</Link>

  <Link
    href="/about-us"
    className="relative group text-gray-700 hover:text-[#1a9f82] transition"
  >
    About Us
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1a9f82] transition-all duration-300 group-hover:w-full"></span>
  </Link>

  <Link
    href="/contact-us"
    className="relative group text-gray-700 hover:text-[#1a9f82] transition"
  >
    Contact
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1a9f82] transition-all duration-300 group-hover:w-full"></span>
  </Link>

  <Link
    href="/blog"
    className="relative group text-gray-700 hover:text-[#1a9f82] transition"
  >
    Blog
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1a9f82] transition-all duration-300 group-hover:w-full"></span>
  </Link>

  {/* {isSeller && (
  <button
    onClick={() => router.push("/seller")}
    className="text-xs border px-4 py-1.5 rounded-full"
  >
    Seller Dashboard
  </button>
)} */}

</div>


        {/* Search + Icons */}
        <ul className="hidden md:flex items-center gap-4">
          <div className="flex items-center border rounded-full px-3 py-1">
            <Image className="w-4 h-4" src={assets.search_icon} alt="search icon"
            width={4} height={4} />
            <input
            autoFocus
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/products?search=${query}`)
        }
      }} placeholder="Search products..."
              className="outline-none px-2 py-1 text-sm"
            />
          </div>

          <button onClick={() => routerNext.push("/wishlist")}>
            <Image className="w-4 h-4" src={assets.heart_icon} alt="heart_icon" width={4} height={4} />
          </button>

          <div className="relative">
  <button
    onClick={() => routerNext.push("/cart")}
    className="flex items-center gap-2 hover:text-gray-900 transition"
  >
    <ShoppingCart size={20} />
  </button>

  {totalItems > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
      {totalItems}
    </span>
  )}
</div>

          {/* Custom Dropdown Menu */}
          <div className="relative">
            <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="flex items-center gap-2 hover:text-gray-900 transition"
>
  <User size={20} />

  {user ? user.name : "Account"}
</button>



  {menuOpen && (
  <div
    className="absolute right-0 mt-3 bg-white shadow-xl rounded-lg w-52 p-3 border border-gray-200 z-50 "
    style={{
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
    }}
  >
    {[
      { label: "Home", path: "/" },
      { label: "Products", path: "/products" },
      { label: "Cart", path: "/cart" },
      { label: "My Orders", path: "/my-orders" },
      { label: "Wishlist", path: "/wishlist" },
    ].map((item, i) => (
      <button
        key={i}
        onClick={() => {
          routerNext.push(item.path);
          setMenuOpen(false);
        }}
        className="flex items-center gap-2 w-full text-left py-2 px-2 hover:bg-gray-100 rounded-md transition"
      >
        {item.label}
      </button>
    ))}

    <hr className="my-2 border-gray-300" />

    {user ? (
      <button
        onClick={() => {
          logout();
          setMenuOpen(false);
        }}
        className="w-full py-2 px-2 text-red-600 hover:bg-red-50 rounded-md transition"
      >
        Logout
      </button>
    ) : (
      <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
    )}
  </div>
)}

          </div>
        </ul>

        {/* Mobile Navbar */}
      
      </nav>
      <div className="md:hidden relative flex items-center justify-between py-3 px-4 bg-white gap-10 border-b border-gray-300 sticky top-0 z-50">
      
      {/* LEFT: Hamburger Drawer */}
      <button onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* CENTER: Logo */}
       <Image
          className=" md:hidden  cursor-pointer"
          onClick={() => router.push("/")}
           width={80}
          height={40}
          src="/Aryan_Shakti_Logo.png"
          alt="logo"
        />

      {/* RIGHT: User Menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 hover:text-gray-900 transition"
        >
          <User size={20} />
       user   {user ? user.name : "Account"}
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-lg w-52 p-3 border border-gray-200 z-50">
            {[
              { label: "Home", path: "/" },
              { label: "Products", path: "/products" },
              { label: "Cart", path: "/cart" },
              { label: "My Orders", path: "/my-orders" },
              { label: "Wishlist", path: "/wishlist" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  routerNext.push(item.path);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left py-2 px-2 hover:bg-gray-100 rounded-md transition"
              >
                {item.label}
              </button>
            ))}

            <hr className="my-2 border-gray-300" />
user
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full py-2 px-2 text-red-600 hover:bg-red-50 rounded-md transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  router.push("/login");
                  setMenuOpen(false);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>

      {/* LEFT DRAWER CONTENT */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white  shadow-md flex flex-col gap-4 px-6 py-4 z-50">
          
          {/* Search Bar */}
          <div className="flex items-center border rounded-lg px-3 py-1">
            <Image
              className="w-4 h-4"
              src="/search_icon.svg"
              alt="search icon"
              width={16}
              height={16}
            />
            <input
              type="text"
              value={query}
              onChange={(e)=>handleSearch(e.target.value)}
              onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/products?search=${query}`)
        }
      }}
              placeholder="Search products..."
              className="outline-none px-2 py-1 text-sm w-full"
            />
          </div>

          {/* Navigation Links */}
          <Link href="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/products" onClick={() => setMobileOpen(false)}>
            Shop
          </Link>
          <Link href="/about-us" onClick={() => setMobileOpen(false)}>
            About Us
          </Link>
          <Link href="/contact-us" onClick={() => setMobileOpen(false)}>
            Contact
          </Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)}>
            Blog
          </Link>

          {/* Seller Dashboard */}
          seller
          {isSeller && (
            <button
              onClick={() => {
                router.push("/seller");
                setMobileOpen(false);
              }}
              className="text-md px-2 py-2 border rounded-lg mt-2"
            >
              Seller Dashboard
            </button>
          )}
        </div>
      )}
    </div>
      
    </Suspense>
  );
}

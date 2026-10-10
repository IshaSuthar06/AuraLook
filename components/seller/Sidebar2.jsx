'use client'

import Link from 'next/link'

const Sidebar2 = () => {
  return (
    <div className="w-64 min-h-screen bg-red-500 text-white">
      <Link href="/seller">Add Product</Link>
      <br />
      <Link href="/seller/product-list">Product List</Link>
    </div>
  )
}

export default Sidebar2
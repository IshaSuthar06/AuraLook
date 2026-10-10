import Link from 'next/link'
import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { FaFacebook, FaPhoneAlt } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io'

const Footer = () => {
  return (
    <div className=' flex flex-col gap-10 md:flex-row justify-between py-20 px-10 bg-[#154313] text-white'>

      <div className='flex flex-col gap-2'>
        <h1 className='text-lg'>AryanShakti</h1>
        <p>Your trusted online pharmacy. Quality medicines and health products delivered with care.</p>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className='text-lg'>Quick Links</h1>
        <div className='flex flex-col'>
        <Link href="">About Us</Link>
        <Link href=""> Products</Link>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className='text-lg'>Categories</h1>
        <div className='flex flex-col'>
        <Link href="">Pain Relief</Link>
        <Link href="">Vitamins</Link>
        <Link href="">Skin Care</Link>
        <Link href="">Supplements</Link>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className='text-lg'>Contact</h1>
        <div className='flex flex-col gap-1'>
            
        <Link href="tel:+91 83799 77555" className="flex items-center gap-1 text-inherit "
        >
            <FaPhoneAlt /> +91 83799 77555
        </Link>

        <Link
          href="mailto:info@AryanShakti.com"
          className="flex items-center gap-1 text-inherit"
        >
         <IoIosMail />
          info@AryanShakti.com
        </Link>
        <Link
          href="mailto:getyoung@juvenis.in"
          className="flex items-center gap-1 text-inherit"
        >
         <FaFacebook />
          aryanshakti
        </Link>
        <Link
          href="mailto:getyoung@juvenis.in"
          className="flex items-center gap-1 text-inherit"
        >
         <BsInstagram />
          aryanshakti
        </Link>
        </div>
        
      </div>
    </div>
  )
}

export default Footer

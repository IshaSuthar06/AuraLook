import React from 'react'
import Slider from '../components/Slider'
import Navbar from '../components/Navbar'
import Product from '../components/ProductCard'
import Products from '../components/Products'
import Footer from '../components/Footer'
import Navbar2 from '../components/Navbar2'
import Navbar3 from '../components/Navbar3'
import Catagories from '../components/Catagories'
import FeaturedProduct from '../components/FeaturedProduct'
import MiddleBanner from '../components/MiddleBanner'
import ServiceDisplay from '../components/ServiceDisplay'
import InstaReel from '../components/InstaReel'
import DisplayReel from '../components/DisplayReel'
import Review from '../components/Review'
import NaturalProduct from '../components/NaturalProduct'
import BlogSection from '../components/BlogSection'
import AwardSection from '../components/AwardSection'
import Slide from '../components/Slide'
import Certification from '../components/Certification'
import ComboSection from '../components/ComboSection'


const page = () => {
  return (
    <div>
 
     {/* <Slider/> */}
     <Slide/>
     <Catagories/>
     <ComboSection/>
     {/* <FeaturedProduct/> */}
     <MiddleBanner/>
     <ServiceDisplay/>
   
<Products/>
<DisplayReel/>
<NaturalProduct/>
<Review/>
<AwardSection/>
<BlogSection/>
<Certification/>


    </div>
  )
}

export default page

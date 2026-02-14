"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
const ProductCollections = () => {
    const [allproducts,setallproducts]=useState([]);
    const productdata=async()=>{
        const response=await fetch("https://resort-booking-beige.vercel.app/api/admin/add-product");
        const result=await response.json();
        setallproducts(result.data);
        console.log(result);
    }
    useEffect(()=>{
        productdata();
    },[]);
  return (
    <div>
      <h1 className='main-title'>Select Your Stay</h1>
      {allproducts&&allproducts.map((item,index)=>{
        return(
          <div key={index} className='product-card'>
            <div className='title-card'>
              <p>{item.title}</p>
              <Image src={item.image} alt="image" width={200} height={150} className='room-img'/>
            </div>
            <div>
              <h2>{item.price}</h2>
              <h3>Amenitites</h3>
              <div className='amen-card'>
                {item.amenities.map((amen,index)=>(
                <div key={index}>
                  <div>{amen}</div>
                </div>
              ))}
              </div>
            </div>
              <Link href={`/detail/${item._id}`}><button className='details-btn'>Details</button></Link>
          </div>
        )
      })}
    </div>
  )
}

export default ProductCollections

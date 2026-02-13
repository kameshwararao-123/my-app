"use client"
import Link from 'next/link'
import React from 'react'
import {orderAction} from '../ServerActions/orderAcion';
const Navbar = ({username,userId}) => {
  const bookinghandler=async()=>{
    try {
      await orderAction();
    } catch (error) {
      
    }
  }
  return (
    <div className='navcontainer'>
      <h3>Holiday Resort</h3>
      <div className='arrange'>
        <p>Call now :</p>
        <p>123-456-789</p>
      </div>
      <Link href={`/orders/${userId}`}><p style={{color:"white"}}>Bookings</p></Link>
      <div className='arrange'>
        <p>Welcome :</p>
        <p>{username}</p>
      </div>
      <Link href={'/api/auth/signout'}><p className='logoutbutton'>Logout</p></Link>
    </div>
  )
}

export default Navbar

"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import CalenderComponent from '../../../components/CalenderComponent';
import Link from 'next/link';
import { bookingAction } from '../../../ServerActions/bookingAction';
const AboutPouduct = () => {
  const [record, setrecord] = useState();
  const [seleceddates, setselecteddates] = useState(null);
  const params = useParams();
  const { id } = params;
  const fetchdata = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/product/${id}`);
    const result = await res.json();
    console.log(result.data);
    if (result.success) {
      setrecord(result.data);
    }
  }
  useEffect(() => {
    if (id) {
      fetchdata();
    }
  }, [id]);
  const handleselectdates = (dates) => {
    setselecteddates(dates);
    console.log("the dates came from calander:", dates);
  }
  const bookinghandler=async()=>{
      if(!seleceddates){
        alert("please select dates");
        return;
      }
      const bookingDetails={record,seleceddates};
      console.log("the booking details:",record);
      try {
         const res=await bookingAction(bookingDetails);
         if(res.success){
          alert("booking successful");
         }
         else{
           alert("booking failed");
         }
         
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <div>
      <Navbar />
      <Link href={'/'} align=''>
        <h2>Go Back</h2>
      </Link>
      <CalenderComponent onDatesSelect={handleselectdates} />
      {record && (
        <div className="resort-details">

          {/* Image */}
          <div className="hero">
            <img src={record.image} alt={record.title} />
          </div>

          <div className="container">

            {/* Left */}
            <div className="details">
              <h1>{record.title}</h1>
              <p className="description">{record.description}</p>

              <h3>Amenities</h3>
              <ul className="amenities">
                {record.amenities?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Right */}
            <div className="booking">
              <h2>₹{record.price} <span>/ Day</span></h2>
              {record.offer && <p className="offer">{`Discount:${record.offer}% OFF`}</p>}
              <button className="book-btn" onClick={bookinghandler}>Book Now</button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default AboutPouduct

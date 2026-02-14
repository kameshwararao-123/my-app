"use client";
import React, { useState } from "react";

const ResortForm = () => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [amenities, setAmenities] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = {
      title,
      price,
      offer,
      amenities,
      description,
      image
    };

    console.log(formData);
    const data=new FormData();
    data.append('title',title);
    data.append('amenities',amenities);
    data.append('offer',offer);
    data.append('price',price);
    data.append('description',description);
    data.append('image',image);
    try {
       const response=await fetch("https://resort-booking-beige.vercel.app/api/admin/add-product",{
        method:'POST',
        body:data
       });
       const result=await response.json();
       if(result.success){
        alert("recored added succefully");
        setTitle("");
        setPrice("");
        setOffer("");
        setAmenities("");
        setDescription("");
        setImage("");
       }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="resort">
      <form onSubmit={handleSubmit} className="resort__form">

        <h2 className="resort__title">Add Resort Details</h2>

        <input
          className="resort__input"
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="resort__input"
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="resort__input"
          type="text"
          name="offer"
          placeholder="Offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />

        <input
          className="resort__input"
          type="text"
          name="amenities"
          placeholder="Amenities"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
        />

        <textarea
          className="resort__textarea"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="resort__file"
          name="image"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" className="resort__button">
          Submit
        </button>

      </form>
    </div>
  );
};

export default ResortForm;

"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';

const BookingsPage = () => {
    const [orders, setorders] = useState([]);
    const params = useParams();
    const { id } = params;

    const fetchdata = async () => {
        try {
            const res = await fetch(`/api/users/${id}`);
            const result = await res.json();

            if (result.success && result.user) {
                setorders(result.user.bookings || []);
            }
        } catch (error) {
            console.log("Error fetching bookings", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchdata();
        }
    }, [id]);

    return (
        <div className="orders-wrapper">
            <h2 className="orders-heading">My Previous Orders</h2>

            {orders.length === 0 ? (
                <p className="empty-msg">No previous bookings</p>
            ) : (
                orders.map((item) => (
                    <div key={item._id} className="order-box">
                        <img
                            src={`http://localhost:3000${item.image}`}
                            alt={item.productname}
                            className="order-img"
                        />

                        <div className="order-details">
                            <h3>{item.productname}</h3>
                            <p>Check-in: {item.startDate}</p>
                            <p>Check-out: {item.endDate}</p>
                            <p>Price: ₹{item.price}</p>
                            <span className="offer-tag">{item.offer}% OFF</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default BookingsPage;

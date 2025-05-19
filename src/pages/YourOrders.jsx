import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../api/order';
import '../styles/YourOrders.css';

const YourOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const data = await getUserOrders(userId, token);
        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="your-orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              {/* <h3>{order.bookName}</h3> */}
              <p>OrderId: {order.orderId}</p>
              <p>Price: ₹{order.totalAmount}</p>
              
              <p>Order Date: {new Date(order.orderedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourOrders;

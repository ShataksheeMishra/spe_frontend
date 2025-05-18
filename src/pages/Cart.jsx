import React, { useState, useEffect } from 'react';
import { updateQuantity, placeOrder } from '../api/order';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = ({ userId }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch cart data for the user
        const fetchCart = async () => {
            const response = await axios.get(`/cart/user/${userId}`);
            setCartItems(response.data.items);
            setCartId(response.data.cartId);
        };

        fetchCart();
    }, [userId]);

    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        await updateQuantity(cartItemId, newQuantity);
        // Re-fetch cart items after update
    };

    const handlePlaceOrder = async () => {
        await placeOrder(cartId);
        navigate("/order-success");
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.map(item => (
                <div key={item.id}>
                    <span>{item.bookTitle}</span>
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                        min="1"
                    />
                </div>
            ))}
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};

export default CartPage;

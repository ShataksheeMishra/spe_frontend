// const BASE_URL = 'http://localhost:8081/orders';
import { BASE_API_URL } from '../apiConfig'
import axios from 'axios';

const BASE_URL = `${BASE_API_URL}/orders`;

export const addToCart = async (userId, bookId, jwtToken) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({ userId, bookId }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Add to cart failed: ${errorText}`);
  }

  return await res.json();
};

// export const updateQuantity = async (cartItemId, newQuantity, jwtToken) => {
//   const res = await fetch(`${BASE_URL}/update-quantity`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ cartItemId, newQuantity }),
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error(`Update quantity failed: ${errorText}`);
//   }

//   return await res.json();
// };

// export const placeOrder = async (cartId,jwtToken) => {
//   const res = await fetch(`${BASE_URL}/placeOrder`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ cartId }),
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error(`Place order failed: ${errorText}`);
//   }

//   return await res.json();
// };

// // 🆕 fetchCart added here
export const fetchCart = async (userId, jwtToken) => {
  const res = await fetch(`${BASE_URL}/items/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
      
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Fetch cart failed: ${errorText}`);
  }

  return await res.json();  // Expecting cartItems and possibly cartId inside
};
// src/api/order.js

// export const fetchCart = async (userId, token) => {
//   const response = await axios.get(`${BASE_URL}/items/${userId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return {
//     cartItems: response.data.items,
//   };
// };
// export const fetchCart = async (userId, jwtToken) => {
//   const res = await fetch(`${BASE_URL}/items/${userId}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${jwtToken}`,
//     },
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error(`Fetch cart failed: ${errorText}`);
//   }

//   const responseData = await res.json();

//   // Normalize the response shape
//   return {
//     cartItems: responseData.items || [],
//   };
// };

export const updateQuantity = async (cartItemId, newQuantity, token) => {
  const response = await axios.post(
    `${BASE_URL}/update-quantity`,
    {
      cartItemId,
      newQuantity
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const placeOrder = async (cartId, token) => {
  const response = await axios.post(
    `${BASE_URL}/placeOrder`,
    { cartId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const removeItem = async (cartItemId, token) => {
  const response = await axios.get(`${BASE_URL}/remove/${cartItemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getUserOrders = async (userId, token) => {
  const response = await axios.post(
    `${BASE_URL}/your-orders`,
    { userId },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data)
  return response.data;
};

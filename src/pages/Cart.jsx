
// // import React, { useState, useEffect } from 'react';
// // import { fetchCart, updateQuantity, placeOrder } from '../api/order';

// // import { useNavigate } from 'react-router-dom';

// // const CartPage = () => {
// //     const [cartItems, setCartItems] = useState([]);
// //     const [cartId, setCartId] = useState(null);
// //     const navigate = useNavigate();

// //     const loadCart = async () => {
// //          const token = localStorage.getItem('token');
// //         const userId = localStorage.getItem('userId');
// //         try {
// //             const data = await fetchCart(userId,token);
// //             setCartItems(data.cartItems);
// //             if (data.cartItems.length > 0) {
// //                 setCartId(data.cartItems[0].cart.cartId);
// //             }
// //         } catch (error) {
// //             console.error("Error fetching cart:", error);
// //         }
// //     };

// //     useEffect(() => {
// //         loadCart();
// //     }, []);

// //     const handleUpdateQuantity = async (cartItemId, newQuantity) => {
// //         await updateQuantity(cartItemId, newQuantity);
// //         await loadCart();
// //     };

// //     const handlePlaceOrder = async () => {
// //         await placeOrder(cartId);
// //         navigate("/YourOrders");
// //     };

// //     const calculateTotal = () => {
// //         return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
// //     };

// //     return (
// //         <div>
// //             <h2>Your Cart</h2>
// //             {cartItems.map(item => (
// //                 <div key={item.cartItemId} style={{ marginBottom: '1rem' }}>
// //                     <div><strong>{item.bookName}</strong></div>
// //                     <div>₹{item.price}</div>
// //                     <input
// //                         type="number"
// //                         value={item.quantity}
// //                         min="1"
// //                         onChange={(e) => handleUpdateQuantity(item.cartItemId, parseInt(e.target.value))}
// //                     />
// //                 </div>
// //             ))}
// //             <h3>Total: ₹{calculateTotal()}</h3>
// //             <button onClick={handlePlaceOrder}>Place Order</button>
// //         </div>
// //     );
// // };

// // export default CartPage;
// // src/pages/CartPage.jsx
// import React, { useEffect, useState } from 'react';
// import {
//   fetchCart,
//   updateQuantity,
//   placeOrder,
//   removeItem,
// } from '../api/order';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Cart.css';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartId, setCartId] = useState(null);
//   const navigate = useNavigate();

//   const loadCart = async () => {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');
//     try {
//       const data = await fetchCart(userId, token);
//       setCartItems(data.cartItems);
//       if (data.cartItems.length > 0) {
//         setCartId(data.cartItems[0].cart.cartId);
//       }
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   const handleUpdateQuantity = async (cartItemId, quantity) => {
//     try {
//       await updateQuantity(cartItemId, quantity);
//       await loadCart();
//     } catch (err) {
//       console.error('Error updating quantity:', err);
//     }
//   };

//   const handleRemoveItem = async (cartItemId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await removeItem(cartItemId, token);
//       await loadCart();
//     } catch (err) {
//       console.error('Error removing item:', err);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await placeOrder(cartId, token);
//       navigate('/YourOrders');
//     } catch (err) {
//       console.error('Error placing order:', err);
//     }
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <div className="cart-container">
//       <h2>Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {cartItems.map((item) => (
//             <div key={item.cartItemId} className="cart-item">
//               <div className="book-info">
//                 <strong>{item.bookName}</strong>
//                 <div>₹{item.price}</div>
//               </div>
//               <div className="actions">
//                 <input
//                   type="number"
//                   min="1"
//                   value={item.quantity}
//                   onChange={(e) =>
//                     handleUpdateQuantity(item.cartItemId, parseInt(e.target.value))
//                   }
//                 />
//                 <button onClick={() => handleRemoveItem(item.cartItemId)}>Remove</button>
//               </div>
//             </div>
//           ))}
//           <h3>Total: ₹{calculateTotal()}</h3>
//           <button className="place-order-btn" onClick={handlePlaceOrder}>
//             Place Order
//           </button>
//           <button className="update-order-btn" onClick={handleUpdateOrder}>
//   Update Order
// </button>

//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;
import React, { useEffect, useState } from 'react';
import {
  fetchCart,
  updateQuantity,
  placeOrder,
  removeItem,
} from '../api/order';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './navbar'; 
import '../styles/Cart.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartId, setCartId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const loadCart = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    try {
      const data = await fetchCart(userId, token);
      setCartItems(data.cartItems);

      // Set cartId from first item
      if (data.cartItems.length > 0) {
        setCartId(data.cartItems[0].cart.cartId);
      }
        // Set total price from backend
    setTotalPrice(data.totalPrice || 0);

      // Initialize quantities for each item
      const initialQuantities = {};
      data.cartItems.forEach(item => {
        initialQuantities[item.cartItemId] = item.quantity;
      });
      setQuantities(initialQuantities);

    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);
const handleUpdateQuantity = async (cartItemId, quantity) => {
  try {
    const token = localStorage.getItem('token');
    const data = await updateQuantity(cartItemId, quantity, token);
    console.log(data);
    await loadCart();
  } catch (err) {
    console.error('Error updating quantity:', err);
  }
};

  const handleRemoveItem = async (cartItemId) => {
    try {
      const token = localStorage.getItem('token');
      await removeItem(cartItemId, token);
      await loadCart();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      await placeOrder(cartId, token);
      navigate('/YourOrders');
    } catch (err) {
      console.error('Error placing order:', err);
    }
  };

  // const calculateTotal = () => {
  //   return cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // };

  return (<>  <NavigationBar/>
    <div className="cart-container">
    
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.cartItemId} className="cart-item">
              <div className="book-info">
                <strong>{item.bookName}</strong>
                <div>₹{item.price}</div>
              </div>
              <div className="actions">
                <input
                  type="number"
                  min="1"
                  value={quantities[item.cartItemId] || 1}
                  onChange={(e) =>
                    setQuantities({
                      ...quantities,
                      [item.cartItemId]: parseInt(e.target.value),
                    })
                  }
                />
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.cartItemId, quantities[item.cartItemId])
                  }
                  disabled={quantities[item.cartItemId] === item.quantity}
                >
                  Update
                </button>
                <button onClick={() => handleRemoveItem(item.cartItemId)}>Remove</button>
              </div>
            </div>
          ))}
         <h3>Total: ₹{totalPrice}</h3>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
    </>
  );
};

export default CartPage;

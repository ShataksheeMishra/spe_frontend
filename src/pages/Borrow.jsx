
// import React, { useEffect, useState } from 'react';
// import { getUserBorrows, returnBook } from '../api/borrow';
// import '../styles/Borrow.css';

// const BorrowPage = () => {
//   const [borrows, setBorrows] = useState([]);
//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');

//   const loadBorrows = async () => {
//     try {
//       const data = await getUserBorrows(userId, token);
//       setBorrows(data.borrows || []);
//     } catch (err) {
//       console.error('Failed to fetch borrows', err);
//     }
//   };

//   const handleReturn = async (bookId) => {
//     try {
//       await returnBook(userId, bookId, token); // ✅ Pass token here
//       loadBorrows(); // Refresh UI
//     } catch (err) {
//       console.error('Error returning book:', err);
//     }
//   };

//   useEffect(() => {
//     loadBorrows();
//   }, []);

//   return (
//     <div className="borrow-page">
//       <h2>Your Borrowed Books</h2>
//       {borrows.length === 0 ? (
//         <p>You haven't borrowed any books yet.</p>
//       ) : (
//         <div className="borrow-grid">
//           {borrows.map(borrow => (
//             <div className="borrow-card" key={borrow.bookId}>
//               <img src={borrow.image} alt={borrow.title} />
//               <h3>{borrow.title}</h3>
//               <p>{borrow.description}</p>
//               <button onClick={() => handleReturn(borrow.bookId)}>Return</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BorrowPage;
import React, { useEffect, useState } from 'react';
import { getUserBorrows, returnBook } from '../api/borrow';
import NavigationBar from './navbar'; 
import '../styles/Borrow.css';

const BorrowPage = () => {
  const [borrows, setBorrows] = useState([]);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const loadBorrows = async () => {
    try {
      const data = await getUserBorrows(userId, token);
      console.log("📦 API response for borrows:", data);
      setBorrows(data.borrows || []);
    } catch (err) {
      console.error('Failed to fetch borrows', err);
    }
  };

  const handleReturn = async (bookId) => {
  try {
    await returnBook(userId, bookId, token);
    loadBorrows();
  } catch (err) {
    console.error('Error returning book:', err.response?.data || err.message, err);
  }
};

  useEffect(() => {
    loadBorrows();
  }, []);

  return (
    <>
    <NavigationBar/>
    <div className="borrow-page">
      <h2>Your Borrowed Books</h2>
      {borrows.length === 0 ? (
        <p>You haven't borrowed any books yet.</p>
      ) : (
        <div className="borrow-grid">
          {borrows.map((entry, index) => (
            <div className="borrow-card" key={entry.borrow?.borrowId || index}>
              <img
                src={entry.book?.coverImageUrl || "https://via.placeholder.com/150"}
                alt={entry.book?.title || "No title"}
              />
              <h3>{entry.book?.title || "Untitled"}</h3>
              <p>{entry.book?.description || "No description available."}</p>
              <p><strong>Issue Date:</strong> {entry.borrow?.issueDate || "N/A"}</p>
              <p><strong>Due Date:</strong> {entry.borrow?.dueDate || "N/A"}</p>
              <p><strong>Returned:</strong> {entry.borrow?.isReturned ? "Yes" : "No"}</p>
              {!entry.borrow?.isReturned && (
                <button onClick={() => handleReturn(entry.book?.id)}>Return</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default BorrowPage;

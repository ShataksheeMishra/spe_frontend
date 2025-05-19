import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookDetail } from '../api/fetchBooksDetails';  // Your book detail API
import { fetchBookReviews } from '../api/fetchReviews';      // Your review API (adjust path if needed)
import ReviewModal from '../pages/ReviewModal';
import { addToCart } from '../api/order'; // Adjust path based on your structure
import { addBorrow } from '../api/borrow';
import '../styles/BookDetail.css';

const BookDetail = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Fetch book details
  useEffect(() => {
    fetchBookDetail(bookId)
      .then(data => setBook(data))
      .catch(err => console.error('Error fetching book:', err));
  }, [bookId]);

  // Fetch reviews
  useEffect(() => {
    fetchBookReviews(bookId)
      .then(data => setReviews(data))
      .catch(err => console.error('Error fetching reviews:', err));
  }, [bookId]);

  // Refresh reviews after submitting a new review
  const onReviewSubmit = () => {
    fetchBookReviews(bookId)
      .then(data => setReviews(data))
      .catch(err => console.error('Error fetching reviews:', err));
    setShowReviewModal(false);
  };

  // const handleAddToCart = () => {
  //   navigate('/cart');
  // };

const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');  // You must store this at login

    await addToCart(userId, book.id, token);
    alert('Book added to cart!');
 navigate('/cart'); 
  } catch (err) {
    console.error('Add to cart failed:', err);
    alert('Failed to add book to cart');
  }
};
// import { useNavigate } from 'react-router-dom'; // at the top of your component

// const navigate = useNavigate(); // inside your component

// const handleAddToCart = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');  // You must store this at login

//     await addToCart(userId, book.id, token);
//     alert('Book added to cart!');
//     navigate('/cart'); // ✅ Redirect to cart page
//   } catch (err) {
//     console.error('Add to cart failed:', err);
//     alert('Failed to add book to cart');
//   }



 const handleBorrow = async (bookId) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  try {
    await addBorrow(userId, bookId, token);
    navigate('/borrow'); // Redirect to BorrowPage
  } catch (err) {
    console.error('Failed to borrow book:', err);
  }
};

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-detail-container">
      <div className="book-image">
        <img src={book.imageUrl} alt={book.title} />
      </div>

      <div className="book-info">
        <h2>{book.title}</h2>
        <p><strong>Authors:</strong> {book.authors || 'Unknown'}</p>
        <p><strong>Genres:</strong> {book.genres || 'N/A'}</p>
        <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
        <p><strong>Pages:</strong> {book.pages}</p>
        <p><strong>Price:</strong> ₹{book.price ?? 'Not Available'}</p>
        <p><strong>Average Rating:</strong> ⭐ {book.rating || 'No ratings yet'}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>

        <button onClick={handleAddToCart}>Add to Cart</button>
       <button onClick={() => handleBorrow(bookId)}>Borrow</button>

        <button onClick={() => setShowReviewModal(true)}>Write a Review</button>

        <h3>Reviews</h3>
        <ul>
          {reviews.length > 0 ? reviews.map((review, idx) => (
            <li key={idx}>
              <strong>{review.title || `User ${review.userId}`}</strong>: ⭐ {review.rating}<br />
              {review.review}
            </li>
          )) : <p>No reviews yet.</p>}
        </ul>
      </div>

      {showReviewModal && (
        <ReviewModal
          bookId={bookId}
          onClose={() => setShowReviewModal(false)}
          onReviewSubmit={onReviewSubmit}
        />
      )}
    </div>
  );
};

export default BookDetail;

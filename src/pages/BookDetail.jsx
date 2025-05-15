import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookDetail } from '../api/fetchBooksDetails';  // Correct import
import ReviewModal from '../pages/ReviewModal';
import '../styles/BookDetail.css';

const BookDetail = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    fetchBookDetail(bookId)  // Use fetchBookDetail here, not getBookDetails
      .then(data => setBook(data))
      .catch(err => console.error('Error fetching book:', err));
  }, [bookId]);

  const handleAddToCart = () => {
    // You can dispatch to cart context or update localStorage
    navigate('/cart');
  };

  const handleBorrow = () => {
    navigate('/borrow');
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-detail-container">
      <div className="book-image">
        <img src={book.imageUrl} alt={book.title} />
      </div>
      <div className="book-info">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Price:</strong> ₹{book.price}</p>
        <p><strong>Average Rating:</strong> ⭐ {book.averageRating || 'No ratings yet'}</p>

        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleBorrow}>Borrow</button>
        <button onClick={() => setShowReviewModal(true)}>Write a Review</button>

        <h3>Reviews</h3>
        <ul>
          {book.reviews && book.reviews.length > 0 ? book.reviews.map((review, idx) => (
            <li key={idx}>
              <strong>{review.user}</strong>: ⭐ {review.rating}<br />
              {review.comment}
            </li>
          )) : <p>No reviews yet.</p>}
        </ul>
      </div>

      {showReviewModal && (
        <ReviewModal
          bookId={bookId}
          onClose={() => setShowReviewModal(false)}
          onReviewSubmit={() => {
            fetchBookDetail(bookId).then(data => setBook(data)); // also use fetchBookDetail here
            setShowReviewModal(false);
          }}
        />
      )}
    </div>
  );
};

export default BookDetail;

import React, { useState } from 'react';
import { submitReview } from '../api/fetchReviews';
import '../styles/BookDetail.css';

function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const ReviewModal = ({ bookId, onClose, onReviewSubmit }) => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const decoded = parseJwt(token);
      const userId = localStorage.getItem('userId');

      if (!userId) {
        alert('User not logged in');
        return;
      }

      const reviewData = {
        userId: Number(userId),
        bookId: Number(bookId),
        title,
        review,
        rating: Number(rating),
      };

      await submitReview(reviewData); // unified call

      onReviewSubmit();
    } catch (err) {
      alert('Error submitting review: ' + err.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Write a Review</h3>

        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Amazing Read"
        />

        <label>Rating (1-5):</label>
        <input
          type="number"
          value={rating}
          onChange={e => setRating(e.target.value)}
          min="1"
          max="5"
        />

        <label>Review:</label>
        <textarea
          value={review}
          onChange={e => setReview(e.target.value)}
          placeholder="Write your thoughts here..."
        />

        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ReviewModal;

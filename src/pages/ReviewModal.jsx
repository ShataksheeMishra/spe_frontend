import React, { useState } from 'react';
import { submitReview } from '../api/books';

const ReviewModal = ({ bookId, onClose, onReviewSubmit }) => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async () => {
    try {
      await postReview(bookId, { title, review, rating });
      onReviewSubmit(); // refresh reviews
    } catch (err) {
      alert('Error submitting review');
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

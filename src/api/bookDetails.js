const USE_MOCK = false;

const BOOK_DETAIL_URL = 'http://localhost:8081/catalogue/bookById';
const REVIEW_URL = 'http://localhost:8081/review';

/**
 * Get full details of a specific book by ID
 */
export const fetchBookDetail = async (bookId) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BOOK_DETAIL_URL}/${bookId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to fetch book details');
  }

  return json.data;
};

/**
 * Get all reviews for a specific book
 */
export const fetchBookReviews = async (bookId) => {
  const res = await fetch(`${REVIEW_URL}/book/${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to fetch reviews');
  }

  return json.data; // This should be the array of reviews
};

/**
 * Add a new review for a book
 */
export const submitReview = async (reviewData) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${REVIEW_URL}/add`, {
    method: 'POST',
    headers: {
      'Authorization': token,

      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to submit review');
  }

  return json.message;
};

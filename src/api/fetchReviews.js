const USE_MOCK = false;

// const BOOK_DETAIL_URL = 'http://localhost:8081/catalogue/fetch';
const REVIEW_URL = 'http://localhost:8081/review';

/**
 * Get full details of a specific book by ID
 */
// export const fetchBookDetail = async (bookId) => {
//   const token = localStorage.getItem('token');

//  const url = new URL(BOOK_DETAIL_URL);
// url.searchParams.append('id', bookId);

// const res = await fetch(url.toString(), {

//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   const json = await res.json();
//   if (!res.ok || !json.success) {
//     throw new Error(json.message || 'Failed to fetch book details');
//   }

//   return json.data;
// };

/**
 * Get all reviews for a specific book
 */
export const fetchBookReviews = async (bookId) => {
  const token=localStorage.getItem("token")
  const res = await fetch(`${REVIEW_URL}/book/${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to fetch reviews');
  }
  console.log(json.reviews); // <-- Log the actual key
  return json.reviews; // <
};

/**
 * Add a new review for a book
 */
export const submitReview = async (reviewData) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');  // get userId here

  if (!token) throw new Error('User not logged in');
  if (!userId) throw new Error('User ID missing');

  const bodyData = {
    userId: Number(userId),
    bookId: reviewData.bookId,
    review: reviewData.review,
    rating: Number(reviewData.rating),
    title: reviewData.title,
  };

  const res = await fetch(`${REVIEW_URL}/add`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to submit review');
  }

  return json.message;
};


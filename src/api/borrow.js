import axios from 'axios';
const BASE_URL = 'http://localhost:8081/borrow'; // Adjust to your gateway if needed

export const addBorrow = async (userId, bookId, token) => {
  const response = await axios.post(`${BASE_URL}/add`, { userId, bookId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getUserBorrows = async (userId, token) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const returnBook = async (userId, bookId, token) => {
  const response = await axios.post(
    `${BASE_URL}/return`,
    {
      userId: Number(userId),   // convert to number explicitly if stored as string
      bookId: Number(bookId)
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
};

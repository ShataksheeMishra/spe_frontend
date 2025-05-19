// const USE_MOCK = false;
// const BASE_URL = 'http://localhost:8081/catalogue/books';  // Ensure this matches your backend

// export const fetchBooks = async (page = 0, size = 8) => {
//   if (USE_MOCK) {
//     return Promise.resolve({
//       books: Array.from({ length: 8 }, (_, i) => ({
//         id: i + 1 + page * size,
//         title: `Mock Book ${i + 1 + page * size}`,
//         price: (Math.random() * 100).toFixed(2),
//         description: 'This is a mock description for the book.',
//         image: 'https://via.placeholder.com/150',
//       })),
//       totalPages: 3,
//     });
//   }

//   const token = localStorage.getItem('token'); // ✅ Get token

//   const res = await fetch(`${BASE_URL}?page=${page}&size=${size}`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`, // ✅ Include token in header
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!res.ok) throw new Error('Failed to fetch books');

//   const json = await res.json();

//   if (!json.success) throw new Error(json.message || 'API returned failure');

//   return {
//     books: json.data.content,           // ✅ Adjusted to fit your JSON response
//     totalPages: json.data.totalPages,   // ✅ Extracted from API response
//   };
// };
const USE_MOCK = false;
const BASE_URL = 'http://localhost:8081/catalogue/books';
const SEARCH_URL = 'http://localhost:8081/catalogue/search';
// const BASE_URL = 'http://192.168.49.2:30001/catalogue/books';
// const SEARCH_URL = 'http://192.168.49.2:30001/catalogue/search';

export const fetchBooks = async (page = 0, size = 8, search = '') => {
  if (USE_MOCK) {
    const filteredBooks = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1 + page * size,
      title: `Mock Book ${i + 1 + page * size}`,
      price: (Math.random() * 100).toFixed(2),
      description: 'This is a mock description for the book.',
      coverImageUrl: 'https://via.placeholder.com/150',
      genres: 'Fiction',
    })).filter(book => book.title.toLowerCase().includes(search.toLowerCase()));

    // Pagination for mock data
    const start = page * size;
    const pagedBooks = filteredBooks.slice(start, start + size);
    const totalPages = Math.ceil(filteredBooks.length / size);

    return Promise.resolve({
      books: pagedBooks,
      totalPages,
    });
  }

  const token = localStorage.getItem('token');

  let url;

  if (search && search.trim() !== '') {
    // Use search API with 'name' param, no pagination assumed here
    url = new URL(SEARCH_URL);
    url.searchParams.append('name', search);
  } else {
    // Use normal catalogue API with pagination
    url = new URL(BASE_URL);
    url.searchParams.append('page', page);
    url.searchParams.append('size', size);
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch books');

  const json = await res.json();

  if (!json.success) throw new Error(json.message || 'API returned failure');

  // If search API returns differently, adjust here accordingly
  // Assuming search API returns the full list (not paginated)
  if (search && search.trim() !== '') {
    return {
      books: json.data || [], // Adjust if your backend uses other keys
      totalPages: 1, // no pagination assumed on search results
    };
  }

  // Normal pagination response
  return {
    books: json.data.content,
    totalPages: json.data.totalPages,
  };
};
// export const fetchBookDetail = async (bookId) => {
//   const token = localStorage.getItem('token');
//   const url = `${BASE_URL}/booksById/${bookId}`;

//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!res.ok) {
//     const errorText = await res.text(); // might be plain text (e.g. "Book not found")
//     throw new Error(`Failed to fetch book detail: ${errorText}`);
//   }

//   let json;
//   try {
//     json = await res.json();
//   } catch (err) {
//     throw new Error('Invalid JSON response from server');
//   }

//   if (!json || !json.success) {
//     throw new Error(json?.message || 'Failed to load book');
//   }

//   return json.data;
// };

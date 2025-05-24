
import { BASE_API_URL } from '../apiConfig'
const BASE_URL = `${BASE_API_URL}/catalogue/books`;
const SEARCH_URL = `${BASE_API_URL}/catalogue/search`;
// const BASE_URL = 'http://192.168.49.2:30001/catalogue/books';
// const SEARCH_URL = 'http://192.168.49.2:30001/catalogue/search';
const USE_MOCK = false;
export const fetchBooks = async (page = 0, size = 6, search = '') => {
  console.log(`Fetching books: page=${page}, size=${size}, search=${search}`);

  if (USE_MOCK) {
    const filteredBooks = Array.from({ length: 6 }, (_, i) => ({
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
console.log("Books received:", json.data.content.length);

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

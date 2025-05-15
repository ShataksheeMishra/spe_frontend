const BASE_FETCH_URL = 'http://localhost:8081/catalogue/fetch';

export const fetchBookDetail = async (bookId) => {
  const token = localStorage.getItem('token');

  // Use query param id, not path param
  const url = new URL(BASE_FETCH_URL);
  url.searchParams.append('id', bookId);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch book detail: ${errorText}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || 'Failed to load book');
  }

  return json.data;  // Return the book data
};

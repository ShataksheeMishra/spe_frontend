const BASE_URL = 'http://localhost:8081/catalogue';
export const fetchBookDetail = async (bookId) => {
  const token = localStorage.getItem('token');
  const url = `${BASE_URL}/booksById/${bookId}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text(); // might be plain text (e.g. "Book not found")
    throw new Error(`Failed to fetch book detail: ${errorText}`);
  }

  let json;
  try {
    json = await res.json();
  } catch (err) {
    throw new Error('Invalid JSON response from server');
  }

  if (!json || !json.success) {
    throw new Error(json?.message || 'Failed to load book');
  }

  return json.data;
};

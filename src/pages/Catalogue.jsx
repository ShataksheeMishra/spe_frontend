
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/books';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './navbar'; // ✅ Import the Navbar
import '../styles/Catalogue.css';

const Catalogue = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0); // zero-based
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(page, undefined, searchQuery);
        setBooks(data.books);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error loading books:', error);
      }
    };

    if (page === 0 || searchQuery === '') {
      loadBooks();
    } else {
      setPage(0); // reset page to 0 when searchQuery changes and page > 0
    }
  }, [page, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  return (
    <>
      <NavigationBar /> {/* ✅ Add Navbar here */}
      {/* <div className="catalogue-wrapper"> */}
      <div className="catalogue-container">
        <h2>Book Catalogue</h2>

        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />

        <div className="book-grid">
          {books.length === 0 ? (
            <p>No books found.</p>
          ) : (
            books.map(book => (
              <div
                key={book.id}
                className="book-card"
                onClick={() => navigate(`/books/${book.id}`)}
              >
               <img src={book.coverImageUrl} alt={book.title} className="book-image" />

               <h4 className="book-title">{book.title}</h4>

                <p className="genres">{book.genres}</p>
                <p className="description">{book.description || 'No description available.'}</p>
              </div>
            ))
          )}
        </div>

        <div className="pagination">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Catalogue;


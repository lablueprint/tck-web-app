/* eslint-disable */
import React, { useState } from 'react';
import { Pagination, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import BookCard from '../bookHub/BookCard';

function BookList({ books }) {
    const [page, setPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(3);

    const handleChange = (e, value) => {
        setPage(value);
    };

    // Get current books
    const indexOfLastBook = page * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const count = Math.ceil(books.length / booksPerPage);

    return (
        <div style={{ alignItems: 'center'}}>
            <div className="library-display">
                {currentBooks.map((book) => (
                <BookCard
                    image={book.image}
                    title={book.title}
                    author={book.author}
                    key={book.id}
                    id={book.id}
                />
                ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Pagination 
                    count={count} 
                    page={page} 
                    onChange={handleChange} 
                />
            </div>
        </div>
    );
    

}

export default BookList;

/* NOTES
    PAGINATION
        - const [page, setPage] = useState(1);
        - const [postsPerPage, setPostsPerPage] = useState(18);
            - 18, 36, 54, 72
        Pagination is ready to go, just pass currentPage, handleChange
        <Pagination count={books.length / postsPerPage} page={page} onChange={handleChange} />
            WARNING: if books includes null, count may not be accurate
    SORTING
        - alphabetically (default), release date, recently added
        - const [sortBy, setSortBy] = useState('alphabetic')

    <div className="library-display">
        {books.map((element) => (
          <BookCard
            image={element.image}
            title={element.title}
            author={element.author}
          // Speical Prop
            key={element.id}
            id={element.id}
          />
        ))}
      </div>
*/

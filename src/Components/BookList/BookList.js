/* eslint-disable */
import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import { Sort, SortByAlpha, DateRange, StarBorder } from '@mui/icons-material';

import BookCard from '../bookHub/BookCard';
import ListMenu from './ListMenu';

const sortAlpha = (a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1); // alphabetical
const sortRelease = (a, b) => (a.date_published < b.date_published ? 1 : -1);  // Most recently published first
const sortAdded = (a, b) =>  (a.date_added < b.date_added ? 1 : -1);  // Most recently added first

const ALPHA = 1;
const RELEASE = 2;
const ADDED = 3;
const sortOptions = [
    {
        id: 1,
        text: "Sort by Book Title Alphabetically",
        icon: <SortByAlpha/>,
        value: ALPHA
    },
    {
        id: 2,
        text: "Sort by Release Date",
        icon: <DateRange/>,
        value: RELEASE
    },
    {
        id: 3,
        text: "Sort by Recently Added",
        icon: <StarBorder/>,
        value: ADDED
    }
];

const pageOptions = [
    {
        id: 1,
        text: "18 items",
        icon: null,
        value: 18
    },
    {
        id: 2,
        text: "36 items",
        icon: null,
        value: 36
    },
    {
        id: 3,
        text: "54 items",
        icon: null,
        value: 54
    },
    {
        id: 4,
        text: "72 items",
        icon: null,
        value: 72
    },
];

function BookList({ books }) {
    const [page, setPage] = useState(ALPHA);
    const [booksPerPage, setBooksPerPage] = useState(18);

    // Menu states
    const [sort, setSort] = useState(ALPHA);

    const handleChange = (e, value) => {
        setPage(value);
    };

    // Sort books
    const sortedBooks = books;
    if (sort === ALPHA) sortedBooks.sort(sortAlpha);
    if (sort === RELEASE) sortedBooks.sort(sortRelease);
    if (sort === ADDED) sortedBooks.sort(sortAdded);

    // Get current books
    const indexOfLastBook = page * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

    const count = Math.ceil(books.length / booksPerPage);

    return (
        <div style={{ alignItems: 'center', outline: '2px dotted red', width: '90vw', margin: 'auto'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <ListMenu 
                    menuText="Sort"
                    menuIcon={<Sort/>}
                    options={sortOptions}
                    value={sort}
                    handleChange={setSort}
                    />

                <ListMenu
                    menuText="items per page"
                    menuIcon={null}
                    options={pageOptions}
                    value={booksPerPage}
                    handleChange={setBooksPerPage}
                />
            </div>
            
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
                    color="primary"
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

    

    <ListMenu 
        menuText="Sort"
        menuIcon={<Sort/>}
        options={sortOptions}
        value={sort}
        handleChange={setSort}
    />
*/

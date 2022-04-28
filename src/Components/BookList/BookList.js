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

const PaginationSX = {
    ".MuiPaginationItem-root": {
        backgroundColor: 'rgba(42, 133, 239, 0.1)',
        borderColor: 'rgba(42, 133, 239, 0.1)',
        color: "#2A84EF",
        "&.Mui-selected": {
            backgroundColor: "rgba(42, 133, 239, .25)",
            borderColor: 'rgba(42, 133, 239, 0.25)',
            color: "#2A84EF"
        },
        fontFamily: "Work Sans",
        fontWeight: "600"
      },

  };

function BookList({ books }) {
    const [page, setPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(2);

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

    const handleSort = (sortBy) => {
        setPage(1);
        setSort(sortBy);
    };

    const handleBooksPerPage = (bookCount) => {
        // When we change booksPerPage, we will go back to page 1 and apply booksPerPage
        setPage(1);
        setBooksPerPage(bookCount);
    };

    return (books.length) ? (
        <div style={{ alignItems: 'center', width: '90vw', margin: 'auto'}}>
            <div style={{display: 'flex', flexDirection: 'row', fontFamily: 'Work Sans'}}>
                <ListMenu 
                    menuText="Sort"
                    menuIcon={<Sort/>}
                    options={sortOptions}
                    value={sort}
                    handleChange={handleSort}
                    />

                <ListMenu
                    menuText="items per page"
                    menuIcon={null}
                    options={pageOptions}
                    value={booksPerPage}
                    handleChange={handleBooksPerPage}
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
            <div style={{display: 'flex', justifyContent: 'center', fontFamily: 'Work Sans'}}>
                <Pagination 
                    variant="outlined"
                    count={count} 
                    page={page} 
                    onChange={handleChange}
                    sx={PaginationSX}
                />
            </div>
        </div>
    ) : (
        <h1>Sorry, there's no books here! 😰</h1>
    );
    

}

export default BookList;

/* NOTES
    PAGINATION
        - const [page, setPage] = useState(1);
        - const [postsPerPage, setPostsPerPage] = useState(18);
        - 18, 36, 54, 72 granularity
        WARNING: if books includes null, count may not be accurate
    SORTING
        - alphabetically (default), release date, recently added
        - sort codes are defined as 
            - ALPHA = 1
            - RECENT = 2
            - ADDED = 3

    <ListMenu 
        menuText="Sort"
        menuIcon={<Sort/>}
        options={sortOptions}
        value={sort}
        handleChange={setSort}
    />
*/

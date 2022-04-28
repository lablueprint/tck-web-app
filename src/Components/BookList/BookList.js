import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';
import {
  Sort, SortByAlpha, DateRange, StarBorder,
} from '@mui/icons-material';

import BookCard from '../bookHub/BookCard';
import ListMenu from './ListMenu';

const sortAlpha = (a, b) => { // alphabetical
  if (a.fields.title === undefined) return 1;
  if (b.fields.title === undefined) return -1;
  return (a.fields.title.toLowerCase() < b.fields.title.toLowerCase() ? -1 : 1);
};
const sortRelease = (a, b) => { // Most recently published first
  if (a.fields.date_published === undefined) return -1;
  if (b.fields.date_published === undefined) return 1;
  return (a.fields.date_published < b.fields.date_published ? 1 : -1);
};
const sortAdded = (a, b) => { // Most recently added first
  if (a.fields.date_added === undefined) return -1;
  if (b.fields.date_added === undefined) return 1;
  return (a.fields.date_added < b.fields.date_added ? 1 : -1);
};

const ALPHA = 1;
const RELEASE = 2;
const ADDED = 3;
const sortOptions = [
  {
    id: 1,
    text: 'Sort by Book Title Alphabetically',
    icon: <SortByAlpha />,
    value: ALPHA,
  },
  {
    id: 2,
    text: 'Sort by Release Date',
    icon: <DateRange />,
    value: RELEASE,
  },
  {
    id: 3,
    text: 'Sort by Recently Added',
    icon: <StarBorder />,
    value: ADDED,
  },
];

const pageOptions = [
  {
    id: 1,
    text: '18 items',
    icon: null,
    value: 18,
  },
  {
    id: 2,
    text: '36 items',
    icon: null,
    value: 36,
  },
  {
    id: 3,
    text: '54 items',
    icon: null,
    value: 54,
  },
  {
    id: 4,
    text: '72 items',
    icon: null,
    value: 72,
  },
];

const paginationSX = {
  margin: '2vh auto 2vh auto',
  '.MuiPaginationItem-root': {
    backgroundColor: 'rgba(42, 133, 239, 0.1)',
    borderColor: 'rgba(42, 133, 239, 0.1)',
    color: '#2A84EF',
    '&.Mui-selected': {
      backgroundColor: 'rgba(42, 133, 239, .25)',
      borderColor: 'rgba(42, 133, 239, 0.25)',
      color: '#2A84EF',
    },
    fontFamily: 'Work Sans',
    fontWeight: '600',
  },

};

function BookList({ books }) {
  const [page, setPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(18);

  // Menu states
  const [sort, setSort] = useState(ALPHA);

  const handleChange = (e, value) => {
    setPage(value);
  };

  // Sort books
  const sortedBooks = books.filter((book) => book !== undefined); // Remove any undefined;
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
    <div style={{ alignItems: 'center', width: '90vw', margin: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Work Sans' }}>
        <ListMenu
          menuText="Sort"
          menuIcon={<Sort />}
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
            title={book.fields.title !== undefined ? book.fields.title : 'MISSING TITLE'}
            author={book.fields.author !== undefined ? book.fields.author : ['MISSING CREATOR']}
            image={book.fields.image !== undefined ? book.fields.image[0].url : 'MISSING IMAGE'}
            key={book.fields.id}
            id={book.fields.id}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Work Sans' }}>
        <Pagination
          variant="outlined"
          count={count}
          page={page}
          onChange={handleChange}
          sx={paginationSX}
        />
      </div>
    </div>
  ) : (
    <h1>Sorry, there`&apos;`s no books here! 😰</h1>
  );
}

BookList.propTypes = {
  books: PropTypes.PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
};

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

    books format:
        books is to be an array of Records pulled from Airtable.

    <ListMenu
        menuText="Sort"
        menuIcon={<Sort/>}
        options={sortOptions}
        value={sort}
        handleChange={setSort}
    />
*/

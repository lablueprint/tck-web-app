import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';
import {
  Sort, SortByAlpha, DateRange, StarBorder,
} from '@mui/icons-material';

import BookCard from '../BookBrowser/BookCard';
import ListMenu from './ListMenu';

import './BookList.css';

// Sort functions for each sorting mode
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

// Sort options for ListMenu child component
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

// Pagination options for ListMenu child component
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

// Styles for Pagination component
const PAGINATION_SX = {
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

function BookList({ books, NoResults }) {
  const [page, setPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(18);

  // Menu states
  const [sort, setSort] = useState(ALPHA);

  const handlePageChange = (e, value) => {
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
    <div className="book-list">
      <div className="book-list-menus">
        <ListMenu
          menuText="Sort"
          menuIcon={<Sort />}
          options={sortOptions}
          value={sort}
          handleChange={handleSort}
        />

        <ListMenu
          menuText="items per page"
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
      <div className="book-list-pagination">
        <Pagination
          variant="outlined"
          count={count}
          page={page}
          onChange={handlePageChange}
          sx={PAGINATION_SX}
        />
      </div>
    </div>
  ) : (
    <NoResults />
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
      })),
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  })),
  NoResults: PropTypes.elementType,
};

BookList.defaultProps = {
  books: [
    {
      fields: {
        title: 'MISSING TITLE',
        author: ['MISSING CREATOR'],
        image: [
          {
            url: 'MISSING IMAGE',
          },
        ],
        id: '',
      },
    },
  ],
  NoResults: <h1>Sorry, there&apos;s no books here! 😰</h1>,
};

export default BookList;

/* NOTES
    PAGINATION
        - const [page, setPage] = useState(1);
        - const [postsPerPage, setPostsPerPage] = useState(18);
        - 18, 36, 54, 72 granularity
    SORTING
        - alphabetically (default), release date, recently added
        - sort codes are defined as
            - ALPHA = 1
            - RECENT = 2
            - ADDED = 3

    remark: although we have defined defaultProps for books,
            this is only triggered when we don't have a books prop
            NOT when we have a books prop and some books are missing fields,
            thus we do extra checking within the component
*/

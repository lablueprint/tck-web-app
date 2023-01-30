import React, { useState, useEffect, useContext } from 'react';
import { PropTypes } from 'prop-types';
import BookList from '../BookList/BookList';
import { gradeRangeMetadata, ageRangeMetadata } from '../../Constants';
import NoResults from '../BookList/NoResults';
import Loading from '../Loading/Loading';
import { BooksContext } from '../../Contexts';

function BookCardsDisplay({
  searchTerms, searchCategory, alignment, rangeInput, multiSelectInput,
}) {
  const { books, booksLoading } = useContext(BooksContext);
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [loading, setLoading] = useState(false);

  let incomingGradeIndices = [0, 0];
  let incomingAgeIndices = [0, 0];
  const recordAgeIndices = [0, 0];
  const recordGradeIndices = [0, 0];

  const stringFieldSearch = (book) => {
    // Filter function for books stored in 'books' state
    if (!book) return false;
    let title = book.get('title');
    let desc = book.get('description');
    let identity = book.get('identity_description');

    // need to error check before using toLowerCase()
    title = (title) ? title.toLowerCase() : '';
    desc = (desc) ? desc.toLowerCase() : '';
    identity = (identity) ? identity.toLowerCase() : '';

    let match = false;
    const lowercaseTerms = searchTerms.toLowerCase();

    if (searchCategory === 'title') match = title.includes(lowercaseTerms);
    if (searchCategory === 'description') match = desc.includes(lowercaseTerms);
    if (searchCategory === 'identity') match = identity.includes(lowercaseTerms);
    if (searchCategory === 'keyword') {
      match = title.includes(lowercaseTerms)
              || desc.includes(lowercaseTerms)
              || identity.includes(lowercaseTerms);
    }

    return match;
  };

  const creatorSearch = (book) => {
    // Filter function for books stored in 'books' state
    if (!book) return false;
    const authors = book.get('author_name');
    const illustrators = book.get('illustrator_name');

    let match = false;
    const lowercaseTerms = searchTerms.toLowerCase();

    if (searchCategory === 'author' && authors) match = authors.findIndex((el) => el.toLowerCase().includes(lowercaseTerms)) !== -1;
    if (searchCategory === 'illustrator' && illustrators) match = illustrators.findIndex((el) => el.toLowerCase().includes(lowercaseTerms)) !== -1;
    if (searchCategory === 'keyword') {
      match = (authors && authors.findIndex((el) => el.includes(lowercaseTerms)) !== -1)
            || (illustrators && illustrators.findIndex((el) => el.includes(lowercaseTerms)) !== -1);
    }
    return match;
  };

  const searchByTerm = async () => {
    let matched = [];
    const isTitleDescIdentity = searchCategory === 'keyword'
                              || searchCategory === 'title'
                              || searchCategory === 'description'
                              || searchCategory === 'identity';

    const isAuthorIllustrator = searchCategory === 'keyword'
                              || searchCategory === 'author'
                              || searchCategory === 'illustrator';

    if (isTitleDescIdentity) {
      matched.push(...books.filter(stringFieldSearch));
    }
    if (isAuthorIllustrator) {
      matched.push(...books.filter(creatorSearch));
    }

    matched.filter((book) => book); // Remove undefined values
    matched = [...new Set(matched)]; // Remove duplicates
    setFilteredBooks(matched);
  };

  // Search function
  useEffect(() => {
    if (alignment === 'Search') {
      if (searchTerms) {
        setLoading(true);
        (async () => searchByTerm().then(setLoading(false)))();
      } else {
        setFilteredBooks(books);
      }
    }
  }, [books, searchTerms, searchCategory, alignment]);

  const multiSelectFilter = (record, field) => multiSelectInput[field].length === 0
    || (record.fields[field] !== undefined
      ? record.fields[field].some((value) => multiSelectInput[field].indexOf(value) !== -1)
      : false);

  // Filter function
  useEffect(() => {
    if (alignment === 'Filter') {
      incomingGradeIndices = rangeInput.grade;
      incomingAgeIndices = rangeInput.age;

      const tempBooks = books.filter(
        (record) => {
          recordGradeIndices[0] = gradeRangeMetadata.indexOf(record.fields.grade_min);
          recordGradeIndices[1] = gradeRangeMetadata.indexOf(record.fields.grade_max);
          recordAgeIndices[0] = ageRangeMetadata.indexOf(record.fields.age_min);
          recordAgeIndices[1] = ageRangeMetadata.indexOf(record.fields.age_max);
          return (
            ((incomingGradeIndices[0] + 1) <= recordGradeIndices[1])
            && ((incomingGradeIndices[1] + 1) >= recordGradeIndices[0])
            && ((incomingAgeIndices[0] + 1) <= recordAgeIndices[1])
            && ((incomingAgeIndices[1] + 1) >= recordAgeIndices[0])
            && multiSelectFilter(record, 'race/ethnicity')
            && multiSelectFilter(record, 'religion')
            && multiSelectFilter(record, 'identity_tags')
            && multiSelectFilter(record, 'theme/lessons')
            && multiSelectFilter(record, 'book_type')
            && multiSelectFilter(record, 'book_type')
            && multiSelectFilter(record, 'genre'));
        },
      );
      setFilteredBooks(tempBooks);
    }
  }, [books, rangeInput, multiSelectInput, alignment]);

  if (loading || booksLoading) {
    return <Loading />;
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <BookList books={filteredBooks} NoResults={NoResults} />
    </div>
  );
}

export default BookCardsDisplay;

BookCardsDisplay.propTypes = {
  searchTerms: PropTypes.string.isRequired,
  searchCategory: PropTypes.string.isRequired,
  alignment: PropTypes.string.isRequired,
  rangeInput: PropTypes.shape(
    {
      age: PropTypes.arrayOf(PropTypes.number),
      grade: PropTypes.arrayOf(PropTypes.number),
    },
  ).isRequired,
  multiSelectInput: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

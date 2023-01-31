import React, { useState, useEffect, useMemo } from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import axios from 'axios';
import {
  Dictionary, Home, CreatorPage, BookPage, CollectionPage, BrowserPage, QuizPage,
} from './Pages';
import { Header, Footer } from './Components/index';
import { BooksContext, MetadataContext } from './Contexts';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [metadata, setMetadata] = useState([]);
  const [metadataLoading, setMetadataLoading] = useState(true);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    axios.all([
      axios.get('/api/books'),
      axios.get('/api/metadata'),
    ], { cancelToken: source.token })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.err('successfully aborted');
        } else console.err(err);
        // add other error handling
      })
      .then(axios.spread((booksResponse, metadataResponse) => {
        setBooks(booksResponse.data);
        setBooksLoading(false);
        setMetadata(metadataResponse.data);
        setMetadataLoading(false);
      }));

    return () => { source.cancel(); };
  }, []);

  const bookContextVal = useMemo(() => ({ books, booksLoading }), [books, booksLoading]);
  const metadataContextVal = useMemo(
    () => ({ metadata, metadataLoading }),
    [metadata, metadataLoading],
  );

  return (
    <div className="App">
      <Header />
      <div className="screen-container">
        <BooksContext.Provider value={bookContextVal}>
          <MetadataContext.Provider value={metadataContextVal}>
            <Routes>
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/" element={<Home />} />
              <Route path="/browser" element={<BrowserPage />} />
              <Route exact path="/browser/book/:bookId" element={<BookPage />} />
              <Route exact path="/browser/creator/:id" element={<CreatorPage />} />
              <Route exact path="/collection" element={<CollectionPage />} />
              <Route exact path="/collection/:id" element={<CollectionPage />} />
              <Route path="/quiz/*" element={<QuizPage />} />
            </Routes>
          </MetadataContext.Provider>
        </BooksContext.Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App;

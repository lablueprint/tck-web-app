import React from 'react';
import CardsDisplay from '../Components/bookHub/BookHub';
import CollectionDisplay from '../Components/Collections/CollectionDisplay';
import './PagesTemp.css';

function Home() {
  return (
    <div>
      <h1 className="headings">Book Recommendation Hub</h1>
      <h2 className="headings">Collections</h2>
      <CollectionDisplay />
      <h2 className="headings">Books</h2>
      <CardsDisplay />
    </div>
  );
}

export default Home;

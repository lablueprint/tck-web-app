import React/* , { useEffect, useState } */ from 'react';
import CardsDisplay from '../Components/bookHub/BookHub';
import CollectionDisplay from '../Components/Collections/CollectionDisplay';
import './PagesTemp.css';
// delete before pushing/////
// import RangeFilter from '../Components/Filtering/RangeFilter';
/// /////////////////////////

// const Airtable = require('airtable');

// const airtableConfig = {
//   apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
//   baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
// };

// const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

function Home() {
  // const [receivedData, setReceivedData] = useState([]);
  // function getData() {
  //   // let receivedData = [];
  //   base('Book').select({
  //     view: 'Grid view',
  //   }).all((err, records) => {
  //     setReceivedData(records);
  //     // console.log(receivedData);
  //     if (err) { console.error(err); }
  //   });
  // }
  // useEffect(() => { getData(); }, []);
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

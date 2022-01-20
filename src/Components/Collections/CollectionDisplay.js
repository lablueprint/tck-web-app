import React from 'react';
import PropTypes from 'prop-types';
import Collection from './Collection';

function CollectionDisplay({ collection }) {
  // const [collections.getIDs, setCollection] = useState([]);
  // setCollection(collection);
  // useEffect(getCollection, [collectionNum]);
  /* renderItems = () => {

    return (
      <AllCollections>
        {this.state.news.map((card) => (
          <Card
            key={card.id} // Make sure you use a unique key identifier for React
            image={card.imageUrl} // This is the url of the image for the current object
            inside this.state.news.YOUR_CURRENT_OBJECT
            header={card.title}
            meta={card.type}
            description={card.description}
          />
        )}
      </AllCollections>
    ) */
  return collection.map((id) => (
    <Collection
      id={id}
    />
  ));
}
// pass in a prop of ids
// using id, save record in a state
// once we are done saving all records,pass the array of records? to the map function
CollectionDisplay.propTypes = {
  numPosts: PropTypes.number.isRequired,
};

export default CollectionDisplay;

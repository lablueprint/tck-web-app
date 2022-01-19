import PropTypes from 'prop-types';
import React from 'react';
import './Author.css';

export default function AuthorInfo({
  author, bio, links, authorPic,
}) {
  const linksArray = links.split('\n');
  linksArray.pop();
  return (
    <>
      <div className="Header">
        {author}
        <img width="10%" height="10%" align="center" src={authorPic} alt="author" />
      </div>
      <div className="Paragraph">
        {bio}
      </div>
      <br />
      <div className="Extra">
        Click here to learn more!:
      </div>
      <div>
        {linksArray.map((element) => (
          <p><a href={element}>{element}</a></p>
        ))}
      </div>
    </>
  );
}

AuthorInfo.propTypes = {
  author: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  links: PropTypes.string.isRequired,
  authorPic: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

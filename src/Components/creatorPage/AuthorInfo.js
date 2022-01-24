import PropTypes from 'prop-types';
import React from 'react';
import './Author.css';

export default function AuthorInfo({
  author, bio, links, authorPic,
}) {
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
        <a href={links}>{links}</a>
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

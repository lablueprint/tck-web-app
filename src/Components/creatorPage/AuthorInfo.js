/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import './Author.css';

export default function AuthorInfo({ author, bio, link }) {
  return (
    <>
      <div className="Header">
        {author}
      </div>
      <div className="Paragraph">
        {bio}
      </div>
      <br />
      <div className="Extra">
        Here are some links!:
      </div>
      <div>
        {link}
      </div>
    </>
  );
}

AuthorInfo.propTypes = {
  author: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import React from 'react';
import './Author.css';

// Author name/bio/picture/link components
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
        Check out
        {' '}
        {author}
        &apos;s personal website:
      </div>
      <div>
        <a href={links}>{links}</a>
      </div>
    </>
  );
}

AuthorInfo.propTypes = {
  author: PropTypes.string,
  bio: PropTypes.string,
  links: PropTypes.string,
  authorPic: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

AuthorInfo.defaultProps = {
  author: '',
  bio: '',
  links: '',
};

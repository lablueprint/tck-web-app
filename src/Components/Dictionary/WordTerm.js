import PropTypes from 'prop-types';
import React from 'react';

export default function WordTerm({ word, def }) {
  return (
    <div style={{ textAlign: 'start', paddingLeft: '2%' }}>
      <div>
        Word:
        {word}
      </div>
      <div>
        Definition:
        {def}
      </div>
      <div>
        ------------
      </div>
    </div>
  );
}

WordTerm.propTypes = {
  word: PropTypes.string.isRequired,
  def: PropTypes.string.isRequired,
};

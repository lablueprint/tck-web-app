import React from 'react';
import Kid1 from '../Assets/Images/Boy.svg';
import Star1 from '../Assets/Images/Yellow Star.svg';
import Kid2 from '../Assets/Images/Girl 1.svg';
import Star2 from '../Assets/Images/Pink Star.svg';
import Kid3 from '../Assets/Images/Girl 2.svg';
import Star3 from '../Assets/Images/Orange Star.svg';
import './Loading.css';

function Loading() {
  return (
    <div className="Loading">
      <body>
        <div className="wrapper">
          <div className="main">
            <img className="kiditem" id="one" src={Kid1} alt="" />
            <img className="staritem" id="two" src={Star1} alt="" />
            <img className="kiditem" id="three" src={Kid2} alt="" />
            <img className="staritem" id="four" src={Star2} alt="" />
            <img className="kiditem" id="five" src={Kid3} alt="" />
            <img className="staritem" id="six" src={Star3} alt="" />
          </div>
          <div className="mainCont">
            <h1 id="loading">Loading...</h1>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Loading;

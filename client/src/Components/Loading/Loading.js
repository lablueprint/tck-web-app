import React from 'react';
import Kid1 from '../../Assets/Images/Boy.png';
import Star1 from '../../Assets/Images/Yellow Star.png';
import Kid2 from '../../Assets/Images/Girl 1.png';
import Star2 from '../../Assets/Images/Pink Star.png';
import Kid3 from '../../Assets/Images/Girl 2.png';
import Star3 from '../../Assets/Images/Orange Star.png';
import './Loading.css';

function Loading() {
  return (
    <div className="loading">
      <div className="main">
        <img className="kiditem" id="one" src={Kid1} alt="" />
        <img className="staritem" id="two" src={Star1} alt="" />
        <img className="kiditem" id="three" src={Kid2} alt="" />
        <img className="staritem" id="four" src={Star2} alt="" />
        <img className="kiditem" id="five" src={Kid3} alt="" />
        <img className="staritem" id="six" src={Star3} alt="" />
      </div>
      <div className="mainCont" id="loading">
        Loading...
      </div>
    </div>
  );
}

export default Loading;

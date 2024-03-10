import React from 'react';

import './Card.css';

const Card = (props) => {
  const classes = 'card ' + props.className;

  return (
    <div>
      {/* <h1>SoundTrackMyMood</h1> */}
      <div className={classes}>{props.children}</div>
    </div>

  );


};

export default Card;
import { React, useState } from 'react';

import './Classacceptteacher.css';

const Classacceptteacher = (props) => {
  const backdrop = () => {
    props.updis();
  };
  var temp = new Date(props.time);
  temp.setHours(temp.getHours() - 5);
  temp.setMinutes(temp.getMinutes() - 30);

  return (
    <div>
      {<div className="out-reqacpt" onClick={backdrop}></div>}
      {
        <div className="in-in-reqacpt">
          <h4>Class Details:</h4>
          <h5>Student Name:</h5>
          <p>{props.name}</p>

          {/* <h5>student ID:</h5>
          <p>{props.id}</p> */}

          <h5>Topic:</h5>
          <p>{props.topic}</p>

          <h5>Requested Time:</h5>
          <p>{('' + temp).substring(0, 25)}</p>
          <button className={'accept-btn'} onClick={backdrop}>
            close
          </button>
        </div>
      }
    </div>
  );
};

export default Classacceptteacher;

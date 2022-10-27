import { React, useState } from 'react';
import './Requestpopup.css';
import axios from 'axios.js';

const Requestpopup = (props) => {
  const price = [350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900];

  const create_classroom = async () => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result2 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'student/info',
      {},
      {
        headers: headers,
      }
    );

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'student/createclassroom',
      {
        teacher_id: props.req_value.teacher_id,
        subject: newlines,
        credit: price[result2.data.result.Standard - 1],
        status: 0,
      },
      {
        headers: headers,
      }
    );

    props.change_req();

    window.location.reload();
  };

  const [newlines, lineupdated] = useState('');

  const [empty, changeempty] = useState(true);

  const valuechanged = (event) => {
    lineupdated(event.target.value);
    if (event.target.value.trim() == '') {
      changeempty(true);
    } else {
      changeempty(false);
    }
  };
  console.log(newlines);
  return (
    <div className="outer-popup-div">
      <div
        className="outer-popup"
        onClick={() => {
          props.change_req();
        }}
      ></div>
      <div className="inner-popup">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>
        <div className="inner-popup-3">
          <h1>REQUEST A CLASS </h1>
          <div className="inner-popup2">
            <h4>NAME :</h4>
            <p>{props.req_value.teacher_name}</p>
          </div>
          <div className="inner-popup2">
            <h4>Class Name :</h4>
            <input
              type="text"
              placeholder="enter the subject"
              onChange={valuechanged}
              value={newlines}
            ></input>
          </div>
          <div className="inner-popup2">
            <h4>YEAR OF EXPERIENCE:</h4>
            <p>{props.req_value.exp}</p>
          </div>
          <buton id="req-button2" onClick={create_classroom}>
            start a classroom
          </buton>
        </div>
      </div>
    </div>
  );
};

export default Requestpopup;

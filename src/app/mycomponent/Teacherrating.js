import { React, useEffect, useState } from 'react';
import './Teacherrating.css';
import axios from 'axios.js';
import ReactStars from 'react-rating-stars-component';
import { areDayPropsEqual } from '@mui/x-date-pickers/PickersDay/PickersDay';

const Teacherrating = (props) => {
  const [name, update_name] = useState('');
  useEffect(async () => {
    const accessToken = window.localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };
    const result2 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'student/info/getbyid',
      {
        student_id: props.id_student,
      },
      {
        headers: headers,
      }
    );

    update_name(result2.data.result.FirstName);
  }, []);

  return (
    <div className="trating">
      <p className="tr">
        <strong>Student Name:</strong>
        {name}
      </p>
      <p className="tr">
        <strong>Class ID&nbsp;&ensp;:</strong>
        {props.classes_id}
      </p>
      <p className="tr">
        <strong>Comment:</strong>
        {props.comment}
      </p>
      <div className="sstar">
        <ReactStars
          count={5}
          size={15}
          isHalf={true}
          edit={false}
          value={props.rating}
          classNames={'star-r'}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#f9b83a"
        />
      </div>
    </div>
  );
};

export default Teacherrating;

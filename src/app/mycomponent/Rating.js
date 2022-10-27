import { React, useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';

import './Rating.css';
import axios from 'axios.js';

const Rating = (props) => {
  const [star, update_star] = useState(0);

  const ratingChanged = (newRating) => {
    update_star(newRating);
  };

  const submit_rating = async (event) => {
    event.preventDefault();

    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'student/submit/rating',
      {
        id_student: props.id_student,
        id_teacher: props.id_teacher,
        ratings: star,
        comments: event.target.comment.value,
        to: 1,
        id_classes: props.classes_id,
      },
      {
        headers: headers,
      }
    );

    localStorage.removeItem('id_student');
    localStorage.removeItem('id_teacher');
    localStorage.removeItem('classes_id');
    localStorage.removeItem('topic');
    localStorage.removeItem('teacher_name');

    window.location.replace('https://' + window.location.host);
  };

  return (
    <div className="rating">
      <div className="back-rating"></div>
      <div className="rating2">
        <div className="classInfo">
          <h2>Class Info:</h2>
          <div className="inner-classinfo">
            <p>teacher name:{props.name}</p>
            <p>topic:{props.topic}</p>
          </div>
        </div>
        <div className="star-rating">
          <h2>Rating:</h2>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={40}
            isHalf={true}
            classNames={'star-r'}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#f9b83a"
          />
        </div>
        <div className="comment-rating">
          <h2>Comment:</h2>
          <form onSubmit={submit_rating}>
            <textarea name="comment" rows="4" cols="50" placeholder="enter your comment"></textarea>
            <input type={'submit'} value={'submit'}></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Rating;

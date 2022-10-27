import { React, useEffect, useState } from 'react';
import { MatxSuspense } from 'app/components';
import { CircularProgress } from '@mui/material';
import './Classdisplayblock.css';

import axios from 'axios.js';

import bg1 from './bg1.jpeg';
import bg2 from './bg2.jpeg';
import bg3 from './bg3.jpeg';
import bg4 from './bg4.jpeg';
import bg5 from './bg5.jpeg';
import bg6 from './bg6.jpeg';

const ClassdisplayBlock2 = (props) => {
  var isTeacher = window.localStorage.getItem('position') == 1 ? true : false;
  const [Loading, setLoading] = useState(false);

  const handle_update_disp = () => {
    props.update_disp({
      id: props.v3,
      credit: props.credit,
    });
    if (props.v2 == undefined) {
      props.update_teacher(props.v5);
    } else {
      props.update_teacher(props.v2);
    }
  };

  const [teacher_name, update_teacher_name] = useState('');
  const [student_name, update_student_name] = useState('');

  useEffect(async () => {
    const accessToken = window.localStorage.getItem('token');

    const id = props.v2 == undefined ? props.v5 : props.v2;

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/info/getbyid',
      {
        teacher_id: id,
      },
      {
        headers: headers,
      }
    );

    const result2 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'student/info/getbyid',
      {
        student_id: props.v4,
      },
      {
        headers: headers,
      }
    );

    update_teacher_name(result.data.result.Name);
    update_student_name(result2.data.result.FirstName);
    setLoading(true);
  }, []);

  var num = (parseInt(Math.random() * 10) % 6) + 1;

  return (
    <MatxSuspense>
      {Loading && (
        <div className="outer-div">
          {props.status == 0 && (
            <div className="pending-layer">
              <p>Waiting for Approval</p>
            </div>
          )}
          <img
            src={
              num == 1
                ? bg1
                : num == 2
                ? bg2
                : num == 3
                ? bg3
                : num == 4
                ? bg4
                : num == 5
                ? bg5
                : bg6
            }
          ></img>
          <div className="inner-div">
            <h2>{props.v1}</h2>
            {!isTeacher && <h4>{teacher_name}</h4>}
            <h4>classroom id:{props.v3}</h4>
            {isTeacher && <h4>student name:{student_name}</h4>}
            {!isTeacher && <h4>credit:{props.credit}</h4>}
          </div>
          <button onClick={handle_update_disp}>open</button>
        </div>
      )}
    </MatxSuspense>
  );
};

export default ClassdisplayBlock2;

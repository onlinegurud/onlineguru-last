import { React, useState, useEffect } from 'react';
import { MatxSuspense } from 'app/components';
import './Classdisplayblock.css';
import axios from 'axios.js';

import bg1 from './bg1.jpeg';
import bg2 from './bg2.jpeg';
import bg3 from './bg3.jpeg';
import bg4 from './bg4.jpeg';
import bg5 from './bg5.jpeg';
import bg6 from './bg6.jpeg';
import { SystemSecurityUpdate } from '@mui/icons-material';

const Classdisplayblock = (props) => {
  const user = window.localStorage.getItem('userrole');

  const [layerstate, updatelayer] = useState(props.v4 == 0 ? true : false);
  const [reqbtn, updatereqbtn] = useState(user == '0' ? false : true);

  const acceptreq = async () => {
    updatelayer(false);
    updatereqbtn(false);

    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'student/info/getbyid',
      {
        student_id: props.v12,
      },
      {
        headers: headers,
      }
    );

    props.acceptclass({
      id: props.v6,
      user_id: result.data.result.user_id,
      credit: props.credit,
    });
  };

  const rejectreq = async () => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'student/info/getbyid',
      {
        student_id: props.v12,
      },
      {
        headers: headers,
      }
    );

    props.rejectclass({
      id: props.v6,
      user_id: result.data.result.user_id,
      credit: props.credit,
    });
  };

  const onclick = () => {
    props.update_dis();
    props.update_dis_value({
      name: student_name,
      id: props.v12,
      topic: props.v1,
      time: props.v11,
    });
  };

  //get the teacher and student details
  const [teacher_name, update_teacher_name] = useState('');
  const [student_name, update_student_name] = useState('');
  const [Loading, setLoading] = useState(false);

  useEffect(async () => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/info/getbyid',
      {
        teacher_id: props.v2,
      },
      {
        headers: headers,
      }
    );

    const result2 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'student/info/getbyid',
      {
        student_id: props.v12,
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
          {props.v4 == 3 && <div className="layer"></div>}
          {props.v4 == 4 && (
            <div className="pending-layer">
              <p>Rejected...</p>
            </div>
          )}
          {layerstate && !reqbtn && (
            <div className="pending-layer">
              <p>Requested...</p>
            </div>
          )}
          {reqbtn && layerstate && (
            <div className="pending-layer">
              <p>Requested...</p>
              <button onClick={onclick} className="reqacptbtn-2">
                i
              </button>
              <button className="reqacptbtn" onClick={acceptreq}>
                Accept
              </button>
              <button id="reqacptbtn2" onClick={rejectreq}>
                Reject
              </button>
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
            <h4>{teacher_name}</h4>
            <h4>classroom id:{props.v3}</h4>
            {/* <h4>student name:{student_name}</h4> */}
          </div>
          <button
            onClick={() => {
              var temp = new Date(props.v11);
              temp.setHours(temp.getHours() - 5);
              temp.setMinutes(temp.getMinutes() - 30);
              if (props.isteacher == false) {
                props.student_view();
                props.student_view_value({
                  topic: props.v1,
                  id_teacher: props.v2,
                  classroom_id: props.v3,
                  status: props.v4,
                  classes_id: props.v6,
                  req_time: ('' + temp).substring(0, 25),
                  id_student: props.v12,
                  Link: props.v13,
                  student_name: student_name,
                });
              } else {
                var temp = new Date(props.v11);
                temp.setHours(temp.getHours() - 5);
                temp.setMinutes(temp.getMinutes() - 30);
                props.teacher_view();
                props.teacher_view_value({
                  topic: props.v1,
                  id_teacher: props.v2,
                  classroom_id: props.v3,
                  status: props.v4,
                  classes_id: props.v6,
                  req_time: ('' + temp).substring(0, 25),
                  id_student: props.v12,
                  student_name: student_name,
                });
              }
            }}
          >
            open
          </button>
        </div>
      )}
    </MatxSuspense>
  );
};

export default Classdisplayblock;

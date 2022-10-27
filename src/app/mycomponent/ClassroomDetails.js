import { React } from 'react';
import { MatxSuspense } from 'app/components';
import { useState, useEffect } from 'react';
import axios from 'axios.js';
import Listclass from './Listclass';
import './mycss.css';
import Classacceptteacher from './Classacceptteacher';
import Studentview from './Studentview';
import Teacherview from './Teacherview';
import './Studentview.css';

const ClassroomDetails = (props) => {
  const [class_list, update_class_list] = useState([]);
  const [req_pop_state, update_req_pop_state] = useState(false);

  const update_req_pop_state_handler = () => {
    if (req_pop_state == true) {
      update_req_pop_state(false);
    } else {
      update_req_pop_state(true);
    }
  };

  const request_class = async (d1, d2, d3, d4, d5) => {
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

    const result3 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'balance/fetch/getbyid/balance',
      {
        user_id: result2.data.result.user_id,
      },
      {
        headers: headers,
      }
    );

    if (result3.data.result.balance >= d5) {
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_URL + 'student/requestclass',
        {
          teacher_id: d1,
          democlass: false,
          starttime: d2,
          topic: d3,
          classroom_id: d4,
          Link: 'wait',
          credit: d5,
        },
        {
          headers: headers,
        }
      );

      const result6 = await axios.post(
        process.env.REACT_APP_BACKEND_URL + 'balance/update/balance',
        {
          user_id: result2.data.result.user_id,
          balance: result3.data.result.balance - d5,
        },
        {
          headers: headers,
        }
      );

      update_class_list([...class_list]);
      window.location.reload();
    } else {
      alert('insufficent balance');
    }
  };

  const acceptreq = async (id) => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/class/response',
      {
        classid: id.id,
        response: 1,
      },
      {
        headers: headers,
      }
    );

    const result4 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/info',
      {},
      {
        headers: headers,
      }
    );

    const result3 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'balance/fetch/getbyid/teacher/balance',
      {
        user_id: result4.data.result.user_id,
      },
      {
        headers: headers,
      }
    );

    const result2 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'balance/update/teacher/balance',
      {
        user_id: result4.data.result.user_id,
        balance: result3.data.result.balance + id.credit,
      },
      {
        headers: headers,
      }
    );
  };

  const rejectreq = async (id) => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/class/response',
      {
        classid: id.id,
        response: 4,
      },
      {
        headers: headers,
      }
    );

    const result3 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'balance/fetch/getbyid/balance',
      {
        user_id: id.user_id,
      },
      {
        headers: headers,
      }
    );

    const result2 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'balance/update/balance',
      {
        user_id: id.user_id,
        balance: result3.data.result.balance + id.credit,
      },
      {
        headers: headers,
      }
    );

    window.location.reload();
  };

  const submit_form = async (event) => {
    event.preventDefault();
    update_req_pop_state_handler();
    const teacher_id = props.teacher;
    const starttime = event.target.req_time.value;
    const topic = event.target.topic.value;

    if (starttime != '' && topic != '') {
      request_class(teacher_id, starttime, topic, props.id, props.credit);
    } else {
      window.alert('all the fields are required');
    }
  };
  const [Loading, setLoading] = useState(false);

  useEffect(async () => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'student/classroom/classes',
      { classroom_id: props.id },
      {
        headers: headers,
      }
    );

    update_class_list(result.data.result);
    setLoading(true);
  }, []);

  const [innerdis, updateinnerdis] = useState(false);
  const [acceptvalue, updateacceptvalues] = useState({});

  const update_dis = () => {
    if (innerdis == true) {
      updateinnerdis(false);
    } else {
      updateinnerdis(true);
    }
  };

  const update_dis_value = (data) => {
    updateacceptvalues(data);
  };

  //student view enable and disable
  const [student, update_student] = useState(true);
  const [student_view_value, update_student_value] = useState({});

  const update_student_handler = () => {
    if (student == true) {
      update_student(false);
    } else {
      update_student(true);
    }
  };

  const [teacher, update_teacher] = useState(true);
  const [teacher_view_value, update_teacher_value] = useState({});

  const update_teacher_handler = () => {
    if (teacher == true) {
      update_teacher(false);
    } else {
      update_teacher(true);
    }
  };

  //get the teacher and student details
  const [teacher_name, update_teacher_name] = useState('');
  const [teacher_time, update_teacher_time] = useState('');
  const [Loading2, setLoading2] = useState(false);

  useEffect(async () => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/info/getbyid',
      {
        teacher_id: props.teacher,
      },
      {
        headers: headers,
      }
    );

    update_teacher_name(result.data.result.Name);
    update_teacher_time(result.data.result.prefer_start_Time);
    setLoading2(true);
  }, []);

  return (
    <MatxSuspense>
      {setLoading && setLoading2 && (
        <div>
          {student && req_pop_state && (
            <div>
              <div className="outer-req-popup" onClick={update_req_pop_state_handler}></div>
              <div className="inner-req-popup">
                <form onSubmit={submit_form}>
                  <label>Teacher Name:</label>
                  <input type="text" disabled value={teacher_name} name="teacher_id"></input>

                  <label>Topic:</label>
                  <input type="text" name="topic"></input>

                  <label>Prefered start time:</label>
                  <input type="time" name="start_time" value={teacher_time} disabled></input>

                  <label>request start time:</label>
                  <input type="datetime-local" name="req_time"></input>
                  <input className="req_btn" value="REQUEST" type="submit"></input>
                </form>
              </div>
            </div>
          )}
          {student && teacher && innerdis && (
            <Classacceptteacher
              updis={update_dis}
              name={acceptvalue.name}
              id={acceptvalue.id}
              time={acceptvalue.time}
              topic={acceptvalue.topic}
            ></Classacceptteacher>
          )}
          {student && teacher && (
            <Listclass
              data={class_list}
              id={2}
              add={!props.isteacher}
              pop_state={update_req_pop_state_handler}
              acptclass={acceptreq}
              rejectclass={rejectreq}
              disacpt={update_dis}
              disacptvalue={update_dis_value}
              studentview={update_student_handler}
              studentviewvalue={update_student_value}
              teacherview={update_teacher_handler}
              teacherviewvalue={update_teacher_value}
              isteacher={props.isteacher}
              isstudent={props.isstudent}
            ></Listclass>
          )}

          {!student && props.isstudent && (
            <Studentview
              onclick={update_student_handler}
              class_detail={student_view_value}
              update_stu_view={props.update_stu_view}
            ></Studentview>
          )}
          {!teacher && props.isteacher && (
            <Teacherview
              onclick={update_teacher_handler}
              class_detail={teacher_view_value}
              update_teacher_view={props.update_teacher_view}
            ></Teacherview>
          )}
        </div>
      )}
    </MatxSuspense>
  );
};

export default ClassroomDetails;

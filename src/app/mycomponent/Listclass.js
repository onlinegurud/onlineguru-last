import { React, useState } from 'react';
import Classdisplayblock from './ClassdisplayBlock';
import ClassdisplayBlock2 from './ClassdisplayBlock2';
import Classdisplayblockreq from './Classdisplayblockreq';
import TeacherblockDisplay from './Teacherblockdisplay';
import { MatxSuspense } from 'app/components';
import './Listclass.css';
import Classacceptteacher from './Classacceptteacher';
import Requestpopup from './Requestpopup';
import { useSlotProps } from '@mui/base';
import { CircularProgress } from '@mui/material';

const Listclass = (data) => {
  const [req, update_req] = useState(false);
  const [req_val, update_req_val] = useState({});
  const [Loading, setLoading] = useState(false);

  const update_req_handler = () => {
    if (req == true) {
      update_req(false);
    } else {
      update_req(true);
    }
  };

  const update_req_value_handler = (data) => {
    update_req_val(data);
  };

  var length = data.data.length;
  console.log(length);
  var temp_length = 0;

  const temp = data.data.map((d) => {
    temp_length++;
    if (data.id == 1) {
      return (
        <MatxSuspense>
          <ClassdisplayBlock2
            v1={d.subject}
            v2={d.id_teacher}
            v3={d.classroom_id}
            v4={d.id_student}
            v5={d.teacher_id}
            status={d.status}
            credit={d.credit}
            update_disp={data.update_dis}
            update_teacher={data.update_dispt}
          ></ClassdisplayBlock2>
        </MatxSuspense>
      );
    } else if (data.id == 2) {
      if (data.dashboard == true && (d.status == 1 || d.status == 0)) {
        return (
          <MatxSuspense>
            <Classdisplayblock
              v1={d.topic}
              v2={d.id_teacher}
              v3={d.id_classroom}
              v4={d.status}
              v5={!data.add}
              v6={d.classes_id}
              v11={d.start_Time}
              v12={d.id_student}
              v13={d.Link}
              credit={d.credit}
              acceptclass={data.acptclass}
              rejectclass={data.rejectclass}
              update_dis={data.disacpt}
              update_dis_value={data.disacptvalue}
              student_view={data.studentview}
              student_view_value={data.studentviewvalue}
              teacher_view={data.teacherview}
              teacher_view_value={data.teacherviewvalue}
              isteacher={data.isteacher}
            ></Classdisplayblock>
          </MatxSuspense>
        );
      } else if (data.dashboard == true && (d.status != 1 || d.status == 0)) {
      } else {
        return (
          <MatxSuspense>
            <Classdisplayblock
              v1={d.topic}
              v2={d.id_teacher}
              v3={d.id_classroom}
              v4={d.status}
              v5={!data.add}
              v6={d.classes_id}
              v11={d.start_Time}
              v12={d.id_student}
              v13={d.Link}
              v14={d.user_id}
              credit={d.credit}
              acceptclass={data.acptclass}
              rejectclass={data.rejectclass}
              update_dis={data.disacpt}
              update_dis_value={data.disacptvalue}
              student_view={data.studentview}
              student_view_value={data.studentviewvalue}
              teacher_view={data.teacherview}
              teacher_view_value={data.teacherviewvalue}
              isteacher={data.isteacher}
            ></Classdisplayblock>
          </MatxSuspense>
        );
      }
    } else if (data.id == 3) {
      return (
        <MatxSuspense>
          <TeacherblockDisplay
            v1={d.Name}
            v2={d.subject}
            v3={d.Email}
            yearofexp={d.yearsofexperience}
            phno={d.phno}
            v4={update_req_handler}
            v5={update_req_value_handler}
            v6={d.teacher_id}
          ></TeacherblockDisplay>
        </MatxSuspense>
      );
    } else {
    }
  });

  if (temp_length == length && Loading != true) {
    setLoading(true);
  }

  return (
    <div>
      {!Loading && <CircularProgress className="circleProgress" />}
      {Loading && (
        <MatxSuspense>
          <div className="wrapper">
            {req && <Requestpopup change_req={update_req_handler} req_value={req_val} />}
            {data.add == true && (
              <Classdisplayblockreq update_req_pop={data.pop_state}></Classdisplayblockreq>
            )}

            {temp}
          </div>
        </MatxSuspense>
      )}
    </div>
  );
};

export default Listclass;

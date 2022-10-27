import { React } from 'react';
import './Classdisplayblock.css';
import { MatxSuspense } from 'app/components';

const TeacherblockDisplay = (props) => {
  return (
    <MatxSuspense>
      <div className="outer-div">
        <img
          style={{ height: '70%', objectFit: 'contain' }}
          src="https://unblast.com/wp-content/uploads/2020/09/Male-Teacher-Illustration.jpg"
        ></img>
        <div className="inner-div">
          <h2>{props.v2}</h2>
          <h4>{props.v1}</h4>
          {/* <h4>{props.v3}</h4> */}
        </div>
        <button
          onClick={() => {
            props.v4();

            props.v5({
              teacher_name: props.v1,
              subject: props.v2,
              email: props.v3,
              exp: props.yearofexp,
              ph: props.phno,
              teacher_id: props.v6,
            });
          }}
        >
          join
        </button>
      </div>
    </MatxSuspense>
  );
};

export default TeacherblockDisplay;

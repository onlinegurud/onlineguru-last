import { React } from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios.js';
import DeleteIcon from '@mui/icons-material/Delete';

import './Liststudent.css';

const Listteacher = (props) => {
  const [status, update_status] = useState(0);

  useEffect(async () => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'admin/fetch/user',
      { user_id: props.user_id },
      {
        headers: headers,
      }
    );

    update_status(result.data.result.Status);
  }, []);

  return (
    <div className="outer-outer">
      {status == 0 && <div className="dis_layer"></div>}

      <div className="lisouter">
        {
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>
        }
        {
          <div className="lisinner-div teacher-1">
            <div className="lisinner-div2 teacher">
              <p className="imp">Teacher ID&emsp;&nbsp;&nbsp;:{props.teacher_id}</p>
              <p className="imp">Name&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;:{props.Name}</p>
              <p>Subject&emsp;&emsp;&emsp;:{props.subject}</p>
              <p>prefered start time&emsp;&nbsp;:{props.prefered_start_time}</p>
              <p>prefered end time&emsp;&nbsp;&nbsp;&nbsp;:{props.prefered_end_time}</p>
              <p>Gender&emsp;&emsp;&emsp;:{props.gender}</p>
              <p>years of experience&emsp;:{props.yearsofexperience}</p>
              <p>Phno&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;:{props.phno}</p>
            </div>
            <div style={{ marginTop: '70px' }} className="lisinner-div2 teacher">
              {/* <p>image&emsp;&emsp;&emsp;&nbsp;:{props.image}</p> */}

              <p>Email&emsp;&emsp;&emsp;&nbsp;:{props.Email}</p>
              <p>Address&emsp;&emsp;&nbsp;:{props.Address}</p>

              <p>City&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;:{props.city}</p>
            </div>

            <button
              className="table-btn"
              onClick={() => {
                props.remove_user({ Email: props.Email });
              }}
            >
              <DeleteIcon id="iicon"></DeleteIcon>remove
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Listteacher;

{
  /* <tr className="table-row">
        <td>{d.user_id}</td>
        <td>{d.teacher_id}</td>
        <td>{d.Name}</td>
        <td>{d.subject}</td>
        <td>{d.prefered_start_time}</td>
        <td>{d.prefered_end_time}</td>
        <td>{d.gender}</td>
        <td>{d.image}</td>
        <td>{d.yearsofexperience}</td>
        <td>{d.phno}</td>
        <td>{d.Email}</td>
        <td>{d.Password}</td>
        <td>{d.Address}</td>
        <td>{d.district}</td>
        <td>{d.City}</td>
        <td>{d.state}</td>
        <td>{d.Country}</td>
        <td>{d.postal_code}</td> */
}

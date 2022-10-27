import { React, useEffect, useState } from 'react';

import axios from 'axios.js';
import EditIcon from '@mui/icons-material/Edit';

import './Profile.css';

const Profilestudent = (props) => {
  const [disab, update_disab] = useState(true);
  const [FirstName, update_FirstName] = useState(props.value.FirstName);
  const [LastName, update_LastName] = useState(props.value.LastName);
  const [Email, update_Email] = useState(props.value.Email);
  const [Standard, update_Standard] = useState(props.value.Standard);
  const [Board, update_Board] = useState(props.value.Board);
  const [Phno, update_Phno] = useState(props.value.phno);
  const [Address, update_Address] = useState(props.value.Address);
  const [City, update_City] = useState(props.value.city);
  const [State, update_State] = useState('');
  const [District, update_District] = useState('');
  const [Country, update_Country] = useState('');
  const [Postal_code, update_Postal_code] = useState('');

  const profile_submit = async (event) => {
    event.preventDefault();

    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'student/update/info',
      {
        FirstName: event.target.FirstName.value,
        LastName: event.target.LastName.value,
        Standard: event.target.Standard.value,
        Board: event.target.Board.value,
        phno: event.target.Phno.value,
        Address: event.target.Address.value,
        district: '',
        city: event.target.City.value,
        country: '',
        state: '',
        postal_code: '9',
      },
      {
        headers: headers,
      }
    );

    window.location.reload();
  };

  return (
    <div className="profile-outer">
      {disab && (
        <button
          id="hh6"
          onClick={() => {
            update_disab(false);
          }}
        >
          <EditIcon></EditIcon>
        </button>
      )}
      <form onSubmit={profile_submit}>
        <div className="profile-inner-1">
          <div className="profile-inner-2">
            <label>First Name&nbsp;&nbsp;</label>
            <input
              type={'text'}
              disabled={disab}
              value={FirstName}
              name={'FirstName'}
              onChange={(event) => {
                update_FirstName(event.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className="profile-inner-1">
          <div className="profile-inner-2">
            <label>Last Name&nbsp;&nbsp;</label>
            <input
              type={'text'}
              disabled={disab}
              value={LastName}
              name={'LastName'}
              onChange={(event) => {
                update_LastName(event.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className="profile-inner-1">
          <div className="profile-inner-2">
            <label>Email&ensp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              type={'text'}
              disabled={true}
              value={Email}
              name={'Email'}
              onChange={(event) => {
                update_Email(event.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className="profile-inner-1">
          <div className="profile-inner-2">
            <label>Standard&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              type={'text'}
              disabled={disab}
              value={Standard}
              name={'Standard'}
              onChange={(event) => {
                update_Standard(event.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className="profile-inner-1">
          <div className="profile-inner-2">
            <label>Phone&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</label>
            <input
              type={'text'}
              disabled={disab}
              value={Phno}
              name={'Phno'}
              onChange={(event) => {
                update_Phno(event.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="profile-inner-1">
          <div className="profile-inner-2">
            <label>
              City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type={'text'}
              disabled={disab}
              value={City}
              name={'City'}
              onChange={(event) => {
                update_City(event.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="profile-inner-1">
          <div className="profile-inner-2">
            <label>Board&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

            <select
              value={Board}
              name={'Board'}
              id={'sele2'}
              onChange={(event) => {
                update_Board(event.target.value);
              }}
            >
              <option value="1">CBSE</option>
              <option value="2">ICSE</option>
              <option value="3">IGCSE</option>
              <option value="4">IB</option>
            </select>
          </div>
        </div>

        <div className="profile-inner-1">
          <div className="profile-inner-2">
            <label>Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              type={'text'}
              disabled={disab}
              value={Address}
              name={'Address'}
              onChange={(event) => {
                update_Address(event.target.value);
              }}
            ></input>
          </div>
        </div>

        {!disab && <input id="sub-btn" type={'submit'} disabled={disab} value={'edit'}></input>}
      </form>
    </div>
  );
};

export default Profilestudent;

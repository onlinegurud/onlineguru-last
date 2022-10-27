import { React, useEffect, useState } from 'react';

import axios from 'axios.js';
import EditIcon from '@mui/icons-material/Edit';

import './Profile.css';

const Profileadmin = (props) => {
  const [disab, update_disab] = useState(true);
  const [Name, update_Name] = useState(props.value.Name);
  const [Email, update_Email] = useState(props.value.Email);
  const [Phno, update_Phno] = useState(props.value.Phno);
  const [Address, update_Address] = useState(props.value.Address);
  const [city, update_city] = useState(props.value.city);
  const [state, update_state] = useState(props.value.state);
  const [district, update_district] = useState(props.value.district);
  const [country, update_country] = useState(props.value.country);
  const [postal_code, update_postal_code] = useState(props.value.postal_code);

  const profile_submit = async (event) => {
    event.preventDefault();

    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'admin/update/info',
      {
        Name: event.target.Name.value,
        phno: event.target.Phno.value,
        Address: event.target.Address.value,
        district: '',
        city: event.target.city.value,
        state: '',
        country: '',
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
      <button
        id="hh6"
        onClick={() => {
          update_disab(false);
        }}
      >
        <EditIcon></EditIcon>
      </button>
      <form onSubmit={profile_submit}>
        <div className="profile-inner-1">
          <div className="profile-inner-2">
            <label>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              type={'text'}
              disabled={disab}
              value={Name}
              name={'Name'}
              onChange={(event) => {
                update_Name(event.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className="profile-inner-1">
          <div className="profile-inner-2">
            <label>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
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
            <label>Phone number</label>
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
            <label>Address&nbsp;&nbsp;&nbsp;</label>
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

        <div className="profile-inner-1">
          <div className="profile-inner-2">
            <label>City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              type={'text'}
              disabled={disab}
              value={city}
              name={'city'}
              onChange={(event) => {
                update_city(event.target.value);
              }}
            ></input>
          </div>
        </div>

        {!disab && <input id="sub-btn" type={'submit'} disabled={disab} value={'edit'}></input>}
      </form>
    </div>
  );
};

export default Profileadmin;

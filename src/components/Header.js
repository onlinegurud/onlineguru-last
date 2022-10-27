import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import MenuIcon from '@mui/icons-material/Menu';

import img1 from '../app/components/ONG_logo-removebg-preview.png';

const Header = (props) => {
  const [state, update_state] = useState(true);
  const [ww, update_ww] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', myfunc);
    if (window.innerWidth <= 990) {
      update_ww(true);
    }
  }, []);

  const myfunc = () => {
    //console.log(window.innerWidth);
    if (window.innerWidth <= 990) {
      update_ww(true);
    } else {
      update_ww(false);
    }
  };

  return (
    <div className={'outer-nav-1'}>
      <img id="company_logo" src={img1}></img>
      <h1 className="nav-company">online guru</h1>

      <div className={state ? 'outer-nav' : props.last ? 'outer-nav-3' : 'outer-nav-2'}>
        <Link to="/home">
          <button
            onClick={() => {
              if (window.innerWidth <= 990) {
                update_state(!state);
              }
            }}
            className="nav"
          >
            Home
          </button>
        </Link>
        <Link to="/facilities">
          <button
            onClick={() => {
              if (window.innerWidth <= 990) {
                update_state(!state);
              }
            }}
            className="nav"
          >
            Facilities
          </button>
        </Link>
        <Link to="/contactus">
          <button
            onClick={() => {
              if (window.innerWidth <= 990) {
                update_state(!state);
              }
            }}
            className="nav"
          >
            Contact us
          </button>
        </Link>
        <Link to="/">
          <button
            onClick={() => {
              if (window.innerWidth <= 990) {
                update_state(!state);
              }
            }}
            className="nav"
          >
            Login
          </button>
        </Link>
      </div>
      {ww && (
        <button
          onClick={() => {
            update_state(!state);
          }}
          id="ham"
        >
          <MenuIcon></MenuIcon>
        </button>
      )}
    </div>
  );
};

export default Header;

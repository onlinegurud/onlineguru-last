import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios.js';
import dotenv from 'dotenv';
import { MatxLoading } from 'app/components';

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

//checked-->used for local storing the email and password of the user
const setSession = (accessToken, role, name) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userrole', role);
    localStorage.setItem('username', name);
    //axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userrole');
    localStorage.removeItem('username');
    //delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //checked-->this method is used for new user registration , it takes email, username and password as parameter and stores these values in the db
  const login = async (email, password) => {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + 'authentication/login', {
      Email: email,
      Password: password,
    });
    if (response.data.status == false) {
      window.alert('incorrect Email or password');
    } else {
      const { status, id, token } = response.data;
      const Position = response.data.data.Position;

      if (status) {
        // const accessToken = jwt.sign({ userId: id }, JWT_SECRET, {
        //   expiresIn: JWT_VALIDITY,
        // });

        const accessToken = { Email: email, Password: password, aToken: token };

        if (Position == 0) {
          const headers = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          };

          const result2 = await axios.post(
            process.env.REACT_APP_BACKEND_URL + 'student/info',
            {},
            {
              headers: headers,
            }
          );

          // const result = await axios.post(
          //   'https://' + process.env.REACT_APP_BACKEND_URL + 'balance/add/balance',
          //   {
          //     user_id: result2.data.result.user_id,
          //     balance: 2000,
          //   },
          //   {
          //     headers: headers,
          //   }
          // );

          setSession(accessToken, 0, result2.data.result.FirstName);
        } else if (Position == 1) {
          const headers = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          };

          const result2 = await axios.post(
            process.env.REACT_APP_BACKEND_URL + 'teacher/info',
            {},
            {
              headers: headers,
            }
          );

          setSession(accessToken, 1, result2.data.result.Name);
        } else if (Position == 2) {
          const headers = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          };

          const result2 = await axios.post(
            process.env.REACT_APP_BACKEND_URL + 'admin/info',
            {},
            {
              headers: headers,
            }
          );

          setSession(accessToken, 2, result2.data.result.Name);
        } else {
          setSession(accessToken, 3, 'superadmin');
        }

        localStorage.setItem('token', token);
        // console.log("........."+accessToken.aToken);
        const user = {
          id: id,
          avatar: id,
          email: email,
          name: id,
          role: Position,
        };

        dispatch({
          type: 'LOGIN',
          payload: {
            user,
          },
        });
      }
    }
  };

  //checked-->this method is used for login of the account , it gets the email and password and checks with the db and returns status as true
  const register = async (P, data) => {
    let tempstatus;

    if (P == 0) {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + 'authentication/register',
        {
          Email: data.Email,
          Position: 0,
          FirstName: data.FirstName,
          LastName: data.LastName,
          Standard: data.Standard,
          Board: data.Board,
          GenderPerference: data.Gender,
          phno: data.phno,
          Password: data.Password,
          Address: data.Address,
          district: data.district,
          city: data.city,
          country: data.country,
          state: data.state,
          postal_code: data.postal_code,
        }
      );
      tempstatus = response.data;
    } else {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + 'authentication/register',
        {
          Name: data.Name,
          Position: 1,
          subject: data.subject,
          prefer_start_Time: data.prefer_start_Time,
          prefer_end_Time: data.prefer_end_Time,
          gender: data.gender,
          image: '',
          yearsofexperience: data.yearsofexperience,
          phno: data.phno,
          Email: data.Email,
          Password: data.Password,
          Address: data.Password,
          district: data.district,
          City: data.city,
          state: data.state,
          Country: data.country,
          postal_code: data.postal_code,
        }
      );
      tempstatus = response.data;
    }

    const { status } = tempstatus;
    const Position = P;
    let username = data.FirstName == undefined ? data.Name : data.FirstName;
    if (status) {
      const accessToken = { Email: data.Email, Password: data.Password };

      setTimeout(async () => {
        if (Position == 0) {
          setSession(accessToken, 0, username);
        } else if (Position == 1) {
          setSession(accessToken, 1, username);
        } else if (Position == 2) {
          setSession(accessToken, 2, username);
        } else {
          setSession(accessToken, 3, 'superadmin');
        }
      }, 5000);

      const user = {
        id: 1,
        avatar: 1,
        email: data.Email,
        name: username,
        role: P,
      };

      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
    }
  };

  //checked-->this method is used for log out of account
  const logout = () => {
    setSession(null, 1, '');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const Position = window.localStorage.getItem('userrole');
        const username = window.localStorage.getItem('username');
        const user = {
          id: 1,
          avatar: 1,
          email: 1,
          name: username,
          role: Position,
        };
        if (accessToken) {
          if (Position == 0) {
            setSession(accessToken, 0, username);
          } else if (Position == 1) {
            setSession(accessToken, 1, username);
          } else if (Position == 2) {
            setSession(accessToken, 2, username);
          } else {
            setSession(accessToken, 3, 'superadmin');
          }
          const response = await axios.post(
            process.env.REACT_APP_BACKEND_URL + 'authentication/login',
            accessToken
          );

          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);

        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
      }}
    >
      {/* {console.log(AuthContext)} */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

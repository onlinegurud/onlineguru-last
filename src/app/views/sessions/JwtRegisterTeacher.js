import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import MenuItem from '@mui/material/MenuItem';

import './Profile.css';
import img1 from './Main_picture.jpg';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRegister = styled(JustifyBox)(() => ({
  backgroundImage: `linear-gradient(to right, #f9b83a, #f8d32a)`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 1200,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  email: '',
  password: '',
  username: '',
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtRegisterTeacher = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const currencies = [
    {
      value: '1',
      label: 'Male',
    },
    {
      value: '2',
      label: 'Female',
    },
    {
      value: '3',
      label: 'Other',
    },
  ];

  const handleFormSubmit = (event) => {
    setLoading(true);

    event.preventDefault();

    if (
      Name == '' ||
      subject == '' ||
      Email == '' ||
      Password == '' ||
      prefered_start_time == '' ||
      prefered_end_time == '' ||
      gender == '' ||
      yearsofexperience == '' ||
      phno == '' ||
      Address == '' ||
      //event.target.district.value == '' ||
      City == ''
      //event.target.state.value == '' ||
      //event.target.Country.value == '' ||
      //event.target.postal_code.value == ''
    ) {
      window.alert('please enter all fields');

      setLoading(false);
    } else {
      try {
        register(1, {
          Name: Name,
          subject: subject,
          Email: Email,
          Password: Password,
          prefer_start_Time: prefered_start_time,
          prefer_end_Time: prefered_end_time,
          gender: gender,
          yearsofexperience: yearsofexperience,
          phno: phno,
          Address: Address,
          district: '',
          city: City,
          state: '',
          country: '',
          postal_code: '9',
        });
        navigate('/');

        window.alert('user registered successfully');
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };

  const [Name, update_Name] = useState('');
  const [subject, update_subject] = useState('');
  const [Email, update_Email] = useState('');
  const [gender, update_gender] = useState('');
  const [Password, update_Password] = useState('');
  const [prefered_start_time, update_prefered_start_time] = useState('');
  const [prefered_end_time, update_prefered_end_time] = useState('');
  const [phno, update_phno] = useState('');
  const [yearsofexperience, update_yearsofexperience] = useState('');
  const [Address, update_Address] = useState('');
  const [City, update_City] = useState('');
  const [state, update_state] = useState('');
  const [district, update_district] = useState('');
  const [Country, update_Country] = useState('');
  const [postal_code, update_postal_code] = useState('');

  const [ev, update_ev] = useState(false);
  const [pv, update_pv] = useState(false);

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img width="100%" alt="Register" src={img1} />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box
              component="form"
              sx={{
                margin: '1%',
                padding: '3%',
                '& .MuiTextField-root': { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="uiform">
                <TextField
                  required
                  margin="dense"
                  id="outlined-required"
                  label="Name"
                  fullWidth
                  sx={{ maxWidth: '45%' }}
                  value={Name}
                  name={'Name'}
                  onChange={(event) => {
                    update_Name(event.target.value);
                  }}
                />
                <TextField
                  required
                  id="outlined-required"
                  margin="dense"
                  label="Subject"
                  sx={{ width: '45%' }}
                  value={subject}
                  name={'subject'}
                  onChange={(event) => {
                    update_subject(event.target.value);
                  }}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  margin="dense"
                  fullWidth
                  error={Boolean(ev)}
                  type={'email'}
                  value={Email}
                  name={'Email'}
                  sx={{ width: '93%' }}
                  onChange={(event) => {
                    const pattern = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
                    let result = pattern.test(event.target.value);

                    if (!result) {
                      update_ev(true);
                    } else {
                      update_ev(false);
                    }
                    update_Email(event.target.value);
                  }}
                />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  margin="dense"
                  autoComplete="current-password"
                  value={Password}
                  sx={{ width: '93%' }}
                  name={'Password'}
                  error={Boolean(pv)}
                  helperText="at least 8 character , 1 number , 1 capital letter , 1 special character"
                  onChange={(event) => {
                    const pattern = new RegExp(
                      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
                    );
                    let result = pattern.test(event.target.value);
                    //console.log(result);
                    if (!result) {
                      update_pv(true);
                    } else {
                      update_pv(false);
                    }
                    update_Password(event.target.value);
                  }}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Phone"
                  sx={{ width: '93%' }}
                  margin="dense"
                  value={phno}
                  name={'phno'}
                  onChange={(event) => {
                    update_phno(event.target.value);
                  }}
                />

                <TextField
                  id="outlined-select-currency"
                  select
                  sx={{ width: '45%' }}
                  label="Gender"
                  margin="dense"
                  value={gender}
                  name={'gender'}
                  onChange={(event) => {
                    update_gender(event.target.value);
                  }}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  required
                  id="outlined-required"
                  label="Years of Expericence"
                  sx={{ width: '45%' }}
                  margin="dense"
                  value={yearsofexperience}
                  name={'yearsofexperience'}
                  onChange={(event) => {
                    update_yearsofexperience(event.target.value);
                  }}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Prefered start Time"
                  sx={{ width: '45%' }}
                  margin="dense"
                  type={'time'}
                  value={prefered_start_time}
                  name={'prefered_start_time'}
                  onChange={(event) => {
                    update_prefered_start_time(event.target.value);
                  }}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Prefered end Time"
                  sx={{ width: '45%' }}
                  margin="dense"
                  type={'time'}
                  value={prefered_end_time}
                  name={'prefered_end_time'}
                  onChange={(event) => {
                    update_prefered_end_time(event.target.value);
                  }}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Address"
                  margin="dense"
                  sx={{ width: '93%' }}
                  value={Address}
                  name={'Address'}
                  onChange={(event) => {
                    update_Address(event.target.value);
                  }}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="City"
                  sx={{ width: '93%' }}
                  margin="dense"
                  value={City}
                  name={'City'}
                  onChange={(event) => {
                    update_City(event.target.value);
                  }}
                />
              </div>

              <FlexBox gap={1} alignItems="center">
                <Checkbox
                  size="small"
                  name="remember"
                  // onChange={handleChange}
                  // checked={values.remember}
                  sx={{ padding: 0, margin: '20px 0px' }}
                />

                <Paragraph fontSize={13}>I have read and agree to the terms of service.</Paragraph>
              </FlexBox>

              <LoadingButton
                type="submit"
                color="primary"
                loading={loading}
                variant="contained"
                onClick={handleFormSubmit}
                sx={{ margin: '10px 0px', width: '100%' }}
              >
                Register
              </LoadingButton>

              <Paragraph>
                Already have an account?
                <NavLink
                  to="/session/signin"
                  style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                >
                  Login
                </NavLink>
              </Paragraph>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegisterTeacher;

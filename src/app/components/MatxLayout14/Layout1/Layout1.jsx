import { ThemeProvider, useMediaQuery } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { MatxSuspense } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { sidenavCompactWidth, sideNavWidth } from 'app/utils/constant';
import React, { useEffect, useRef, useState } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Footer';
import SidenavTheme from '../../MatxTheme/SidenavTheme/SidenavTheme';
import SecondarySidebar from '../../SecondarySidebar/SecondarySidebar';
import Layout1Sidenav from './Layout1Sidenav';
import Layout1Topbar from './Layout1Topbar';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import axios from 'axios.js';
import '../../../mycomponent/Profile.css';

const Layout1Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: theme.palette.background.default,
}));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  overflowY: 'auto',
  overflowX: 'hidden',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexGrow: '1',
  flexDirection: 'column',
}));

const LayoutContainer = styled(Box)(({ width, secondarySidebar }) => ({
  height: '100vh',
  display: 'flex',
  flexGrow: '1',
  flexDirection: 'column',
  verticalAlign: 'top',
  marginLeft: width,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  marginRight: secondarySidebar.open ? 50 : 0,
}));

const Layout1 = () => {
  const { settings, updateSettings } = useSettings();
  const { layout1Settings, secondarySidebar } = settings;
  const topbarTheme = settings.themes[layout1Settings.topbar.theme];
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav },
  } = layout1Settings;

  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case 'full':
        return sideNavWidth;

      case 'compact':
        return sidenavCompactWidth;

      default:
        return '0px';
    }
  };

  const sidenavWidth = getSidenavWidth();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const ref = useRef({ isMdScreen, settings });
  const layoutClasses = `theme-${theme.palette.type}`;

  useEffect(() => {
    let { settings } = ref.current;
    let sidebarMode = settings.layout1Settings.leftSidebar.mode;
    if (settings.layout1Settings.leftSidebar.show) {
      let mode = isMdScreen ? 'close' : sidebarMode;
      updateSettings({ layout1Settings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  const create_admin = async (event) => {
    event.preventDefault();

    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'admin/register',
      {
        Name: Name,
        phno: Phno,
        Email: Email,
        Password: Password,
        Address: Address,
        district: '',
        city: city,
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

  const [Name, update_Name] = useState('');
  const [Password, update_Password] = useState('');
  const [Email, update_Email] = useState('');
  const [Phno, update_Phno] = useState('');
  const [Address, update_Address] = useState('');
  const [city, update_city] = useState('');
  const [state, update_state] = useState('');
  const [district, update_district] = useState('');
  const [country, update_country] = useState('');
  const [postal_code, update_postal_code] = useState('');

  const [ev, update_ev] = useState(false);
  const [pv, update_pv] = useState(false);

  return (
    <Layout1Root className={layoutClasses}>
      {showSidenav && sidenavMode !== 'close' && (
        <SidenavTheme>
          <Layout1Sidenav />
        </SidenavTheme>
      )}

      <LayoutContainer width={sidenavWidth} secondarySidebar={secondarySidebar}>
        {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <Layout1Topbar fixed={true} className="elevation-z8" />
          </ThemeProvider>
        )}

        {settings.perfectScrollbar && (
          <StyledScrollBar>
            {layout1Settings.topbar.show && !layout1Settings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <Layout1Topbar />
              </ThemeProvider>
            )}
            <Box flexGrow={1} position="relative">
              <MatxSuspense>
                <Outlet />
              </MatxSuspense>
            </Box>

            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </StyledScrollBar>
        )}

        {!settings.perfectScrollbar && (
          <ContentBox>
            {layout1Settings.topbar.show && !layout1Settings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <Layout1Topbar />
              </ThemeProvider>
            )}
            <Box flexGrow={1} position="relative">
              <MatxSuspense>
                <div className="profile-outer ">
                  <form onSubmit={create_admin}>
                    <Box
                      component="form"
                      sx={{
                        margin: '2%',
                        padding: '1%',
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
                          sx={{ maxWidth: '44%' }}
                          value={Name}
                          name={'Name'}
                          onChange={(event) => {
                            update_Name(event.target.value);
                          }}
                        />

                        <TextField
                          required
                          id="outlined-required"
                          label="Phone"
                          sx={{ width: '44%' }}
                          margin="dense"
                          value={Phno}
                          name={'Phno'}
                          onChange={(event) => {
                            update_Phno(event.target.value);
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
                            // console.log(result);
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
                          value={city}
                          name={'city'}
                          onChange={(event) => {
                            update_city(event.target.value);
                          }}
                        />
                      </div>
                    </Box>

                    {<input id="sub-btn" type={'submit'} value={'create admin'}></input>}
                  </form>
                </div>
              </MatxSuspense>
            </Box>
          </ContentBox>
        )}

        {settings.footer.show && settings.footer.fixed && <Footer />}
      </LayoutContainer>

      {settings.secondarySidebar.show && <SecondarySidebar />}
    </Layout1Root>
  );
};

export default React.memo(Layout1);

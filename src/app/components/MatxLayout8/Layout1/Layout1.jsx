import { ThemeProvider, useMediaQuery } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { MatxSuspense } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { sidenavCompactWidth, sideNavWidth } from 'app/utils/constant';
import React, { useEffect, useRef, useState } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { Outlet } from 'react-router-dom';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import Footer from '../../Footer';
import SidenavTheme from '../../MatxTheme/SidenavTheme/SidenavTheme';
import SecondarySidebar from '../../SecondarySidebar/SecondarySidebar';
import Layout1Sidenav from './Layout1Sidenav';
import Layout1Topbar from './Layout1Topbar';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import Profilestudent from '../../../mycomponent/Profilestudent';
import axios from 'axios.js';
import './temp_css_1.css';

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

  const [status, updatestatus] = useState(false);

  useEffect(() => {
    let { settings } = ref.current;
    let sidebarMode = settings.layout1Settings.leftSidebar.mode;
    if (settings.layout1Settings.leftSidebar.show) {
      let mode = isMdScreen ? 'close' : sidebarMode;
      updateSettings({ layout1Settings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  const [value, update_value] = useState({});
  const [fetched, update_fetched] = useState(false);
  const [user_id, update_user_id] = useState(0);

  useEffect(async () => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'student/info',
      {},
      {
        headers: headers,
      }
    );

    update_value(result.data.result);
    update_user_id(result.data.result.user_id);
    update_fetched(true);

    const result4 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'balance/fetch/getbyid/balance',
      {
        user_id: result.data.result.user_id,
      },
      {
        headers: headers,
      }
    );

    update_credit(result4.data.result.balance);
  }, []);

  //razorpay payment
  const [amount, update_amount] = useState(0);

  const addBalance = async (a) => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'balance/update/balance',
      {
        user_id: user_id,
        balance: credit + a * 4,
      },
      {
        headers: headers,
      }
    );

    window.location.reload();
  };

  const handleSubmit = (e) => {
    var options = {
      key: 'rzp_test_qsS6LKMmQgzOHH',
      key_secret: 'nYNW83CGbJHjShfQCsXalhxt',
      amount: amount * 100,
      currency: 'INR',
      name: 'ONLINE_GURU',
      description: 'for testing purpose',
      handler: function (response) {
        //console.log(response);
        addBalance(amount);
        //window.location.reload();
      },
      prefill: {
        name: 'karupaiya',
        email: 'chukarupaiya@gmail.com',
        contact: '9629957549',
      },
      notes: {
        address: 'Razorpay Corporate office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  const [credit, update_credit] = useState(0);

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
                <div className="credit-class">
                  <h2>BALANCE CREDIT</h2>
                  <h3>{credit}</h3>

                  {status && (
                    <div>
                      <TextField
                        required
                        margin="dense"
                        id="outlined-required"
                        label="Add Amount"
                        fullWidth
                        sx={{ maxWidth: '50%' }}
                        type={'number'}
                        value={amount}
                        onChange={(event) => {
                          update_amount(event.target.value);
                        }}
                      />

                      <button className="creditbtn" onClick={handleSubmit}>
                        <CurrencyRupeeIcon id="iicon"></CurrencyRupeeIcon>pay
                      </button>
                    </div>
                  )}

                  {!status && (
                    <button
                      className="creditbtn"
                      onClick={() => {
                        updatestatus(true);
                      }}
                    >
                      <CurrencyRupeeIcon id="iicon"></CurrencyRupeeIcon>ADD CREDIT
                    </button>
                  )}
                </div>
                {fetched && <Profilestudent value={value}></Profilestudent>}
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

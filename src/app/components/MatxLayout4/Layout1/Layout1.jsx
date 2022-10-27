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

import Listclass from '../../../mycomponent/Listclass.js';
import Teacherview from '../../../mycomponent/Teacherview.js';
import '../../../mycomponent/mycss.css';
import axios from 'axios.js';
import Classacceptteacher from 'app/mycomponent/Classacceptteacher';
import useAuth from 'app/hooks/useAuth';

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

  const [class_list, update_class_list] = useState([]);
  const { logout, user } = useAuth();

  useEffect(async (email, password) => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/classes',
      {},
      {
        headers: headers,
      }
    );

    if (result.data.statusMessage == 'Token Forbidden') {
      logout();
    }

    update_class_list(result.data.result);
  }, []);

  // console.log(class_list);

  const [innerdis, updateinnerdis] = useState(false);

  const update_dis = () => {
    if (innerdis == true) {
      updateinnerdis(false);
    } else {
      updateinnerdis(true);
    }
  };

  const [balance, update_balance] = useState(0);

  const acceptreq = async (id) => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/class/response',
      {
        classid: id.id,
        response: 1,
      },
      {
        headers: headers,
      }
    );

    const result4 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/info',
      {},
      {
        headers: headers,
      }
    );

    const result3 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'balance/fetch/getbyid/teacher/balance',
      {
        user_id: result4.data.result.user_id,
      },
      {
        headers: headers,
      }
    );

    const result2 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'balance/update/teacher/balance',
      {
        user_id: result4.data.result.user_id,
        balance: result3.data.result.balance + id.credit,
      },
      {
        headers: headers,
      }
    );

    console.log('hii');
  };

  const rejectreq = async (id) => {
    const accessToken = window.localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    };

    const result = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'teacher/class/response',
      {
        classid: id.id,
        response: 4,
      },
      {
        headers: headers,
      }
    );

    const result3 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'balance/fetch/getbyid/balance',
      {
        user_id: id.user_id,
      },
      {
        headers: headers,
      }
    );

    const result2 = await axios.post(
      process.env.REACT_APP_BACKEND_URL + 'balance/update/balance',
      {
        user_id: id.user_id,
        balance: result3.data.result.balance + id.credit,
      },
      {
        headers: headers,
      }
    );

    window.location.reload();
  };

  //student view enable and disable
  const [teacher, update_teacher] = useState(true);
  const [teacher_view_value, update_teacher_value] = useState({});

  const update_teacher_handler = () => {
    if (teacher == true) {
      update_teacher(false);
    } else {
      update_teacher(true);
    }
  };

  const [teacher_view, update_teacher_view] = useState(true);

  //extra
  const [acceptvalue, updateacceptvalues] = useState({});
  const update_dis_value = (data) => {
    updateacceptvalues(data);
  };

  return (
    <Layout1Root className={layoutClasses}>
      {teacher_view && showSidenav && sidenavMode !== 'close' && (
        <SidenavTheme>
          <Layout1Sidenav />
        </SidenavTheme>
      )}

      <LayoutContainer width={sidenavWidth} secondarySidebar={secondarySidebar}>
        {teacher_view && layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
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
                {!teacher && teacher_view && (
                  <button id="gobackbtn" onClick={update_teacher_handler}>
                    {'<< go back to classes'}
                  </button>
                )}
                {teacher && (
                  <Listclass
                    data={class_list}
                    id={2}
                    acptclass={acceptreq}
                    rejectclass={rejectreq}
                    disacpt={update_dis}
                    disacptvalue={update_dis_value}
                    teacherview={update_teacher_handler}
                    teacherviewvalue={update_teacher_value}
                    dashboard={true}
                    isteacher={true}
                  />
                )}
                {teacher && innerdis && (
                  <Classacceptteacher
                    updis={update_dis}
                    name={acceptvalue.name}
                    id={acceptvalue.id}
                    time={acceptvalue.time}
                    topic={acceptvalue.topic}
                  ></Classacceptteacher>
                )}

                {!teacher && (
                  <Teacherview
                    onclick={update_teacher_handler}
                    class_detail={teacher_view_value}
                    update_teacher_view={update_teacher_view}
                  ></Teacherview>
                )}
              </MatxSuspense>
            </Box>

            {/* {settings.footer.show && !settings.footer.fixed && <Footer />} */}
          </ContentBox>
        )}

        {settings.footer.show && settings.footer.fixed && <Footer />}
      </LayoutContainer>

      {settings.secondarySidebar.show && <SecondarySidebar />}
    </Layout1Root>
  );
};

export default React.memo(Layout1);

import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

import ClassroomRoutes from './myroutes/ClassroomRoutes';
import ClassroomNew from './myroutes/ClassroomNew';
import Teacherdashboard from './myroutes/Teacherdashboard';
import Teacherclassroom from './myroutes/Teacherclassroom';
import Adminstudent from './myroutes/Adminstudent';
import Adminteacher from './myroutes/Adminteacher';
import Profilestudent from './myroutes/Profilestudent';
import Profileteacher from './myroutes/Profileteacher';
import Profileadmin from './myroutes/Profileadmin';
import Superadminstudent from './myroutes/Superadminstudent';
import Superadminteacher from './myroutes/Superadminteacher';
import Superadminadmin from './myroutes/Superadminadmin';
import Createadmin from './myroutes/Createadmin';
import Studentrating from './myroutes/Studentrating';
import Teacherrating from './myroutes/Teacherrating';
import Adminclassroom from './myroutes/Adminclassroom';
import Adminteacherupdate from './myroutes/Adminteacherupdate';

import MatxLayout2 from './components/MatxLayout2/MatxLayout';
import MatxLayout3 from './components/MatxLayout3/MatxLayout';
import MatxLayout4 from './components/MatxLayout4/MatxLayout';
import MatxLayout5 from './components/MatxLayout5/MatxLayout';
import MatxLayout6 from './components/MatxLayout6/MatxLayout';
import MatxLayout7 from './components/MatxLayout7/MatxLayout';
import MatxLayout8 from './components/MatxLayout8/MatxLayout';
import MatxLayout9 from './components/MatxLayout9/MatxLayout';
import MatxLayout10 from './components/MatxLayout10/MatxLayout';
import MatxLayout11 from './components/MatxLayout11/MatxLayout';
import MatxLayout12 from './components/MatxLayout12/MatxLayout';
import MatxLayout13 from './components/MatxLayout13/MatxLayout';
import MatxLayout14 from './components/MatxLayout14/MatxLayout';
import MatxLayout15 from './components/MatxLayout15/MatxLayout';
import MatxLayout16 from './components/MatxLayout16/MatxLayout';
import MatxLayout17 from './components/MatxLayout17/MatxLayout';
import MatxLayout18 from './components/MatxLayout18/MatxLayout';

const Summa = () => {
  const user = window.localStorage.getItem('userrole');
  // console.log('aaaaaa' + user);
  if (user == 0) {
    return <Navigate to="dashboard/default" />;
  } else if (user == 1) {
    return <Navigate to="teacher/dashboard" />;
  } else if (user == 2) {
    return <Navigate to="admin/student" />;
  } else {
    return <Navigate to="superadmin/student" />;
  }
};

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes],
  },
  ...sessionRoutes,
  {
    element: (
      <AuthGuard>
        <MatxLayout2 />
      </AuthGuard>
    ),
    children: [...ClassroomRoutes],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout3 />
      </AuthGuard>
    ),
    children: [...ClassroomNew],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout4 />
      </AuthGuard>
    ),
    children: [...Teacherdashboard],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout5 />
      </AuthGuard>
    ),
    children: [...Teacherclassroom],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout6 />
      </AuthGuard>
    ),
    children: [...Adminstudent],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout7 />
      </AuthGuard>
    ),
    children: [...Adminteacher],
  },
  {
    path: '/',
    element: <Summa />,
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout8 />
      </AuthGuard>
    ),
    children: [...Profilestudent],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout9 />
      </AuthGuard>
    ),
    children: [...Profileteacher],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout10 />
      </AuthGuard>
    ),
    children: [...Profileadmin],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout11 />
      </AuthGuard>
    ),
    children: [...Superadminstudent],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout12 />
      </AuthGuard>
    ),
    children: [...Superadminteacher],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout13 />
      </AuthGuard>
    ),
    children: [...Superadminadmin],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout14 />
      </AuthGuard>
    ),
    children: [...Createadmin],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout15 />
      </AuthGuard>
    ),
    children: [...Studentrating],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout16 />
      </AuthGuard>
    ),
    children: [...Teacherrating],
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout17 />
      </AuthGuard>
    ),
    children: [...Adminclassroom],
  },

  {
    element: (
      <AuthGuard>
        <MatxLayout18 />
      </AuthGuard>
    ),
    children: [...Adminteacherupdate],
  },

  // { path: '/classroom', element: <Navigate to="dashboard/classroom" /> },
  // { path: '*', element: <NotFound /> },
];

export default routes;

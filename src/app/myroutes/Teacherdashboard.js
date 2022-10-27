import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../auth/authRoles';

const Temp = Loadable(lazy(() => import('./Classroom_layout')));

const Teacherdashboard = [
  { path: '/teacher/dashboard', element: <Temp />, auth: authRoles.teacher },
];

export default Teacherdashboard;

import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../auth/authRoles';

const Temp = Loadable(lazy(() => import('./Classroom_layout')));

const Adminteacherupdate = [
  { path: '/admin/teacher/update', element: <Temp />, auth: authRoles.admin },
];

export default Adminteacherupdate;

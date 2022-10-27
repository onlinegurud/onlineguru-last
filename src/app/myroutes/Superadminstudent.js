import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../auth/authRoles';

const Temp = Loadable(lazy(() => import('./Classroom_layout')));

const Superadminstudent = [
  { path: '/superadmin/student', element: <Temp />, auth: authRoles.admin },
];

export default Superadminstudent;

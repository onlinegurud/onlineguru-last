import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../auth/authRoles';

const Temp = Loadable(lazy(() => import('./Classroom_layout')));

const Adminstudent = [{ path: '/admin/student', element: <Temp />, auth: authRoles.admin }];

export default Adminstudent;

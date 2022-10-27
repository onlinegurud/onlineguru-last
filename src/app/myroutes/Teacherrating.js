import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../auth/authRoles';

const Temp = Loadable(lazy(() => import('./Classroom_layout')));

const Teacherrating = [{ path: '/teacher/rating', element: <Temp />, auth: authRoles.teacher }];

export default Teacherrating;

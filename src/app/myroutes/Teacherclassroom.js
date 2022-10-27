import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../auth/authRoles';

const Temp = Loadable(lazy(() => import('./Classroom_layout')));

const Teacherclassroom = [
  { path: '/teacher/classroom', element: <Temp />, auth: authRoles.teacher },
];

export default Teacherclassroom;

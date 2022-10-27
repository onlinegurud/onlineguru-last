//checked
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('./JwtRegister')));
const JwtRegisterStudent = Loadable(lazy(() => import('./JwtRegisterStudent')));
const JwtRegisterTeacher = Loadable(lazy(() => import('./JwtRegisterTeacher')));

const sessionRoutes = [
  { path: '/session/signup', element: <JwtRegister /> },
  { path: 'session/signup/student', element: <JwtRegisterStudent></JwtRegisterStudent> },
  { path: 'session/signup/teacher', element: <JwtRegisterTeacher></JwtRegisterTeacher> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/session/404', element: <NotFound /> },
];

export default sessionRoutes;

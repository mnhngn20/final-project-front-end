import { loadable } from '#/shared/utils/loadable';
import { useRoutes } from 'react-router-dom';
import GuardRoute from './GuardRoute';
import PrivateRoute from './PrivateRoute';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(utc);

const Login = loadable(import('../pages/Login'));
const Signup = loadable(import('../pages/Signup'));
const SignupConfirm = loadable(import('../pages/SignupConfirm'));
const ForgotPassword = loadable(import('../pages/ForgotPassword'));
const ResetPassword = loadable(import('../pages/ResetPassword'));

const App = () => {
  const routes = useRoutes([
    {
      element: (
        <GuardRoute>
          <Login />
        </GuardRoute>
      ),
      path: 'login',
    },
    {
      element: (
        <GuardRoute>
          <Signup />
        </GuardRoute>
      ),
      path: 'signup',
    },
    {
      element: (
        <GuardRoute>
          <SignupConfirm />
        </GuardRoute>
      ),
      path: 'signup-confirm',
    },
    {
      element: (
        <GuardRoute>
          <ForgotPassword />
        </GuardRoute>
      ),
      path: '/forgot-password',
    },
    {
      element: (
        <GuardRoute>
          <ResetPassword />
        </GuardRoute>
      ),
      path: '/reset-password',
    },
    {
      element: (
        <GuardRoute isPrivate>
          <PrivateRoute />
        </GuardRoute>
      ),
      path: '/*',
    },
  ]);

  return routes;
};

export default App;

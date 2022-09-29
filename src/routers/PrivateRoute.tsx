import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import PrivateLayout from '#/shared/components/layout/PrivateLayout';
import { loadable } from '#/shared/utils/loadable';
import { useMeQuery } from '#/generated/schemas';
import { clearToken } from '#/shared/utils/token';
import { userVar } from '#/graphql/cache';
import { showError } from '#/shared/utils/notification';

const Dashboard = loadable(import('#/pages/Dashboard'));
const Customers = loadable(import('#/pages/Customers'));

function PrivateRoute() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data } = useMeQuery({
    onCompleted(data) {
      userVar(data?.me?.user ?? {});
    },
    onError(error) {
      showError(error);
      logout();
    },
  });

  const logout = () => {
    clearToken();
    navigate('/login');
  };

  const routes = useRoutes([
    { element: <Customers />, path: '/customers' },
    { element: <Dashboard />, path: '/' },
  ]);

  return pathname?.split('/')?.[1] === 'funeral-plan' ? (
    routes
  ) : (
    <PrivateLayout user={data?.me?.user ?? {}} logout={logout}>
      {routes}
    </PrivateLayout>
  );
}

export default PrivateRoute;

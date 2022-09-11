import { useLocation, useRoutes } from 'react-router-dom';
import PrivateLayout from '#/shared/components/layout/PrivateLayout';
import { loadable } from '#/shared/utils/loadable';

const Dashboard = loadable(import('#/pages/Dashboard'));
const NotFound = loadable(import('#/pages/404Page'));
const Profile = loadable(import('#/pages/Profile'));
const PlanPackages = loadable(import('#/pages/PlanPackages'));
const FuneralPlan = loadable(import('#/pages/FuneralPlan'));

function PrivateRoute() {
  const { pathname } = useLocation();

  const routes = useRoutes([
    { element: <Dashboard />, path: '/' },
    {
      children: [
        { element: <FuneralPlan />, index: true },
        { element: <FuneralPlan />, path: ':sectionIds' },
      ],
      path: 'funeral-plan',
    },
    { element: <PlanPackages />, path: 'plan-packages' },
    { element: <Profile />, path: 'my-profile' },
    { element: <NotFound />, path: '*' },
  ]);

  return pathname?.split('/')?.[1] === 'funeral-plan' ? (
    routes
  ) : (
    <PrivateLayout>{routes}</PrivateLayout>
  );
}

export default PrivateRoute;

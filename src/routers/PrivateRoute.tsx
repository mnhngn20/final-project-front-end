import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import PrivateLayout from '#/shared/components/layout/PrivateLayout';
import { loadable } from '#/shared/utils/loadable';
import { useMeQuery } from '#/generated/schemas';
import { clearToken } from '#/shared/utils/token';
import { userVar } from '#/graphql/cache';
import { showError } from '#/shared/utils/notification';

const Dashboard = loadable(import('#/pages/Dashboard'));
const Customers = loadable(import('#/pages/Customers'));
const CustomerDetail = loadable(import('#/pages/Customers/Detail'));
const Profile = loadable(import('#/pages/Profile'));
const Rooms = loadable(import('#/pages/Rooms'));
const RoomDetail = loadable(import('#/pages/Rooms/Detail'));
const Equipments = loadable(import('#/pages/Equipments'));
const Amenities = loadable(import('#/pages/Amenities'));
const Location = loadable(import('#/pages/Location'));
const Incidents = loadable(import('#/pages/Incidents'));
const IncidentDetail = loadable(import('#/pages/Incidents/Detail'));
const LocationReservationDetail = loadable(
  import('#/pages/LocationReservations/Detail'),
);
const LocationReservations = loadable(import('#/pages/LocationReservations'));

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
    fetchPolicy: 'network-only',
  });

  const logout = () => {
    clearToken();
    navigate('/login');
  };

  const routes = useRoutes([
    {
      path: '/my-location',
      children: [
        {
          index: true,
          element: <Location />,
        },
      ],
    },
    {
      path: '/customers',
      children: [
        {
          index: true,
          element: <Customers />,
        },
        {
          path: ':id',
          element: <CustomerDetail />,
        },
      ],
    },
    {
      path: '/incidents',
      children: [
        {
          index: true,
          element: <Incidents />,
        },
        {
          path: ':id',
          element: <IncidentDetail />,
        },
      ],
    },
    {
      path: '/location-reservations',
      children: [
        {
          index: true,
          element: <LocationReservations />,
        },
        {
          path: ':id',
          element: <LocationReservationDetail />,
        },
      ],
    },
    {
      path: '/amenities',
      children: [
        {
          index: true,
          element: <Amenities />,
        },
      ],
    },
    {
      path: '/equipments',
      children: [
        {
          index: true,
          element: <Equipments />,
        },
      ],
    },
    {
      path: '/rooms',
      children: [
        {
          index: true,
          element: <Rooms />,
        },
        {
          path: ':id',
          element: <RoomDetail />,
        },
      ],
    },
    { element: <Profile />, path: '/profile' },
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

import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import PrivateLayout from '#/shared/components/layout/PrivateLayout';
import { loadable } from '#/shared/utils/loadable';
import { useMeQuery } from '#/generated/schemas';
import { clearToken } from '#/shared/utils/token';
import { userVar } from '#/graphql/cache';
import { showError } from '#/shared/utils/notification';
import { Button, Modal, Typography } from 'antd';
import { StripeFilledSVG, StripeLogoSVG } from '#/assets/svgs';

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
const StripeConnectSuccess = loadable(import('#/pages/Stripe/Success'));
const ConnectingStripe = loadable(import('#/pages/Stripe/ConnectingStripe'));

function PrivateRoute() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data } = useMeQuery({
    onCompleted(data) {
      if (
        !data?.me?.user?.location?.stripeAccountId &&
        !pathname.includes('stripe-connect')
      ) {
        Modal.warning({
          centered: true,
          closable: true,
          maskClosable: true,
          icon: <></>,
          width: 600,
          okText: 'Close',
          onCancel() {
            clearToken();
            navigate('/login');
          },
          onOk() {
            clearToken();
            navigate('/login');
          },
          content: (
            <div className="flex flex-col gap-8">
              <Typography className="text-center text-xl font-bold uppercase text-primary-color">
                Setup your account with Stripe
              </Typography>
              <StripeLogoSVG width={144} height={144} />
              <Typography.Paragraph>
                We have partnered with Stripe to automatically generate your
                invoice to provide instant payments to your account after a
                tutoring session is completed. No manual invoices. No hassle.
              </Typography.Paragraph>
              <div className="flex h-full w-full items-center justify-center">
                <a
                  href={`https://connect.stripe.com/express/oauth/v2/authorize?response_type=code&client_id=${
                    import.meta.env.VITE_STRIPE_CLIENT_ID
                  }&redirect_uri=${import.meta.env.VITE_STRIPE_REDIRECT_URL}`}
                  className="inline-flex items-center gap-1"
                >
                  <Button
                    type="primary"
                    className="flex h-[3rem] items-center justify-center border-none bg-[#6772E5]"
                    icon={
                      <StripeFilledSVG
                        width={20}
                        height={20}
                        className="anticon"
                      />
                    }
                  >
                    Connect To Stripe
                  </Button>
                </a>
              </div>
            </div>
          ),
        });
      }

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
    {
      path: '/stripe-connect',
      children: [
        { index: true, element: <ConnectingStripe /> },
        { path: 'success', element: <StripeConnectSuccess /> },
      ],
    },
    { element: <Location />, path: '/' },
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

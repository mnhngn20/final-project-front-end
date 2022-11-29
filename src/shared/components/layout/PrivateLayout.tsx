import Icon from '@ant-design/icons';
import ProLayout, { ProLayoutProps } from '@ant-design/pro-layout';
import { Route } from '@ant-design/pro-layout/es/typings';
import { Alert } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RightContentHeader from './RightContentHeader';
import Logo from '#/assets/images/logo.png';
import { appConfig } from '#/configs/config';
import {
  BuildingFilledSVG,
  CustomerSVG,
  DevicesFilledSVG,
  HouseSVG,
  LampFilledSVG,
  ReceiptFilledSVG,
  WarningFilledSVG,
} from '#/assets/svgs';
import { User } from '#/generated/schemas';
import { MenuSidebarItem } from '../commons/MenuSideBarItem';
import { DeepPartial } from '#/shared/utils/type';
import useWatchFirebaseMessaging from '#/shared/hooks/useWatchFirebaseMessaging';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import { getToken } from '#/shared/utils/token';

interface Props {
  logout: () => void;
  user: DeepPartial<User>;
}

let firebaseInitialized = false;

function PrivateLayout({
  children,
  logout,
  user,
}: React.PropsWithChildren<Props>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation();
  const settings: ProLayoutProps = {
    fixSiderbar: true,
    fixedHeader: true,
    layout: 'mix',
    title: appConfig.title,
  };
  const currentUser = useReactiveVar(userVar);
  const { watchFirebaseInstallation } = useWatchFirebaseMessaging();

  useEffect(() => {
    if (!!getToken() && currentUser?.id && !firebaseInitialized) {
      watchFirebaseInstallation();
      firebaseInitialized = true;
    }
  }, [watchFirebaseInstallation, currentUser?.id]);

  const ROUTES: Route = {
    routes: [
      {
        icon: <Icon component={BuildingFilledSVG} />,
        name: 'My Location',
        path: '/my-location',
      },
      {
        icon: <Icon component={CustomerSVG} />,
        name: 'Customers',
        path: '/customers',
      },
      {
        icon: <Icon component={HouseSVG} />,
        name: 'Rooms',
        path: '/rooms',
      },
      {
        icon: <Icon component={DevicesFilledSVG} />,
        name: 'Equipments',
        path: '/equipments',
      },
      {
        icon: <Icon component={LampFilledSVG} />,
        name: 'Amenities',
        path: '/amenities',
      },
      {
        icon: <Icon component={ReceiptFilledSVG} />,
        name: 'Reservations',
        path: '/location-reservations',
      },
      {
        icon: <Icon component={ReceiptFilledSVG} />,
        name: 'Payments',
        path: '/payments',
      },
      {
        icon: <Icon component={WarningFilledSVG} />,
        name: 'Incidents',
        path: '/incidents',
      },
    ],
  };

  return (
    <div className="h-screen">
      <ProLayout
        route={ROUTES}
        logo={isCollapsed ? Logo : appConfig.logo}
        location={{
          pathname,
        }}
        menuItemRender={MenuSidebarItem}
        rightContentRender={() => (
          <RightContentHeader logout={logout} user={user} />
        )}
        collapsed={isCollapsed}
        onCollapse={setIsCollapsed}
        headerTheme="light"
        navTheme="light"
        {...settings}
      >
        <Alert.ErrorBoundary>{children}</Alert.ErrorBoundary>
      </ProLayout>
    </div>
  );
}

export default PrivateLayout;

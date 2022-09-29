import Icon from '@ant-design/icons';
import ProLayout, { ProLayoutProps } from '@ant-design/pro-layout';
import { Route } from '@ant-design/pro-layout/es/typings';
import { Alert } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RightContentHeader from './RightContentHeader';
import Logo from '#/assets/images/logo.png';
import { appConfig } from '#/configs/config';
import { CustomerSVG, DashboardSVG } from '#/assets/svgs';
import { User } from '#/generated/schemas';
import { MenuSidebarItem } from '../commons/MenuSideBarItem';
import { DeepPartial } from '#/shared/utils/type';

interface Props {
  logout: () => void;
  user: DeepPartial<User>;
}

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

  const ROUTES: Route = {
    routes: [
      {
        icon: <Icon component={DashboardSVG} />,
        name: 'Dashboard',
        path: '/',
      },
      {
        icon: <Icon component={CustomerSVG} />,
        name: 'Customers',
        path: '/customers',
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
        {...settings}
      >
        <Alert.ErrorBoundary>{children}</Alert.ErrorBoundary>
      </ProLayout>
    </div>
  );
}

export default PrivateLayout;

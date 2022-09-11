import { Avatar, Dropdown, Menu, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import DefaultAvatar from '#/assets/images/avatar.png';
import { NavItem } from '#/shared/utils/type';
import { CardSVG, LogoutSVG, MyProfileSVG, StarSVG } from '#/assets/svgs';
import { clearToken } from '#/shared/utils/token';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

type AccountInfoNavItem = NavItem & { onClick?: () => void };

function AccountInfo() {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();
  const logout = () => {
    clearToken();
    navigate('/login');
  };

  const items: AccountInfoNavItem[] = [
    {
      activeHrefs: ['/my-profile'],
      href: '/my-profile',
      icon: <Icon component={MyProfileSVG} className="scale-150" />,
      title: 'userMenu.myProfile',
    },
    {
      activeHrefs: ['/my-profile'],
      href: '/plan-package',
      icon: <Icon component={StarSVG} className="scale-150" />,
      title: 'userMenu.planPackage',
    },
    {
      activeHrefs: ['/payment'],
      href: '/payment',
      icon: <Icon component={CardSVG} className="scale-150" />,
      title: 'userMenu.payment',
    },
    {
      activeHrefs: [''],
      icon: <Icon component={LogoutSVG} className="scale-150" />,
      onClick: logout,
      title: 'userMenu.logout',
    },
  ];

  const overlay = (
    <Menu
      items={items?.map((item, index) => ({
        key: index,
        label: (
          <div className="min-w-[10rem] cursor-pointer py-1">
            {item?.onClick ? (
              <span onClick={item?.onClick} className="flex items-center gap-4">
                {item?.icon}
                {t(item?.title)}
              </span>
            ) : (
              <Link to={item?.href ?? '/'}>
                <Typography className="flex items-center gap-4">
                  {item?.icon}
                  {t(item?.title)}
                </Typography>
              </Link>
            )}
          </div>
        ),
      }))}
      mode="horizontal"
    />
  );

  return (
    <Dropdown overlay={overlay}>
      <div className="flex items-center gap-2">
        <Avatar src={DefaultAvatar} size={32} />
        <div className="flex flex-col">
          <Typography className="text-xs font-bold">Thanh Nguyen</Typography>
          <Typography className="text-xs">Individual</Typography>
        </div>
      </div>
    </Dropdown>
  );
}

export default AccountInfo;

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import DefaultImage from '#/assets/images/logo.png';
import { DeepPartial } from '#/shared/utils/type';

interface Props {
  logout: () => void;
  user: DeepPartial<Record<string, string>>;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
}

function RightContentHeader({ logout, user, setCollapse, isCollapsed }: Props) {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item onClick={() => navigate('/profile')} key="userInfo">
        {t('header.profile')}
      </Menu.Item>
      <Menu.Item onClick={logout} key="logout">
        {t('button.logout')}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex w-full justify-between">
      <div className="relative items-center">
        {isCollapsed ? (
          <MenuUnfoldOutlined onClick={() => setCollapse(!isCollapsed)} />
        ) : (
          <MenuFoldOutlined onClick={() => setCollapse(!isCollapsed)} />
        )}
      </div>
      <div className="flex">
        <Dropdown overlay={menu}>
          <div className="flex items-center">
            <div className="mr-2 flex flex-col items-end leading-tight">
              {user?.fullName ?? ''}
            </div>
            <Avatar size="large" src={user?.avatar ?? DefaultImage} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default RightContentHeader;

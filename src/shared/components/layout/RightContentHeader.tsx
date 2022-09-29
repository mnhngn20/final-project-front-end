import { Avatar, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import DefaultImage from '#/assets/images/logo.png';
import { DeepPartial } from '#/shared/utils/type';
import { User } from '#/generated/schemas';

interface Props {
  logout: () => void;
  user: DeepPartial<User>;
}

function RightContentHeader({ logout, user }: Props) {
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
    <div className="flex items-center justify-between gap-4">
      <div className="flex">
        <Dropdown overlay={menu}>
          <div className="flex items-center">
            <div className="mr-2 flex flex-col items-end leading-tight">
              {user?.name ?? ''}
            </div>
            <Avatar size="large" src={user?.avatar ?? DefaultImage} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default RightContentHeader;

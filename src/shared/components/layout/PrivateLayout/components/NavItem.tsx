import { Link, useLocation } from 'react-router-dom';
import { Dropdown, Menu, Typography } from 'antd';
import { NavItem as NavItemType } from '#/shared/utils/type';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface NavItemProps {
  item: NavItemType;
}

function NavItem({ item }: NavItemProps) {
  const { t } = useTypeSafeTranslation();
  const { pathname } = useLocation();
  const isActive = item?.activeHrefs?.includes(pathname);

  const overlay = item?.subItems ? (
    <Menu
      items={item?.subItems?.map((menuItem, index) => ({
        key: index,
        label: (
          <div className="min-w-[10rem] py-1 hover:text-primary-color">
            {menuItem?.title && t(menuItem?.title)}
          </div>
        ),
      }))}
      mode="horizontal"
    />
  ) : (
    <div />
  );

  return (
    <Dropdown overlay={overlay} placement="bottomLeft">
      <div className="flex cursor-pointer items-center gap-2">
        {item?.href ? (
          <Link to={item?.href}>
            <Typography
              className={`text-base ${
                isActive ? 'font-semibold text-primary-color' : ''
              }`}
            >
              {t(item?.title)}
            </Typography>
          </Link>
        ) : (
          <Typography
            className={`text-base ${
              isActive ? 'font-semibold text-primary-color' : ''
            }`}
          >
            {t(item?.title)}
          </Typography>
        )}
        {item?.icon}
      </div>
    </Dropdown>
  );
}

export default NavItem;

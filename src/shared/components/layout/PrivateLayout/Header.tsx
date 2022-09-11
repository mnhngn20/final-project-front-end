import { Col, Image, Row } from 'antd';
import Icon from '@ant-design/icons';
import { Link } from 'react-router-dom';
import NavItem from './components/NavItem';
import AccountInfo from './components/AccountInfo';
import LogoFull from '#/assets/images/logo-full.png';
import { ArrowDownSVG, MessageSVG, NotificationSVG } from '#/assets/svgs';
import { NavItem as NavItemType } from '#/shared/utils/type';

const navItems: NavItemType[] = [
  {
    activeHrefs: ['/my-plan'],
    href: '/my-plan',
    title: 'header.myPlan',
  },
  {
    activeHrefs: ['/insurance-companies'],
    href: '/insurance-companies',
    title: 'header.insuranceCompanies',
  },
  {
    activeHrefs: ['my-plan'],
    icon: <Icon component={ArrowDownSVG} />,
    subItems: [
      {
        activeHrefs: ['/professionals'],
        href: '/professionals',
        title: 'header.professionals',
      },
      {
        activeHrefs: ['/individuals'],
        href: '/individuals',
        title: 'header.individuals',
      },
      {
        activeHrefs: ['/blogs'],
        href: '/blogs',
        title: 'header.blogs',
      },
    ],
    title: 'header.more',
  },
];

function Header() {
  return (
    <Row className="mx-auto flex h-[4rem] w-full max-w-container justify-between px-4 py-4">
      <Col span={14} className="flex items-center justify-between">
        <Link to="/">
          <Image
            height={36}
            width={192}
            className="object-contain"
            src={LogoFull}
            preview={false}
          />
        </Link>
        <div className="flex gap-6">
          {navItems?.map((item, index) => (
            <NavItem item={item} key={String(index)} />
          ))}
        </div>
      </Col>
      <Col span={10} className="flex items-center justify-end gap-10">
        <div className="flex gap-5">
          <Icon
            component={MessageSVG}
            className="scale-150 cursor-pointer text-grey-secondary-300 hover:text-grey-secondary-400"
          />
          <Icon
            component={NotificationSVG}
            className="scale-150 cursor-pointer text-grey-secondary-300 hover:text-grey-secondary-400"
          />
        </div>
        <AccountInfo />
      </Col>
    </Row>
  );
}

export default Header;

import { Image, Progress } from 'antd';
import { Link } from 'react-router-dom';
import LogoFull from '#/assets/images/logo-full.png';

interface HeaderProps {
  percent?: number;
}

function Header({ percent }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Link to="/">
        <Image src={LogoFull} preview={false} className="object-cover" />
      </Link>
      <Progress type="circle" width={60} percent={percent} />
    </div>
  );
}

export default Header;

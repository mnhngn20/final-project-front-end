import { Image, Typography } from 'antd';
import { ReactNode } from 'react';
import AuthImage from '#/assets/images/auth-image.png';
import LogoFull from '#/assets/images/logo-full.png';

interface Props {
  children: ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col justify-between gap-4 bg-grey-light p-28 lg:hidden">
        <div className="flex justify-center">
          <Image width={300} preview={false} src={LogoFull} />
        </div>
        <div className="flex items-center justify-center">
          <Image height={350} preview={false} src={AuthImage} />
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <Typography className="text-gradient text-center text-4xl">
            Apartment Manage System
          </Typography>
        </div>
      </div>
      <div className="col-span-1 flex h-screen flex-col items-center justify-center overflow-y-auto py-8 leading-normal lg:col-span-2">
        <div className="h-auto w-full">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;

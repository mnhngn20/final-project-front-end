import { Image, Typography } from 'antd';
import { ReactNode } from 'react';
import AuthImage from '#/assets/images/auth-image.png';
import LogoFull from '#/assets/images/logo-full.png';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface Props {
  children: ReactNode;
}

function AuthLayout({ children }: Props) {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col justify-between bg-grey-light p-28 lg:hidden">
        <Image className="w-auto" preview={false} src={LogoFull} />
        <div className="flex items-center justify-center">
          <Image
            className="w-auto rounded-full"
            preview={false}
            src={AuthImage}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <Typography className="text-gradient text-4xl">
            {t('signIn.funeralPlan')}
          </Typography>
          <Typography className="text-center text-base text-grey-secondary-300">
            {t('signIn.description')}
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

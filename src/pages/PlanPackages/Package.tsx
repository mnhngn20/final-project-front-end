import { Divider, Typography } from 'antd';
import { PackageType } from './index';
import RegisterButton from '#/shared/components/styled/RegisterButton';
import { StarFilledSVG, TickCircleSVG } from '#/assets/svgs';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface PackagesProps {
  title: string;
  price: number;
  packageType: PackageType;
  benefits: string[];
  isRegistered?: boolean;
  isDefaultPackage?: boolean;
}

function Packages({
  benefits,
  packageType,
  price,
  title,
  isRegistered,
  isDefaultPackage,
}: PackagesProps) {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="rounded-3xl bg-[white] px-8 py-14 shadow-card transition-all hover:translate-y-[-1.5rem]">
      <Typography className="text-gradient text-2xl font-semibold">
        {title}
      </Typography>
      <Typography className="relative mt-9 mb-10">
        <span className="absolute bottom-5 text-3xl font-bold text-grey-secondary-300">
          $
        </span>
        <span className="ml-6 text-4xl font-bold">{price}</span>/{packageType}
      </Typography>
      <Divider />
      <div className="flex flex-col gap-5">
        {benefits?.map(benefit => (
          <Typography key={benefit} className="flex items-center gap-4">
            <TickCircleSVG
              className="text-primary-color"
              width={24}
              height={24}
            />
            {benefit}
          </Typography>
        ))}
      </div>
      {!isDefaultPackage && (
        <RegisterButton
          className="mt-10"
          type="primary"
          isRegistered={isRegistered}
        >
          {isRegistered && (
            <StarFilledSVG width={24} height={24} className="anticon" />
          )}
          {isRegistered ? t('button.registered') : t('button.registerNow')}
        </RegisterButton>
      )}
    </div>
  );
}

export default Packages;

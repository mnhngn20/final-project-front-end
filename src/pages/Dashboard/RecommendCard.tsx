import { Avatar, Progress, Typography } from 'antd';
import DefaultAvatar from '#/assets/images/avatar.png';
import { DotSVG, StarSVG } from '#/assets/svgs';
import Tag from '#/shared/components/commons/Tag';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface RecommendCardProps {
  name?: string;
  email?: string;
  id?: string | number;
  type?: string;
  status?: string;
  avatar?: string;
  progress?: number;
}

function RecommendCard({
  email,
  id,
  name,
  status,
  type,
  avatar,
  progress,
}: RecommendCardProps) {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="flex justify-between gap-6 rounded-xl bg-grey-primary p-4">
      <div className="flex flex-wrap justify-between gap-6">
        <Avatar src={avatar ?? DefaultAvatar} size={120} />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <Typography className="text-lg font-semibold">{name}</Typography>
            <Typography className="text-base text-grey-secondary-300">
              {email}
            </Typography>
          </div>
          <div className="flex items-center gap-6">
            <Typography className="text-base text-grey-secondary-300">
              {t('commonFields.ID')}:{' '}
              <span className="text-[black]">00{id}</span>
            </Typography>
            <Tag
              className="border-none bg-info-light text-info"
              content={type}
              icon={<StarSVG width={13} height={13} />}
            />
            <Typography className="flex items-center gap-2 text-grey-secondary-300">
              <DotSVG width={8} height={8} />
              {status}
            </Typography>
          </div>
        </div>
      </div>
      <div className="h-full ">
        <Progress type="circle" percent={progress} width={48} />
      </div>
    </div>
  );
}

export default RecommendCard;

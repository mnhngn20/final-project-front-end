import Icon from '@ant-design/icons';
import { Typography } from 'antd';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import DefaultAvatar from '#/assets/images/avatar.png';
import { StarSVG } from '#/assets/svgs';
import UploadAvatar from '#/shared/components/commons/UploadAvatar';

interface ProfileHeaderProps {
  avatar?: string | null;
  lastName?: string | null;
  firstName?: string | null;
}

const { Title, Text } = Typography;

function ProfileHeader({ avatar, firstName, lastName }: ProfileHeaderProps) {
  const { t } = useTypeSafeTranslation();
  return (
    <>
      <div className="absolute ml-[-0.313rem] mt-[-2rem] rounded-xl bg-grey-primary py-[3.15rem] px-20">
        <UploadAvatar size={200} src={avatar ?? DefaultAvatar} />
        <Title level={3} className="my-2 ml-8">
          {`${lastName} ${firstName}` ?? t('profiles.fullName')}
        </Title>
      </div>
      <div className="absolute -left-[1.5rem] -top-[1.5rem] h-8 rounded-full bg-info-light px-3">
        <Typography className="flex items-center">
          <Title level={5} className="my-1">
            <Icon component={StarSVG} />
          </Title>
          <Text className="ml-2 text-sm text-info">{t('profiles.vector')}</Text>
        </Typography>
      </div>
    </>
  );
}

export default ProfileHeader;

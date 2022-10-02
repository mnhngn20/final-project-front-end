import { Typography } from 'antd';
import ProfileItem from './ProfileItem';
import {
  BirthdaySVG,
  CalendarSVG,
  CallSVG,
  CardSVG,
  LocationSVG,
  MapSVG,
  SmsSVG,
  TagSVG,
} from '#/assets/svgs';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import { formatDate } from '#/shared/utils/date';

const { Title } = Typography;

function ProfileContent() {
  const { t } = useTypeSafeTranslation();
  const user = useReactiveVar(userVar);

  return (
    <div className="flex flex-col justify-center p-8">
      <Title level={3} className="font-semibold">
        {t('profiles.title')}
      </Title>
      <div className="grid grid-cols-2">
        <ProfileItem
          icon={SmsSVG}
          value={user?.email}
          className="grid-cols-1"
        />
        <ProfileItem
          icon={CallSVG}
          value={user?.phoneNumber}
          className="grid-cols-1"
        />
        <ProfileItem icon={LocationSVG} value={user?.address} />
        <ProfileItem icon={CalendarSVG} value={user?.createdAt} />
        <ProfileItem icon={TagSVG} value={t('profiles.tag')} />
        <ProfileItem icon={CardSVG} value={user.identityNumber} />
        <ProfileItem icon={MapSVG} value={user?.location?.name} />
        <ProfileItem
          icon={BirthdaySVG}
          value={formatDate(user.dateOfBirth, 'DD/MM/YYYY')}
        />
      </div>
    </div>
  );
}

export default ProfileContent;

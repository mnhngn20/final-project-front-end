import { Col, Row, Typography } from 'antd';
import ProfileItem from './ProfileItem';
import {
  CalendarAddSVG,
  CalendarSVG,
  CallAddSVG,
  CallSVG,
  LocationSVG,
  SmsSVG,
  TagSVG,
} from '#/assets/svgs';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface ProfileContentProps {
  email?: string | null;
  phoneNumber1?: string | null;
  phoneNumber2?: string | null;
  address?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

const { Title } = Typography;

function ProfileContent({
  email,
  phoneNumber1,
  phoneNumber2,
  address,
  createdAt,
  updatedAt,
}: ProfileContentProps) {
  const { t } = useTypeSafeTranslation();
  return (
    <>
      <Title level={3} className="font-semibold">
        {t('profiles.title')}
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <ProfileItem
            icon={SmsSVG}
            item={email}
            translation="commonFields.email"
          />
          <ProfileItem
            icon={CallSVG}
            item={phoneNumber1}
            translation="commonFields.phone"
          />
          <ProfileItem
            icon={CallAddSVG}
            item={phoneNumber2}
            translation="profiles.phoneAdd"
          />
          <ProfileItem
            icon={LocationSVG}
            item={address}
            translation="profiles.location"
          />
          <ProfileItem
            icon={CalendarSVG}
            item={createdAt}
            translation="profiles.calendar"
          />
        </Col>
        <Col xs={24} lg={12}>
          <ProfileItem
            icon={TagSVG}
            item={t('profiles.tag')}
            translation="profiles.tag"
          />
          <ProfileItem
            icon={CalendarAddSVG}
            item={updatedAt}
            translation="profiles.calendarAdd"
          />
        </Col>
      </Row>
    </>
  );
}

export default ProfileContent;

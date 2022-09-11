import { PageContainer } from '@ant-design/pro-layout';
import ProfileDetail from './ProfileDetail';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

function ProfileInformation() {
  const { t } = useTypeSafeTranslation();

  return (
    <PageContainer
      header={{
        title: t('header.profile'),
      }}
    >
      <ProfileDetail />
    </PageContainer>
  );
}

export default ProfileInformation;

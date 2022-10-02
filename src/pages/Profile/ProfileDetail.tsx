import { Button, Typography } from 'antd';
import { useState } from 'react';
import ChangePassword from '../ChangePassword';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { EditFilled } from '@ant-design/icons';
import UpdateProfileFormModal from './UpdateProfileModal';

function ProfileDetail() {
  const { t } = useTypeSafeTranslation();
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState<boolean>(false);
  const [updateProfileModalVisible, setUpdateProfileModalVisible] =
    useState<boolean>(false);

  return (
    <div>
      <div className="relative rounded-xl bg-[white] shadow-card">
        <Typography className="absolute top-0 right-0 m-4">
          <Button
            onClick={() => setUpdateProfileModalVisible(true)}
            type="primary"
            icon={<EditFilled />}
          >
            Edit Profile
          </Button>
        </Typography>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 xlg:col-span-12">
            <ProfileHeader />
          </div>
          <div className="col-span-8 xlg:col-span-12">
            <ProfileContent />
          </div>
        </div>
      </div>
      <Button
        className="mt-4"
        onClick={() => setChangePasswordModalVisible(true)}
      >
        {t('changePassword.title')}
      </Button>
      <UpdateProfileFormModal
        visible={updateProfileModalVisible}
        setVisible={setUpdateProfileModalVisible}
      />
      <ChangePassword
        setVisible={setChangePasswordModalVisible}
        visible={changePasswordModalVisible}
      />
    </div>
  );
}

export default ProfileDetail;

import { Button, Card, Col, Row, Typography } from 'antd';
import React, { useState } from 'react';
import ChangePassword from '../ChangePassword';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { User } from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';

function ProfileDetail() {
  const { t } = useTypeSafeTranslation();
  const [visible, setVisible] = useState<boolean>(false);

  const showEditForm = () => {
    //
  };

  return (
    <>
      <Card className="rounded-xl py-2 px-6">
        <Row gutter={[24, 24]}>
          <Col xs={8} lg={6} className="flex justify-center">
            <ProfileHeader
            // avatar={userData?.avatar}
            // firstName={userData?.firstName}
            // lastName={userData?.lastName}
            />
          </Col>
          <Col xs={16} lg={16} className="pl-16">
            <ProfileContent
            // email={userData?.email}
            // phoneNumber1={userData?.phoneNumber1}
            // phoneNumber2={userData?.phoneNumber2}
            // address={userData?.address}
            // createdAt={userData?.createdAt}
            // updatedAt={userData?.updatedAt}
            />
          </Col>
          <Col xs={16} lg={2}>
            <Typography className="float-right mr-[-1.25rem]">
              <Button onClick={showEditForm} />
            </Typography>
          </Col>
        </Row>
      </Card>
      <Button
        className="mt-4 border-primary-color font-medium text-primary-color hover:bg-primary-color hover:text-grey-light"
        onClick={() => setVisible(true)}
      >
        {t('changePassword.title')}
      </Button>
      <ChangePassword setVisible={setVisible} visible={visible} />
    </>
  );
}

export default ProfileDetail;

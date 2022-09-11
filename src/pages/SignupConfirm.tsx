import { LeftOutlined } from '@ant-design/icons';
import { Button, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import AuthLayout from '#/shared/components/layout/AuthLayout';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

function SignupConfirm() {
  const { t } = useTypeSafeTranslation();

  return (
    <AuthLayout>
      <div className="h-[calc(100vh - 4rem) -mt-[18.75rem] flex flex-col items-center">
        <Col span={24} className="py-[3rem] px-[6.25rem]">
          <div className="mb-8 flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-solid border-grey-secondary-300">
            <LeftOutlined />
          </div>
          <Typography className="mb-3 text-[2.5rem] font-semibold">
            {t('confirmEmail.title')}
          </Typography>
          <p className="text-base text-grey-text">
            {t('signUpConfirm.weHaveSent')} “
            <span className="text-primary-color">thanhnguyen@gmail.com</span>”,
            {t('signUpConfirm.pleaseEnter')}
          </p>
          <div className="mb-8">
            <Link to="/" className=" text-lg font-medium text-info">
              {t('signUpConfirm.resend')}
            </Link>
          </div>
          <Button block type="primary" htmlType="submit" disabled>
            {t('signUpConfirm.submit')}
          </Button>
        </Col>
      </div>
    </AuthLayout>
  );
}

export default SignupConfirm;

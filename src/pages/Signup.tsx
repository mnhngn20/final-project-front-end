import { Button, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import AuthLayout from '#/shared/components/layout/AuthLayout';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { RegisterInputDto, useRegisterMutation } from '#/generated/schemas';
import SocialButton from '#/shared/components/styled/SocialButton';
import { showError } from '#/shared/utils/notification';

function Signup() {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();

  const [register, loading] = useRegisterMutation({
    onCompleted() {
      navigate('/signup-confirm');
    },
    onError: showError,
  });

  const onSubmit = (value: RegisterInputDto) => {
    register({
      variables: {
        input: {
          email: value?.email,
          firstName: value?.firstName,
          lastName: value?.lastName,
          password: value?.password,
        },
      },
    });
  };

  return (
    <AuthLayout>
      <Form
        onFinish={onSubmit}
        className="flex flex-col justify-center gap-8 px-20 pt-14"
        layout="vertical"
        scrollToFirstError
      >
        <Typography className="text-4xl font-semibold">
          {t('signUp.title')}
        </Typography>
        <div className="flex w-full flex-col">
          <Form.Item
            name="firstName"
            label={t('commonFields.firstName')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder={t('placeholder.enterFirstName')}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={t('commonFields.lastName')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder={t('placeholder.enterLastName')}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={t('commonFields.email')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder={t('placeholder.enterEmail')}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={t('commonFields.password')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder={t('placeholder.enterPassword')} />
          </Form.Item>
          <Form.Item
            name="comfirmPassword"
            label={t('commonFields.comfirmPassword')}
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                message: t('confirm.password'),
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t('confirm.passwordNotMatch')),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder={t('placeholder.comfirmPassword')} />
          </Form.Item>
          <p className="text-base text-grey-secondary-300">
            {t('signUp.description')}{' '}
            <Link to="/" className="text-grey-text underline">
              {t('signUp.term')}
            </Link>{' '}
            and{' '}
            <Link to="/" className="text-grey-text underline">
              {t('signUp.policy')}
            </Link>
          </p>
          <Button block type="primary" htmlType="submit" loading={!loading}>
            {t('button.signUp')}
          </Button>
        </div>
        <p className="text-center text-base text-woodsmoke">
          {t('signUp.haveAccount')}{' '}
          <Link to="/signin" className="font-semibold text-primary-color">
            {t('button.signIn')}
          </Link>
        </p>
      </Form>
      <div className="flex w-full flex-col px-20 pb-10">
        <SocialButton
          icon={<GoogleOutlined />}
          className="mt-2 h-[3rem]"
          htmlType="submit"
          data-testid="google-btn"
        >
          {t('button.loginWithGoogle')}
        </SocialButton>
        <SocialButton
          icon={<FacebookFilled className="grey-secondary-300" />}
          className="mt-3.5 h-[3rem]"
          htmlType="submit"
          data-testid="facebook-btn"
        >
          {t('button.loginWithFacebook')}
        </SocialButton>
      </div>
    </AuthLayout>
  );
}

export default Signup;

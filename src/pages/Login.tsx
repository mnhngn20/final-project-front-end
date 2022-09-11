import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import useAuthentication from '#/shared/hooks/useAuthentication';
import AuthLayout from '#/shared/components/layout/AuthLayout';
import SocialButton from '#/shared/components/styled/SocialButton';

function Login() {
  const { t } = useTypeSafeTranslation();
  const { handleLogin, loginLoading } = useAuthentication();

  return (
    <AuthLayout>
      <Form
        onFinish={handleLogin}
        className="flex flex-col justify-center gap-8 px-20"
        layout="vertical"
        scrollToFirstError
      >
        <Typography className="text-[2.5rem]">{t('signIn.title')}</Typography>
        <div className="flex w-full flex-col">
          <Form.Item
            name="email"
            label={t('commonFields.email')}
            rules={[
              {
                message: t('validateMessage.email'),
                required: true,
                type: 'email',
              },
            ]}
          >
            <Input
              className="h-[3rem]"
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
            <Input.Password
              className="h-[3rem]"
              placeholder={t('placeholder.enterPassword')}
              autoComplete="off"
            />
          </Form.Item>

          <div className="flex justify-between">
            <Checkbox>{t('signIn.rememberMe')}</Checkbox>
            <Link to="/forgot-password" className="text-grey-light-900">
              {t('signIn.forgotPassword')}
            </Link>
          </div>
          <Form.Item className="mt-[1.5rem]">
            <Button
              block
              type="primary"
              loading={loginLoading}
              className="h-[3rem]"
              htmlType="submit"
            >
              {t('button.signIn')}
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className="flex flex-col px-20">
        <div className="mt-4 flex justify-center text-base">
          <p className="mr-4">{t('signIn.noAccount')}</p>
          <Link to="/signup">{t('button.signUp')}</Link>
        </div>
        <SocialButton
          icon={<GoogleOutlined />}
          className="social-btn mt-2 h-[3rem]"
          htmlType="submit"
          data-testid="google-btn"
        >
          {t('button.loginWithGoogle')}
        </SocialButton>
        <SocialButton
          icon={<FacebookFilled className="grey-secondary-300" />}
          className="social-btn mt-3.5 h-[3rem]"
          htmlType="submit"
          data-testid="facebook-btn"
        >
          {t('button.loginWithFacebook')}
        </SocialButton>
      </div>
    </AuthLayout>
  );
}

export default Login;

import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import AuthLayout from '#/shared/components/layout/AuthLayout';
import { RegisterLoginInput, useLoginMutation } from '#/generated/schemas';
import { setToken } from '#/shared/utils/token';
import { showError } from '#/shared/utils/notification';

function Login() {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();
  const [login, { loading }] = useLoginMutation({
    onCompleted(data) {
      if (data?.login?.accessToken) {
        setToken(data?.login?.accessToken);
        navigate('/');
      }
    },
    onError: showError,
  });

  const onLogin = ({ email, password }: RegisterLoginInput) => {
    login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  return (
    <AuthLayout>
      <Form
        onFinish={onLogin}
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
              loading={loading}
              className="h-[3rem]"
              htmlType="submit"
            >
              {t('button.signIn')}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </AuthLayout>
  );
}

export default Login;

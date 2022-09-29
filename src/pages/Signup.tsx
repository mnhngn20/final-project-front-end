import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '#/shared/components/layout/AuthLayout';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { RegisterLoginInput, useRegisterMutation } from '#/generated/schemas';
import { showError, showSuccess } from '#/shared/utils/notification';
import { DatePicker } from '#/shared/components/commons/DatePicker';
import dayjs from 'dayjs';

function Signup() {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();

  const [register, loading] = useRegisterMutation({
    onCompleted() {
      showSuccess('Registered account successfully!');
      navigate('/login');
    },
    onError: showError,
  });

  const onSubmit = ({
    email,
    address,
    dateOfBirth,
    identityNumber,
    name,
    password,
    phoneNumber,
  }: RegisterLoginInput) => {
    register({
      variables: {
        input: {
          email,
          address,
          identityNumber,
          name,
          password,
          phoneNumber,
          dateOfBirth: dayjs.utc(dateOfBirth)?.startOf('date').toISOString(),
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
        <Typography className="text-center font-dm-serif-display text-4xl font-semibold">
          {t('signUp.title')}
        </Typography>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input placeholder="Enter your email" autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Enter your name" autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="identityNumber"
              label="Identity Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Enter your identity number"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Enter your address" autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="Address"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Enter your phone number" autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dateOfBirth"
              label="Date of birth"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                className="w-full"
                placeholder="Select your birthday"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
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
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
          </Col>
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
        </Row>
        <p className="text-center text-base text-woodsmoke">
          {t('signUp.haveAccount')}{' '}
          <Link to="/signin" className="font-semibold text-primary-color">
            {t('button.signIn')}
          </Link>
        </p>
      </Form>
    </AuthLayout>
  );
}

export default Signup;

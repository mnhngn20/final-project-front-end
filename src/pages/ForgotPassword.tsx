import { Button, Form, Input, Row, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '#/shared/components/layout/AuthLayout';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { BackIcon } from '#/assets/svgs';

function ForgotPassword() {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Row align="middle" justify="center" className="flex h-screen flex-col">
        <div className="flex w-full">
          <Button
            shape="circle"
            className="mb-[2.5rem] ml-[1.5rem]"
            icon={<Icon component={BackIcon} />}
            onClick={() => navigate(-1)}
          />
        </div>
        <div>
          <Typography.Title level={2} className="mb-4 font-bold">
            {t('forgotPassword.title')}
          </Typography.Title>
          <Typography.Paragraph className="mt-4 text-center text-base	font-normal">
            {t('forgotPassword.description')}
          </Typography.Paragraph>
          <Form layout="vertical" className="w-full">
            <Form.Item
              name="email"
              label={t('commonFields.email')}
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Button block type="primary" htmlType="submit">
              {t('button.submit')}
            </Button>
          </Form>
        </div>
      </Row>
    </AuthLayout>
  );
}

export default ForgotPassword;

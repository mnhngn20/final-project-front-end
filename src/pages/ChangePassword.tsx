import { Form, Input, Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface ChangePasswordProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible?: boolean;
}

function ChangePassword({ setVisible, visible }: ChangePasswordProps) {
  const [form] = Form.useForm();
  const { t } = useTypeSafeTranslation();

  // const [changePassword] = useChangePasswordMutation({
  //   onCompleted() {
  //     showSuccess(t('confirm.changePasswordSuccess'));
  //     setVisible(false);
  //     form.resetFields();
  //   },
  //   onError: showError,
  // });

  // const handleSubmit = (values: ChangePasswordInputDto) => {
  //   changePassword({
  //     variables: { input: values },
  //   });
  // };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal
        title={t('changePassword.title')}
        visible={visible}
        closable={false}
        okText={t('button.save')}
        onOk={form.submit}
        onCancel={handleCancel}
        width={450}
      >
        <Form
          form={form}
          className="flex flex-col gap-8 px-[1rem]"
          layout="vertical"
          scrollToFirstError
          // onFinish={handleSubmit}
        >
          <div className="flex w-full flex-col">
            <Form.Item
              name="oldPassword"
              label={t('commonFields.oldPassword')}
              rules={[
                {
                  message: t('confirm.password'),
                  required: true,
                },
              ]}
            >
              <Input.Password
                className="h-[3rem]"
                placeholder={t('placeholder.enterOldPassword')}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label={t('commonFields.newPassword')}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password placeholder={t('placeholder.enterNewPassword')} />
            </Form.Item>
            <Form.Item
              name="confirmNewPassword"
              label={t('commonFields.comfirmPassword')}
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                {
                  message: t('confirm.password'),
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t('confirm.passwordNotMatch')),
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder={t('commonFields.confirmNewPassword')}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default ChangePassword;

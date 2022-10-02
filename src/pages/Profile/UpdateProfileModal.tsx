import {
  refetchMeQuery,
  UpdateMeInput,
  useUpdateMeMutation,
} from '#/generated/schemas';
import { userVar } from '#/graphql/cache';
import UploadAvatar from '#/shared/components/commons/UploadAvatar';
import { showError, showSuccess } from '#/shared/utils/notification';
import { validateRegex } from '#/shared/utils/validation';
import { useReactiveVar } from '@apollo/client';
import { DatePicker, Form, Input, Modal } from 'antd';
import dayjs from 'dayjs';

interface UpdateProfileFormModalProps {
  visible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateProfileFormModal({
  setVisible,
  visible,
}: UpdateProfileFormModalProps) {
  const [form] = Form.useForm();
  const user = useReactiveVar(userVar);
  const [updateMe, { loading }] = useUpdateMeMutation({
    onCompleted() {
      showSuccess('Updated profile successfully!');
      setVisible(false);
    },
    onError: showError,
    refetchQueries: [refetchMeQuery()],
  });

  const onUpdateProfile = ({
    avatar,
    dateOfBirth,
    identityNumber,
    name,
    phoneNumber,
  }: UpdateMeInput) => {
    updateMe({
      variables: {
        input: {
          avatar,
          dateOfBirth: dayjs?.utc(dateOfBirth)?.startOf('date').toISOString(),
          identityNumber,
          name,
          phoneNumber,
        },
      },
    });
  };

  return (
    <Modal
      title="Update Profile"
      destroyOnClose
      onOk={form.submit}
      okText="Update"
      okButtonProps={{
        loading: loading,
      }}
      visible={visible}
      closable
      maskClosable
      onCancel={() => setVisible(false)}
      width={800}
    >
      <Form
        form={form}
        onFinish={onUpdateProfile}
        initialValues={{
          ...user,
          ...(user?.dateOfBirth && {
            dateOfBirth: dayjs(user.dateOfBirth),
          }),
        }}
        layout="vertical"
      >
        <div className="mb-8 flex justify-center">
          <Form.Item name="avatar" noStyle valuePropName="src">
            <UploadAvatar size={120} />
          </Form.Item>
        </div>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input type="text" placeholder="Enter user email" disabled />
        </Form.Item>
        <Form.Item name="name" label="Full Name">
          <Input type="text" placeholder="Enter user name" />
        </Form.Item>
        <Form.Item name="identityNumber" label="Government ID">
          <Input placeholder="Enter user identity number" />
        </Form.Item>
        <Form.Item name="dateOfBirth" label="Date of Birth">
          <DatePicker
            className="w-full"
            placeholder="Choose user birthday"
            format="DD/MM/YYYY"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ pattern: validateRegex.phoneNumber }]}
        >
          <Input type="text" placeholder="Enter user phone number" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input type="text" placeholder="Enter user address" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateProfileFormModal;

import { DatePicker, Form, Input } from 'antd';
import UploadAvatar from '#/shared/components/commons/UploadAvatar';
import { User, UserRole } from '#/generated/schemas';
import UserRoleSelector from '#/shared/components/selectors/UserRoleSelector';
import { validateRegex } from '#/shared/utils/validation';

interface Props {
  initialValues?: User;
  isSuperAdmin: boolean;
}

function UserForm({ initialValues, isSuperAdmin }: Props) {
  return (
    <>
      <div className="mb-8 flex justify-center">
        <Form.Item name="avatar" noStyle>
          <UploadAvatar src={initialValues?.avatar} size={120} />
        </Form.Item>
      </div>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true }]}
        initialValue={initialValues?.email}
      >
        <Input
          type="text"
          placeholder="Enter user email"
          disabled={!!initialValues?.id}
        />
      </Form.Item>
      {!initialValues?.id && (
        <>
          <Form.Item
            name="password"
            label="Password"
            hidden={!!initialValues?.id}
            rules={[{ required: true }]}
          >
            <Input type="password" placeholder="Enter user password" />
          </Form.Item>
        </>
      )}
      <Form.Item name="fullName" label="Full Name">
        <Input type="text" placeholder="Enter user name" />
      </Form.Item>
      <Form.Item name="identityNumber" label="Government ID">
        <Input placeholder="Enter user identity number" />
      </Form.Item>
      <Form.Item name="dob" label="Date of Birth">
        <DatePicker
          className="w-full"
          placeholder="Choose user birthday"
          format="DD/MM/YYYY"
          disabledDate={d => !d || d.isAfter()}
        />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[{ pattern: validateRegex.phoneNumber }]}
      >
        <Input type="text" placeholder="Enter user phone number" />
      </Form.Item>
      <Form.Item name="role" label="User role" hidden={!isSuperAdmin}>
        <UserRoleSelector
          placeholder="Select user role"
          disabled={
            initialValues?.role === UserRole.SuperAdmin ||
            initialValues?.role === UserRole.Customer
          }
        />
      </Form.Item>
    </>
  );
}

export default UserForm;

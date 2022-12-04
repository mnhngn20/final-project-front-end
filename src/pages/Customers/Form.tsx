import { Form, Input } from 'antd';
import UploadAvatar from '#/shared/components/commons/UploadAvatar';
import { User } from '#/generated/schemas';
import { validateRegex } from '#/shared/utils/validation';
import { DatePicker } from '#/shared/components/commons/DatePicker';
import RoomSelector from '#/shared/components/selectors/RoomSelector';
import dayjs from 'dayjs';

interface Props {
  initialValues?: User;
}

function UserForm({ initialValues }: Props) {
  return (
    <>
      <div className="mb-8 flex justify-center">
        <Form.Item name="avatar" noStyle valuePropName="src">
          <UploadAvatar src={initialValues?.avatar} size={120} />
        </Form.Item>
      </div>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email' }]}
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
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            hidden={!!initialValues?.id}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Confirm password does not match!'),
                  );
                },
              }),
            ]}
          >
            <Input type="password" placeholder="Confirm your password" />
          </Form.Item>
        </>
      )}
      <Form.Item name="name" label="Full Name">
        <Input type="text" placeholder="Enter user name" />
      </Form.Item>
      <Form.Item hidden={!initialValues?.id} name="roomId" label="Room">
        <RoomSelector
          variables={{
            input: { locationId: Number(initialValues?.locationId) },
          }}
          placeholder="Select customer room"
          allowClear
          convertDataToOptions={rooms =>
            rooms.map(room => ({
              label: `Room ${room?.name} (${room.users?.length ?? 0}/${
                room.capacity ?? 0
              })`,
              value: room?.id,
            }))
          }
        />
      </Form.Item>
      <Form.Item name="identityNumber" label="Government ID">
        <Input placeholder="Enter user identity number" />
      </Form.Item>
      <Form.Item name="dateOfBirth" label="Date of Birth">
        <DatePicker
          className="w-full"
          placeholder="Choose user birthday"
          format="DD/MM/YYYY"
          disabledDate={current => current.valueOf() > dayjs().valueOf()}
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
    </>
  );
}

export default UserForm;

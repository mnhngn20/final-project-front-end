import { Form, Input } from 'antd';
import UserSelector from '#/shared/components/selectors/UserSelector';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import { DatePicker } from '#/shared/components/commons/DatePicker';
import { UserRole } from '#/generated/schemas';

function LocationReservationForm() {
  const currentUser = useReactiveVar(userVar);

  return (
    <>
      <Form.Item label="Location" rules={[{ required: true }]}>
        <Input disabled value={currentUser?.location?.name} />
      </Form.Item>
      <Form.Item
        name="createdById"
        label="Employee"
        rules={[{ required: true }]}
      >
        <UserSelector
          placeholder="Select employee to in charge"
          variables={{
            input: {
              locationId: Number(currentUser?.locationId),
              role: UserRole.Admin,
            },
          }}
        />
      </Form.Item>
      <Form.Item
        name="startDate"
        label="Start Date Of Total Reservation"
        rules={[{ required: true }]}
      >
        <DatePicker.MonthPicker
          placeholder="Select start date"
          className="w-full"
        />
      </Form.Item>
    </>
  );
}

export default LocationReservationForm;

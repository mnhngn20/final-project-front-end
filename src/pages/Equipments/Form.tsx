import { Form, Input, Switch } from 'antd';
import UploadImage from '#/shared/components/commons/UploadImage';
import RoomSelector from '#/shared/components/selectors/RoomSelector';
import { Equipment } from '#/generated/schemas';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';

interface EquipmentFormProps {
  roomId?: number;
  initialValues?: Equipment;
}

function EquipmentForm({ roomId, initialValues }: EquipmentFormProps) {
  const { locationId } = useReactiveVar(userVar);

  return (
    <>
      <Form.Item
        name="image"
        label="Equipment Image"
        rules={[{ required: true }]}
        valuePropName="src"
      >
        <UploadImage />
      </Form.Item>
      <Form.Item
        name="name"
        label="Equipment Name"
        rules={[{ required: true }]}
      >
        <Input type="text" placeholder="Enter equipment name" />
      </Form.Item>
      <Form.Item
        name="roomId"
        label="Room"
        rules={[{ required: true }]}
        {...(roomId ? { initialValue: String(roomId) } : {})}
      >
        <RoomSelector
          placeholder="Select Room"
          initValues={initialValues?.room ? [initialValues?.room] : []}
          variables={{
            input: {
              locationId: Number(locationId),
            },
          }}
        />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={3} placeholder="Enter equipment description" />
      </Form.Item>
      <Form.Item
        name="isActive"
        label="Equipment Status"
        valuePropName="checked"
      >
        <Switch defaultChecked />
      </Form.Item>
    </>
  );
}

export default EquipmentForm;

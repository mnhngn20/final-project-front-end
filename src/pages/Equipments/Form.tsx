import { Form, Input, Switch } from 'antd';
import UploadImage from '#/shared/components/commons/UploadImage';
import RoomSelector from '#/shared/components/selectors/RoomSelector';

function UserForm() {
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
      <Form.Item name="roomId" label="Room" rules={[{ required: true }]}>
        <RoomSelector placeholder="Select Room" />
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

export default UserForm;

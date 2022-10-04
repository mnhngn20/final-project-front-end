import { Form, Input, InputNumber } from 'antd';
import UploadImage from '#/shared/components/commons/UploadImage';
import UploadImages from '#/shared/components/commons/UploadImages';

function UserForm() {
  return (
    <>
      <Form.Item name="thumbnail" label="Thumbnail" valuePropName="src">
        <UploadImage />
      </Form.Item>
      <Form.Item name="name" label="Room Name" rules={[{ required: true }]}>
        <Input type="text" placeholder="Enter room name" />
      </Form.Item>
      <Form.Item name="floor" label="Room Floor" rules={[{ required: true }]}>
        <Input type="text" placeholder="Enter room floor" />
      </Form.Item>
      <Form.Item
        name="basePrice"
        label="Room Base Price"
        rules={[{ required: true }]}
      >
        <InputNumber
          placeholder="Enter room base price ($)"
          className="w-full"
        />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={3} placeholder="Enter room description" />
      </Form.Item>
      <Form.Item name="images" label="Room Images" valuePropName="srcList">
        <UploadImages />
      </Form.Item>
    </>
  );
}

export default UserForm;

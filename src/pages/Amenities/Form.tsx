import { Form, Input, Switch } from 'antd';
import AmenityTypeSelector from '#/shared/components/selectors/AmenityTypeSelector';
import { Amenity } from '#/generated/schemas';
import UploadImage from '#/shared/components/commons/UploadImage';

interface AmenityFormProps {
  initialValues?: Amenity;
}

function AmenityForm({ initialValues }: AmenityFormProps) {
  return (
    <>
      <Form.Item name="image" label="Icon" valuePropName="src">
        <UploadImage />
      </Form.Item>
      <Form.Item name="name" label="Amenity Name" rules={[{ required: true }]}>
        <Input placeholder="Enter amenity name" />
      </Form.Item>
      <Form.Item
        name="amenityTypeId"
        label="Amenity Type"
        rules={[{ required: true }]}
      >
        <AmenityTypeSelector
          placeholder="Select Amenity Type"
          initValues={
            initialValues?.amenityType ? [initialValues?.amenityType] : []
          }
        />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={3} placeholder="Enter description" />
      </Form.Item>
      <Form.Item label="Status" name="isActive" valuePropName="checked">
        <Switch defaultChecked />
      </Form.Item>
    </>
  );
}

export default AmenityForm;

import { Form, Input } from 'antd';
import AddressSelector from '#/shared/components/selectors/AddressSelector';
import { validateRegex } from '#/shared/utils/validation';

function ContactForm() {
  return (
    <>
      <Form.Item name="name" label="Contact Name" rules={[{ required: true }]}>
        <Input placeholder="Enter amenity name" />
      </Form.Item>
      <Form.Item name="address" label="Contact Address">
        <AddressSelector placeholder="Enter contact address" />
      </Form.Item>
      <Form.Item name="email" label="Contact Email" rules={[{ type: 'email' }]}>
        <Input placeholder="Enter contact email" />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Contact Phone Number"
        rules={[{ pattern: validateRegex.phoneNumber }]}
      >
        <Input placeholder="Enter contact phone number" />
      </Form.Item>
    </>
  );
}

export default ContactForm;

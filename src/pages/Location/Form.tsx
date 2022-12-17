import { Col, Form, Input, InputNumber, Row, Switch } from 'antd';
import { Location } from '#/generated/schemas';
import UploadImages from '#/shared/components/commons/UploadImages';
import UploadImage from '#/shared/components/commons/UploadImage';
import AddressSelector from '#/shared/components/selectors/AddressSelector';
import LocationServiceSelector from '#/shared/components/selectors/LocationServiceSeletor';

interface Props {
  initialValues?: Location;
}

function LocationForm({ initialValues }: Props) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form.Item
          name="thumbnail"
          label="Location thumbnail"
          valuePropName="src"
          rules={[{ required: true }]}
        >
          <UploadImage />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="name"
          label="Location Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter location name" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="numOfFloor"
          label="Location Total Floor"
          rules={[{ required: true }]}
        >
          <InputNumber
            placeholder="Enter location total number of floor"
            className="w-full"
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="description" label="Location Description">
          <Input.TextArea rows={3} placeholder="Enter location description" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="address"
          label="Location Address"
          rules={[{ required: true }]}
        >
          <AddressSelector placeholder="Enter location address" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="minPrice"
          label="Location Average Price"
          rules={[{ required: true }]}
        >
          <InputNumber
            placeholder="Enter location average price"
            className="w-full"
            addonAfter="VND"
            formatter={value =>
              `${Number(value)?.toLocaleString()?.toString()}`
            }
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="electricCounterPrice"
          label="Electric Price"
          rules={[{ required: true }]}
        >
          <InputNumber
            placeholder="Enter Electric Price"
            className="w-full"
            addonAfter="VND"
            formatter={value =>
              `${Number(value)?.toLocaleString()?.toString()}`
            }
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="locationServiceIds" label="Services">
          <LocationServiceSelector
            mode="multiple"
            placeholder="Enter location name"
            initValues={
              initialValues?.locationServices
                ? [...initialValues?.locationServices]
                : []
            }
            variables={{
              input: {
                isActive: true,
              },
            }}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item valuePropName="checked" label="Status" name="isActive">
          <Switch defaultChecked />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="images"
          label="Location Images"
          valuePropName="srcList"
        >
          <UploadImages />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default LocationForm;

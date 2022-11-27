import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Switch,
  Typography,
} from 'antd';
import { Location } from '#/generated/schemas';
import UploadImages from '#/shared/components/commons/UploadImages';
import UploadImage from '#/shared/components/commons/UploadImage';
import { AddSVG } from '#/assets/svgs';
import { CloseOutlined } from '@ant-design/icons';
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
          <Input.TextArea rows={3} placeholder="Enter location email" />
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
      {!!initialValues?.id && (
        <Col span={24}>
          <Form.List name="contactInformations">
            {(contactInformations, { add, remove }) => (
              <div className="flex flex-col gap-4">
                <Typography>Contact Informations</Typography>
                {contactInformations?.map(({ name, ...restFields }, key) => (
                  <div key={key}>
                    <Card>
                      <div className="flex items-center justify-end">
                        <CloseOutlined onClick={() => remove(key)} />
                      </div>
                      <Row gutter={[16, 16]}>
                        <Form.Item name={[name, 'id']} hidden />
                        <Col span={12}>
                          <Form.Item
                            {...restFields}
                            name={[name, 'name']}
                            label="Contact Name"
                          >
                            <Input placeholder="Enter contact name" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restFields}
                            name={[name, 'email']}
                            label="Contact Email"
                          >
                            <Input placeholder="Enter contact email" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restFields}
                            label="Contact address"
                            name={[name, 'address']}
                          >
                            <Input placeholder="Enter contact address" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restFields}
                            label="Contact Phone Number"
                            name={[name, 'phoneNumber']}
                          >
                            <Input placeholder="Enter contact phone number" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                ))}
                <div>
                  <Button
                    type="link"
                    icon={<AddSVG className="anticon" />}
                    onClick={() => add()}
                  >
                    Add Contact Information
                  </Button>
                </div>
              </div>
            )}
          </Form.List>
        </Col>
      )}
    </Row>
  );
}

export default LocationForm;

import { Button, Col, Form, Row, Space } from 'antd';
import { PropsWithChildren } from 'react';

interface Props<Type> {
  onFilter: (values: Partial<Type>) => void;
  extraButton?: JSX.Element;
}

function FilterWrapper<Type>({
  onFilter,
  children,
  extraButton,
}: PropsWithChildren<Props<Type>>) {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    onFilter({});
  };

  return (
    <Form
      className="flex items-center justify-between"
      form={form}
      onFinish={onFilter}
    >
      <Row className="w-full">
        <Col xs={24} md={24} xl={17}>
          <Row align="middle" gutter={10}>
            {children}
          </Row>
        </Col>
        <Col xs={24} md={24} xl={7}>
          <Space size="middle" className="flex justify-end">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Filter
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={onReset}>Clear Filter</Button>
            </Form.Item>
            {extraButton && <Form.Item>{extraButton}</Form.Item>}
          </Space>
        </Col>
      </Row>
    </Form>
  );
}

export default FilterWrapper;

import { Col, Form, FormProps, Row, Space } from 'antd';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { BroomSVG, SearchSVG } from '#/assets/svgs';
import ButtonBrown from '../styled/ButtonBrown';

interface Props<Type> {
  onFilter: (values: Partial<Type>) => void;
  setFilterBusinessTypes?: Dispatch<SetStateAction<string>>;
}

function FilterWrapper<Type>({
  onFilter,
  children,
  setFilterBusinessTypes,
  ...props
}: PropsWithChildren<Props<Type>> & FormProps) {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    onFilter({});
    setFilterBusinessTypes && setFilterBusinessTypes('');
  };

  return (
    <Form
      className="flex items-center justify-between"
      form={form}
      onFinish={onFilter}
      {...props}
    >
      <Row className="w-full">
        <Col xs={24} md={24} lg={16} xl={17} xxl={20}>
          <Row align="middle" gutter={10}>
            {children}
          </Row>
        </Col>
        <Col xs={24} md={24} lg={8} xl={7} xxl={4}>
          <Space size={4} className="flex justify-end gap-2">
            <Form.Item>
              <ButtonBrown
                htmlType="submit"
                type="primary"
                icon={<SearchSVG width={16} height={16} className="anticon" />}
                className="px-3"
              >
                Search
              </ButtonBrown>
            </Form.Item>
            <Form.Item>
              <ButtonBrown
                onClick={onReset}
                icon={<BroomSVG width={16} height={16} className="anticon" />}
                className="px-3"
              >
                Clear
              </ButtonBrown>
            </Form.Item>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}

export default FilterWrapper;

import { Form, Input, Col } from 'antd';
import { GetContactsFilter } from './List';
import FilterWrapper from '#/shared/components/commons/FilterWrapper';

interface Props {
  onFilter: (values: GetContactsFilter) => void;
}

function Filter({ onFilter }: Props) {
  return (
    <FilterWrapper<GetContactsFilter> onFilter={onFilter}>
      <Col xl={6} xs={12}>
        <Form.Item name="name">
          <Input placeholder="Search name" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="address">
          <Input placeholder="Search address" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="email">
          <Input placeholder="Search email" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="phoneNumber">
          <Input placeholder="Search phone number" />
        </Form.Item>
      </Col>
    </FilterWrapper>
  );
}

export default Filter;

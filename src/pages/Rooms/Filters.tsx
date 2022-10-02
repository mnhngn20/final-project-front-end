import { Form, Input, Col } from 'antd';
import { GetUsersFilter } from './List';
import StatusSelector from '#/shared/components/selectors/StatusSelector';
import FilterWrapper from '#/shared/components/commons/FilterWrapper';

interface Props {
  onFilter: (values: GetUsersFilter) => void;
}

function Filter({ onFilter }: Props) {
  return (
    <FilterWrapper<GetUsersFilter> onFilter={onFilter}>
      <Col xl={6} xs={12}>
        <Form.Item name="email">
          <Input placeholder="Search Email" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="fullName">
          <Input placeholder="Search Name" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="isActive">
          <StatusSelector placeholder="Filter by status" />
        </Form.Item>
      </Col>
    </FilterWrapper>
  );
}

export default Filter;

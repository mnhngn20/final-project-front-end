import { Form, Input, Col } from 'antd';
import { GetIncidentsFilter } from './List';
import StatusSelector from '#/shared/components/selectors/StatusSelector';
import FilterWrapper from '#/shared/components/commons/FilterWrapper';

interface Props {
  onFilter: (values: GetIncidentsFilter) => void;
}

function Filter({ onFilter }: Props) {
  return (
    <FilterWrapper<GetIncidentsFilter> onFilter={onFilter}>
      <Col xl={6} xs={12}>
        <Form.Item name="email">
          <Input placeholder="Search Email" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="name">
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

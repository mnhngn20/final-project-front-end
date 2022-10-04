import { Form, Input, Col, InputNumber } from 'antd';
import { GetRoomsFilter } from './List';
import FilterWrapper from '#/shared/components/commons/FilterWrapper';
import RoomStatusSelector from '#/shared/components/selectors/RoomStatusSelector';

interface Props {
  onFilter: (values: GetRoomsFilter) => void;
}

function Filter({ onFilter }: Props) {
  return (
    <FilterWrapper<GetRoomsFilter> onFilter={onFilter}>
      <Col xl={6} xs={12}>
        <Form.Item name="name">
          <Input placeholder="Search room name" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="minBasePrice">
          <InputNumber placeholder="Search by min price" className="w-full" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="maxBasePrice">
          <Input placeholder="Search by max price" className="w-full" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="floor">
          <InputNumber className="w-full" placeholder="Search by floor" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="status">
          <RoomStatusSelector placeholder="Filter by room status" />
        </Form.Item>
      </Col>
    </FilterWrapper>
  );
}

export default Filter;

import { Form, Col, DatePicker } from 'antd';
import FilterWrapper from '#/shared/components/commons/FilterWrapper';
import { Store } from 'antd/lib/form/interface';

interface Props {
  onFilter: (values: Store) => void;
}

function Filter({ onFilter }: Props) {
  return (
    <FilterWrapper<Store> onFilter={onFilter}>
      <Col xl={24} xs={24}>
        <Form.Item name="dates">
          <DatePicker.RangePicker className="w-full" />
        </Form.Item>
      </Col>
    </FilterWrapper>
  );
}

export default Filter;

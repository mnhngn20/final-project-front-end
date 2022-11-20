import { Form, Col } from 'antd';
import { GetPaymentsFilter } from './List';
import FilterWrapper from '#/shared/components/commons/FilterWrapper';
import PaymentStatusSelector from '#/shared/components/selectors/PaymentStatusSelector';
import LocationReservationSelector from '#/shared/components/selectors/LocationReservationSelector';

interface Props {
  onFilter: (values: GetPaymentsFilter) => void;
}

function Filter({ onFilter }: Props) {
  return (
    <FilterWrapper<GetPaymentsFilter> onFilter={onFilter}>
      <Col xl={12} xs={24}>
        <Form.Item name="status">
          <PaymentStatusSelector />
        </Form.Item>
      </Col>
      <Col xl={12} xs={24}>
        <Form.Item name="locationReservationId">
          <LocationReservationSelector
            placeholder="Search by reservation"
            className="w-full"
          />
        </Form.Item>
      </Col>
    </FilterWrapper>
  );
}

export default Filter;

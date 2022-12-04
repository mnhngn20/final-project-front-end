import { Form, Col } from 'antd';
import { GetPaymentsFilter } from './List';
import FilterWrapper from '#/shared/components/commons/FilterWrapper';
import PaymentStatusSelector from '#/shared/components/selectors/PaymentStatusSelector';
import LocationReservationSelector from '#/shared/components/selectors/LocationReservationSelector';
import RoomSelector from '#/shared/components/selectors/RoomSelector';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';

interface Props {
  onFilter: (values: GetPaymentsFilter) => void;
}

function Filter({ onFilter }: Props) {
  const { locationId } = useReactiveVar(userVar);

  return (
    <FilterWrapper<GetPaymentsFilter> onFilter={onFilter}>
      <Col xl={8} xs={24}>
        <Form.Item name="status">
          <PaymentStatusSelector />
        </Form.Item>
      </Col>
      <Col xl={8} xs={24}>
        <Form.Item name="locationReservationId">
          <LocationReservationSelector
            placeholder="Search by reservation"
            className="w-full"
          />
        </Form.Item>
      </Col>
      <Col xl={8} xs={24}>
        <Form.Item name="roomId">
          <RoomSelector
            variables={{
              input: {
                locationId: Number(locationId),
              },
            }}
            placeholder="Search by room"
            className="w-full"
          />
        </Form.Item>
      </Col>
    </FilterWrapper>
  );
}

export default Filter;

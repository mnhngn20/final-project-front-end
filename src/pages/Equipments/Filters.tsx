import { Form, Input, Col } from 'antd';
import { GetEquipmentsFilter } from './List';
import FilterWrapper from '#/shared/components/commons/FilterWrapper';
import StatusSelector from '#/shared/components/selectors/StatusSelector';
import RoomSelector from '#/shared/components/selectors/RoomSelector';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';

interface Props {
  onFilter: (values: GetEquipmentsFilter) => void;
  roomId?: number;
}

function Filter({ onFilter, roomId }: Props) {
  const { locationId } = useReactiveVar(userVar);

  return (
    <FilterWrapper<GetEquipmentsFilter> onFilter={onFilter}>
      <Col xl={6} xs={12}>
        <Form.Item name="name">
          <Input placeholder="Search equipment name" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="isActive">
          <StatusSelector placeholder="Search by status" className="w-full" />
        </Form.Item>
      </Col>
      {!roomId && (
        <Col xl={6} xs={12}>
          <Form.Item name="roomId">
            <RoomSelector
              placeholder="Search by room"
              className="w-full"
              variables={{
                input: {
                  locationId: Number(locationId),
                },
              }}
            />
          </Form.Item>
        </Col>
      )}
    </FilterWrapper>
  );
}

export default Filter;

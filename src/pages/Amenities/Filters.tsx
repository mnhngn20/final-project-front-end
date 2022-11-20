import { Form, Input, Col } from 'antd';
import { GetAmenitiesFilter } from './List';
import StatusSelector from '#/shared/components/selectors/StatusSelector';
import FilterWrapper from '#/shared/components/commons/FilterWrapper';
import AmenityTypeSelector from '#/shared/components/selectors/AmenityTypeSelector';

interface Props {
  onFilter: (values: GetAmenitiesFilter) => void;
}

function Filter({ onFilter }: Props) {
  return (
    <FilterWrapper<GetAmenitiesFilter> onFilter={onFilter}>
      <Col xl={6} xs={12}>
        <Form.Item name="name">
          <Input placeholder="Search name" />
        </Form.Item>
      </Col>
      <Col xl={6} xs={12}>
        <Form.Item name="amenityTypeId">
          <AmenityTypeSelector
            placeholder="Filter by Amenity Type"
            variables={{
              input: {
                isActive: true,
              },
            }}
          />
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

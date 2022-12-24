import { Form, Input, Col } from 'antd';
import { GetIncidentsFilter } from './List';
import FilterWrapper from '#/shared/components/commons/FilterWrapper';
import IncidentCategorySelector from '#/shared/components/selectors/IncidentCategorySelector';
import UserSelector from '#/shared/components/selectors/UserSelector';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import { UserRole } from '#/generated/schemas';
import IncidentStatusSelector from '#/shared/components/selectors/IncidentStatusSelector';
import IncidentPrioritySelector from '#/shared/components/selectors/IncidentPrioritySelector';

interface Props {
  onFilter: (values: GetIncidentsFilter) => void;
}

function Filter({ onFilter }: Props) {
  const { locationId } = useReactiveVar(userVar);
  return (
    <FilterWrapper<GetIncidentsFilter> onFilter={onFilter}>
      <Col xl={8} xs={12}>
        <Form.Item name="title">
          <Input placeholder="Search by title" />
        </Form.Item>
      </Col>
      <Col xl={8} xs={12}>
        <Form.Item name="reporterId">
          <UserSelector
            placeholder="Filter by reporter"
            variables={{
              input: {
                role: UserRole.Customer,
                locationId: Number(locationId),
              },
            }}
          />
        </Form.Item>
      </Col>
      <Col xl={8} xs={12}>
        <Form.Item name="employeeId">
          <UserSelector
            placeholder="Filter by assignee"
            variables={{
              input: {
                role: UserRole.Admin,
                locationId: Number(locationId),
              },
            }}
          />
        </Form.Item>
      </Col>
      <Col xl={8} xs={12}>
        <Form.Item name="status">
          <IncidentStatusSelector placeholder="Filter by status" />
        </Form.Item>
      </Col>
      <Col xl={8} xs={12}>
        <Form.Item name="priority">
          <IncidentPrioritySelector placeholder="Filter by priority" />
        </Form.Item>
      </Col>
      <Col xl={8} xs={12}>
        <Form.Item name="incidentCategoryId">
          <IncidentCategorySelector placeholder="Filter by category" />
        </Form.Item>
      </Col>
    </FilterWrapper>
  );
}

export default Filter;

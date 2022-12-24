import { Button, Table, Tooltip, Typography } from 'antd';
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import IncidentForm from './Form';
import Filters from './Filters';
import {
  OrderBy,
  useGetIncidentsQuery,
  IncidentPriority,
  IncidentStatus,
  Incident,
  useUpsertIncidentMutation,
  UpsertIncidentInput,
  User,
} from '#/generated/schemas';
import { FormModal } from '#/shared/components/commons/FormModal';
import { useTable } from '#/shared/hooks/useTable';
import { Link } from 'react-router-dom';
import { DeepPartial } from '#/shared/utils/type';
import { showError, showSuccess } from '#/shared/utils/notification';
import { formatDisplayUser, formatId } from '#/shared/utils/format';
import { formatDate } from '#/shared/utils/date';
import { AddSVG, EyeSVG, FlagOutlineSVG } from '#/assets/svgs';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import CustomTag from '#/shared/components/commons/CustomTag';
import {
  getIncidentPriorityColor,
  getIncidentStatus,
  getIncidentStatusColor,
} from './utils';

export type GetIncidentsFilter = {
  title?: string;
  fromCustomer?: boolean;
  priority?: IncidentPriority;
  status?: IncidentStatus;
  employeeId?: number;
  reporterId?: number;
  roomId?: number;
  incidentCategoryId?: number;
  dueDate?: string;
};

interface ListProps {
  roomId?: number;
}

function List({ roomId }: ListProps) {
  const currentUser = useReactiveVar(userVar);
  const [filters, setFilters] = useState<GetIncidentsFilter | undefined>(
    undefined,
  );
  const { pageSize, onChange, currentPage, setCurrentPage } = useTable();
  const [selectedItem, setSelectedItem] = useState<
    DeepPartial<Incident> | undefined
  >(undefined);
  const clearSelectedItem = () => {
    setSelectedItem(undefined);
  };
  const { data, loading, refetch } = useGetIncidentsQuery({
    variables: {
      input: {
        orderBy: OrderBy.Desc,
        page: currentPage,
        limit: pageSize,
        locationId: currentUser.locationId,
        ...filters,
      },
    },
    fetchPolicy: 'network-only',
  });
  const incidents = data?.getIncidents?.items ?? [];

  const [upsertIncident, { loading: upsertIncidentLoading }] =
    useUpsertIncidentMutation({
      onCompleted() {
        showSuccess(
          selectedItem?.id
            ? 'Update Incident successfully!'
            : 'Create Incident successfully!',
        );
        refetch();
        clearSelectedItem();
      },
      onError: showError,
    });

  const onFilter = ({
    dueDate,
    employeeId,
    fromCustomer,
    incidentCategoryId,
    priority,
    reporterId,
    roomId,
    status,
    title,
  }: GetIncidentsFilter) => {
    const newFilter = {
      ...(employeeId && { employeeId: Number(employeeId) }),
      ...(incidentCategoryId && {
        incidentCategoryId: Number(incidentCategoryId),
      }),
      ...(reporterId && { reporterId: Number(reporterId) }),
      ...(roomId && { roomId: Number(roomId) }),
      ...(fromCustomer !== undefined &&
        fromCustomer !== null && {
          fromCustomer,
        }),
      ...(priority && { priority }),
      ...(status && { status }),
      ...(title && { title }),
      ...(dueDate && {
        dueDate: dayjs.utc(dueDate).startOf('date').toISOString(),
      }),
    };
    setCurrentPage(1);
    setFilters(newFilter);
  };

  const onSubmit = ({
    incidentCategoryId,
    reporterId,
    employeeId,
    roomId,
    dueDate,
    id,
    ...rest
  }: UpsertIncidentInput) => {
    upsertIncident({
      variables: {
        input: {
          ...(id && { id: Number(id) }),
          ...(incidentCategoryId && {
            incidentCategoryId: Number(incidentCategoryId),
          }),
          ...(reporterId && { reporterId: Number(reporterId) }),
          ...(employeeId && { employeeId: Number(employeeId) }),
          ...(roomId && { roomId: Number(roomId) }),
          ...(dueDate && {
            dueDate: dayjs.utc(dueDate).startOf('date').toISOString(),
          }),
          ...rest,
          locationId: Number(currentUser?.locationId),
        },
      },
    });
  };

  const COLUMNS = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: formatId,
      },
      {
        title: 'Incident Type',
        dataIndex: ['incidentCategory', 'name'],
        key: 'incidentCategoryName',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Room',
        dataIndex: ['room', 'name'],
        key: 'roomName',
        render: (name: string, { room }: DeepPartial<Incident>) => (
          <Tooltip title={room?.description}>{`Room ${name}`}</Tooltip>
        ),
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        render: (priority?: IncidentPriority) => (
          <div
            className={`${getIncidentPriorityColor(
              priority,
            )} flex items-center gap-2`}
          >
            <FlagOutlineSVG width={16} height={16} />
            {priority}
          </div>
        ),
      },
      {
        title: 'Incident Status',
        dataIndex: 'status',
        key: 'status',
        render: (status?: IncidentStatus) => (
          <CustomTag
            className={getIncidentStatusColor(status)}
            content={getIncidentStatus(status)}
          />
        ),
      },
      {
        title: 'Reported By',
        dataIndex: 'reporter',
        key: 'reporter',
        render: formatDisplayUser,
      },
      {
        title: 'Employee In Charge',
        dataIndex: 'employee',
        key: 'employee',
        render: (employee?: User) =>
          employee ? formatDisplayUser(employee) : 'N/A',
      },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
        render: (dueDate: Date) => formatDate(dueDate, 'hh:mm A, DD MMM YYYY'),
      },
      {
        title: 'Created Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: Date) =>
          formatDate(createdAt, 'hh:mm A, DD MMM YYYY'),
      },
      {
        title: 'Updated Date',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (updatedAt: Date) =>
          formatDate(updatedAt, 'hh:mm A, DD MMM YYYY'),
      },
      {
        title: '',
        dataIndex: 'id',
        key: 'action',
        fixed: 'right' as const,
        render: (_: unknown, record: DeepPartial<Incident>) => {
          return (
            <div className="flex items-center justify-center gap-4 text-base text-primary-color">
              <Link to={`/incidents/${record?.id}`}>
                <EyeSVG width={24} height={24} />
              </Link>
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <Filters onFilter={onFilter} />
      <div className="rounded-xl bg-[white] px-4">
        <div className="flex items-center justify-between py-4">
          <Typography className="text-xl font-semibold">
            Incident List
          </Typography>
          {!roomId && (
            <Button
              type="primary"
              className="w-min"
              icon={<AddSVG className="anticon" />}
              onClick={() => setSelectedItem({})}
            >
              Create
            </Button>
          )}
        </div>
        <Table
          rowKey="id"
          dataSource={incidents as unknown as DeepPartial<Incident>[]}
          columns={COLUMNS as any}
          scroll={{ x: 'max-content' }}
          loading={loading || upsertIncidentLoading}
          onChange={onChange}
          pagination={false}
        />

        <PaginationPanel
          current={currentPage ?? 1}
          pageSize={10}
          total={data?.getIncidents?.total ?? 0}
          setCurrentPage={setCurrentPage}
          className="flex justify-end py-6 pr-6"
          showQuickJumper
        />
      </div>
      <FormModal<UpsertIncidentInput>
        loading={upsertIncidentLoading}
        onSubmit={onSubmit}
        name="Incident"
        onClose={clearSelectedItem}
        selectedItem={selectedItem}
        initialValues={selectedItem}
      >
        <IncidentForm />
      </FormModal>
    </>
  );
}
export default List;

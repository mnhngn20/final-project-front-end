import { Button, Table, Typography } from 'antd';
import { useState, useMemo } from 'react';
import LocationReservationForm from './Form';
import Filters from './Filters';
import {
  OrderBy,
  LocationReservationStatus,
  LocationReservation,
  useGetLocationReservationsQuery,
  useUpsertLocationReservationMutation,
  UpsertLocationReservationInput,
} from '#/generated/schemas';
import { FormModal } from '#/shared/components/commons/FormModal';
import { useTable } from '#/shared/hooks/useTable';
import { Link, useNavigate } from 'react-router-dom';
import { DeepPartial } from '#/shared/utils/type';
import { showError, showSuccess } from '#/shared/utils/notification';
import { AddSVG, EyeSVG } from '#/assets/svgs';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import dayjs from 'dayjs';
import { formatDisplayUser } from '#/shared/utils/format';
import CustomTag from '#/shared/components/commons/CustomTag';
import { getLocationReservationStatusColor } from './utils';

export type GetLocationReservationsFilter = {
  status?: LocationReservationStatus;
  fromDate?: string;
  toDate?: string;
  createdById?: number;
};

function List() {
  const currentUser = useReactiveVar(userVar);
  const [filters, setFilters] = useState<
    GetLocationReservationsFilter | undefined
  >(undefined);
  const { pageSize, onChange, currentPage, setCurrentPage } = useTable();
  const [selectedItem, setSelectedItem] = useState<
    DeepPartial<LocationReservation> | undefined
  >(undefined);
  const navigate = useNavigate();

  const clearSelectedItem = () => {
    setSelectedItem(undefined);
  };

  const { data, loading, refetch } = useGetLocationReservationsQuery({
    variables: {
      input: {
        orderBy: OrderBy.Desc,
        page: currentPage,
        limit: pageSize,
        locationId: Number(currentUser?.locationId),
        ...filters,
      },
    },
    skip: !currentUser?.locationId,
    fetchPolicy: 'network-only',
  });

  const locations = data?.getLocationReservations?.items ?? [];

  const [
    upsertLocationReservation,
    { loading: upsertLocationReservationLoading },
  ] = useUpsertLocationReservationMutation({
    onCompleted(data) {
      showSuccess('Created location reservation successfully!');
      clearSelectedItem();
      navigate(
        `/location-reservations/${data?.upsertLocationReservation?.locationReservation?.id}`,
      );
      refetch();
    },
    onError: showError,
  });

  const onFilter = ({
    createdById,
    fromDate,
    status,
    toDate,
  }: GetLocationReservationsFilter) => {
    const newFilter = {
      ...(toDate && {
        toDate: dayjs.utc(toDate).startOf('month').toISOString(),
      }),
      ...(fromDate && {
        fromDate: dayjs.utc(fromDate).startOf('month').toISOString(),
      }),
      ...(status && { status }),
      ...(createdById && { createdById: Number(createdById) }),
    };
    setCurrentPage(1);
    setFilters(newFilter);
  };

  const onSubmit = ({
    createdById,
    startDate,
  }: UpsertLocationReservationInput) => {
    upsertLocationReservation({
      variables: {
        input: {
          startDate: dayjs.utc(startDate).startOf('date').toISOString(),
          locationId: Number(currentUser?.locationId),
          createdById: Number(createdById),
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
      },
      {
        title: 'Location Name',
        dataIndex: ['location', 'name'],
        key: 'locationName',
      },
      {
        title: 'Total Calculated Price',
        dataIndex: 'totalCalculatedPrice',
        key: 'totalCalculatedPrice',
        render: (price?: number) => (price ?? 0)?.toLocaleString(),
      },
      {
        title: 'Total Received Price',
        dataIndex: 'totalReceivedPrice',
        key: 'totalReceivedPrice',
        render: (price?: number) => (price ?? 0)?.toLocaleString(),
      },
      {
        title: 'Start Month',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (startDate?: string) => dayjs(startDate)?.format('MM / YYYY'),
      },
      {
        title: 'In Charge Of',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: formatDisplayUser,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status?: LocationReservationStatus) => (
          <CustomTag
            content={status}
            className={getLocationReservationStatusColor(status)}
          />
        ),
      },
      {
        title: '',
        dataIndex: 'id',
        key: 'action',
        fixed: 'right' as const,
        render: (_: unknown, record: DeepPartial<LocationReservation>) => {
          return (
            <div className="flex items-center justify-center gap-4 text-base text-primary-color">
              <Link to={`/location-reservations/${record?.id}`}>
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
            Location Reservation List
          </Typography>
          <Button
            type="primary"
            onClick={() => setSelectedItem({})}
            icon={<AddSVG className="anticon" />}
          >
            Create
          </Button>
        </div>
        <Table
          rowKey="id"
          dataSource={locations}
          columns={COLUMNS}
          scroll={{ x: 'max-content' }}
          loading={loading || upsertLocationReservationLoading}
          onChange={onChange}
          pagination={false}
        />
        <PaginationPanel
          current={currentPage ?? 1}
          pageSize={10}
          total={data?.getLocationReservations?.total ?? 0}
          setCurrentPage={setCurrentPage}
          className="flex justify-end py-6 pr-6"
          showQuickJumper
        />
      </div>
      <FormModal<UpsertLocationReservationInput>
        loading={upsertLocationReservationLoading}
        onSubmit={onSubmit}
        name="Location Reservation"
        onClose={clearSelectedItem}
        selectedItem={selectedItem}
        initialValues={selectedItem}
      >
        <LocationReservationForm />
      </FormModal>
    </>
  );
}
export default List;
import { Button, Table, Typography, Modal } from 'antd';
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
  useDeleteLocationReservationMutation,
} from '#/generated/schemas';
import { FormModal } from '#/shared/components/commons/FormModal';
import { useTable } from '#/shared/hooks/useTable';
import { Link } from 'react-router-dom';
import { DeepPartial } from '#/shared/utils/type';
import { showError, showSuccess } from '#/shared/utils/notification';
import { AddSVG, EyeSVG, TrashOutlineSVG } from '#/assets/svgs';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import dayjs, { Dayjs } from 'dayjs';
import { formatDisplayUser } from '#/shared/utils/format';
import CustomTag from '#/shared/components/commons/CustomTag';
import { getLocationReservationStatusColor } from './utils';
import { formatDate } from '#/shared/utils/date';

export type GetLocationReservationsFilter = {
  status?: LocationReservationStatus;
  dates?: [Dayjs, Dayjs];
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
    onCompleted() {
      showSuccess('Created location reservation successfully!');
      clearSelectedItem();
      refetch();
    },
    onError: showError,
  });

  const [deleteLocationReservation] = useDeleteLocationReservationMutation({
    onCompleted() {
      showSuccess('Successfully deleted Location Reservation!');
      refetch();
    },
    onError: showError,
  });

  const onFilter = ({
    createdById,
    status,
    dates,
  }: GetLocationReservationsFilter) => {
    const newFilter = {
      ...(dates?.[0] && {
        fromDate: dayjs.utc(dates?.[0]).startOf('month').toISOString(),
        toDate: dayjs.utc(dates?.[1]).endOf('month').toISOString(),
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
          startDate: dayjs.utc(startDate).startOf('month').toISOString(),
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
        render: (price?: number) => `${(price ?? 0)?.toLocaleString()} VND`,
      },
      {
        title: 'Total Received Price',
        dataIndex: 'totalReceivedPrice',
        key: 'totalReceivedPrice',
        render: (price?: number) => `${(price ?? 0)?.toLocaleString()} VND`,
      },
      {
        title: 'Start Month',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (startDate?: string) => dayjs(startDate)?.format('MMM YYYY'),
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
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt?: string) =>
          formatDate(createdAt, 'hh:mm A, DD MMMM YYYY'),
      },
      {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (updatedAt?: string) =>
          formatDate(updatedAt, 'hh:mm A, DD MMMM YYYY'),
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
              <span
                className="cursor-pointer text-error"
                title="Are you sure to delete this record?"
                onClick={() => {
                  Modal.warning({
                    centered: true,
                    closable: true,
                    maskClosable: true,
                    title: 'Are you sure to delete this Equipment?',
                    okText: 'Delete',
                    onOk: () => {
                      deleteLocationReservation({
                        variables: {
                          id: Number(record?.id),
                        },
                      });
                    },
                  });
                }}
              >
                <TrashOutlineSVG width={24} height={24} />
              </span>
            </div>
          );
        },
      },
    ],
    [deleteLocationReservation],
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
          columns={COLUMNS as any}
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

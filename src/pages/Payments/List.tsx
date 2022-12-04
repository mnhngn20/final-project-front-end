import { Table, Typography } from 'antd';
import { useState, useMemo } from 'react';
import Filters from './Filters';
import {
  OrderBy,
  useGetPaymentsQuery,
  Payment,
  PaymentStatus,
  DiscountType,
} from '#/generated/schemas';
import { useTable } from '#/shared/hooks/useTable';
import { DeepPartial } from '#/shared/utils/type';
import { formatId } from '#/shared/utils/format';
import { formatDate } from '#/shared/utils/date';
import { ColumnsType } from 'antd/lib/table';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';
import dayjs from 'dayjs';
import CustomTag from '#/shared/components/commons/CustomTag';
import {
  getPaymentStatusColor,
  getPaymentStatusTitle,
} from '../LocationReservations/utils';
import { Link } from 'react-router-dom';
import { EyeSVG } from '#/assets/svgs';
import PaymentDetailModal from './PaymentDetailModal';

export type GetPaymentsFilter = {
  locationReservationId?: number;
  status?: PaymentStatus;
  roomId?: number;
};

interface ListProps {
  userId?: number;
}

function List({ userId }: ListProps) {
  const [filters, setFilters] = useState<GetPaymentsFilter | undefined>(
    undefined,
  );
  const { pageSize, onChange, currentPage, setCurrentPage } = useTable();

  const { data, loading } = useGetPaymentsQuery({
    variables: {
      input: {
        orderBy: OrderBy.Desc,
        page: currentPage,
        limit: pageSize,
        ...(userId && { userIds: [Number(userId)] }),
        ...filters,
      },
    },
    fetchPolicy: 'network-only',
  });
  const equipments = data?.getPayments?.items ?? [];

  const onFilter = ({
    locationReservationId,
    status,
    roomId,
  }: GetPaymentsFilter) => {
    const newFilter = {
      ...(locationReservationId && {
        locationReservationId: Number(locationReservationId),
      }),
      ...(roomId && {
        roomId: Number(roomId),
      }),
      ...(status && { status }),
    };
    setCurrentPage(1);
    setFilters(newFilter);
  };

  const COLUMNS: ColumnsType<DeepPartial<Payment>> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: formatId,
      },
      {
        title: 'Room Name',
        dataIndex: ['room', 'name'],
        key: 'roomName',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: PaymentStatus) => (
          <CustomTag
            content={getPaymentStatusTitle(status)}
            className={`h-min ${getPaymentStatusColor(status)}`}
          />
        ),
      },
      {
        title: 'Payment Date',
        dataIndex: ['locationReservation', 'startDate'],
        key: 'paymentDate',
        render: (date: string) => dayjs(date).format('MMM YYYY'),
      },
      {
        title: 'Electric Counter',
        dataIndex: 'electricCounter',
        key: 'electricCounter',
        render: (electricCounter: number) =>
          `${electricCounter?.toLocaleString()} counter(s)`,
      },
      {
        title: 'Water Price',
        dataIndex: 'waterPrice',
        key: 'waterPrice',
        render: (waterPrice: number) => `${waterPrice?.toLocaleString()} VND`,
      },
      {
        title: 'Pre-paid Fee',
        dataIndex: 'prePaidFee',
        key: 'prePaidFee',
        render: (prePaidFee: number) => `${prePaidFee?.toLocaleString()} VND`,
      },
      {
        title: 'Extra Fee',
        dataIndex: 'extraFee',
        key: 'extraFee',
        render: (extraFee: number) => `${extraFee?.toLocaleString()} VND`,
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
        render: (discount: number, { discountType }: DeepPartial<Payment>) =>
          `${discount?.toLocaleString()} ${
            discountType === DiscountType.FixedCashDiscount ? 'VND' : '$'
          }`,
      },
      {
        title: 'Created Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: Date) => formatDate(date, 'hh:mm A, DD MMMM YYYY'),
      },
      {
        title: 'Update Date',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (date: Date) => formatDate(date, 'hh:mm A, DD MMMM YYYY'),
      },
      {
        title: '',
        dataIndex: 'id',
        key: 'action',
        fixed: 'right' as const,
        render: (id: string) => {
          return (
            <div className="flex items-center justify-center gap-4 text-base text-primary-color">
              <Link to={`/payments?paymentId=${id}`}>
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
            User Payment List
          </Typography>
        </div>
        <Table
          rowKey="id"
          dataSource={equipments as DeepPartial<Payment>[]}
          columns={COLUMNS}
          scroll={{ x: 'max-content' }}
          loading={loading}
          onChange={onChange}
          pagination={false}
        />
        <PaginationPanel
          current={currentPage ?? 1}
          pageSize={10}
          total={data?.getPayments?.total ?? 0}
          setCurrentPage={setCurrentPage}
          className="flex justify-end py-6 pr-6"
          showQuickJumper
        />
      </div>
      <PaymentDetailModal />
    </>
  );
}
export default List;

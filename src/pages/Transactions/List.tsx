import { Table, Typography } from 'antd';
import { useState, useMemo } from 'react';
import Filters from './Filters';
import {
  OrderBy,
  Payment,
  Transaction,
  useGetTransactionsQuery,
} from '#/generated/schemas';
import { useTable } from '#/shared/hooks/useTable';
import { DeepPartial } from '#/shared/utils/type';
import { formatDate } from '#/shared/utils/date';
import { ColumnsType } from 'antd/lib/table';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';
import dayjs from 'dayjs';
import { Store } from 'antd/lib/form/interface';

interface ListProps {
  userId?: number;
}

function List({ userId }: ListProps) {
  const [filters, setFilters] = useState<Store | undefined>(undefined);
  const { pageSize, onChange, currentPage, setCurrentPage } = useTable();

  const { data, loading } = useGetTransactionsQuery({
    variables: {
      input: {
        orderBy: OrderBy.Desc,
        page: currentPage,
        limit: pageSize,
        ...(userId && { userId: Number(userId) }),
        ...filters,
      },
    },
    fetchPolicy: 'network-only',
  });
  const transactions = data?.getTransactions?.items ?? [];

  const onFilter = ({ dates }: Store) => {
    const newFilter = {
      ...(dates?.[0] && {
        fromDate: dayjs.utc(dates[0]).startOf('date').toISOString(),
        toDate: dayjs.utc(dates[0]).endOf('date').toISOString(),
      }),
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
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (description: string) => description || 'N/A',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount?: number) => `${(amount ?? 0).toLocaleString()} VND`,
      },
      {
        title: 'Paid At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: string) =>
          formatDate(createdAt, 'hh:mm DD/MM/YYYY'),
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
            User Transaction History
          </Typography>
        </div>
        <Table
          rowKey="id"
          dataSource={transactions as DeepPartial<Transaction>[]}
          columns={COLUMNS}
          scroll={{ x: 'max-content' }}
          loading={loading}
          onChange={onChange}
          pagination={false}
        />
        <PaginationPanel
          current={currentPage ?? 1}
          pageSize={10}
          total={data?.getTransactions?.total ?? 0}
          setCurrentPage={setCurrentPage}
          className="flex justify-end py-6 pr-6"
          showQuickJumper
        />
      </div>
    </>
  );
}
export default List;

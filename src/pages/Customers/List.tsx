import { Button, Table, Switch, Typography } from 'antd';
import { useState, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import UserForm from './Form';
import Filters from './Filters';
import {
  User,
  OrderBy,
  UserRole,
  UpdateUserInput,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useChangeUserStatusMutation,
} from '#/generated/schemas';
import { FormModal } from '#/shared/components/commons/FormModal';
import { useTable } from '#/shared/hooks/useTable';
import { Link } from 'react-router-dom';
import { Store } from 'antd/lib/form/interface';
import { DeepPartial } from '#/shared/utils/type';
import { showError, showSuccess } from '#/shared/utils/notification';
import { formatDisplayUser, formatId } from '#/shared/utils/format';
import { formatDate } from '#/shared/utils/date';
import RoleTag from '#/shared/components/commons/RoleTag';
import { ColumnsType } from 'antd/lib/table';
import { AddSVG, EditSVG, EyeSVG } from '#/assets/svgs';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';

export type GetUsersFilter<T = string> = {
  email?: string;
  name?: string;
  locationId?: number;
  isActive?: T;
};

interface ListProps {
  roomId?: number;
}

function List({ roomId }: ListProps) {
  const currentUser = useReactiveVar(userVar);
  const [filters, setFilters] = useState<GetUsersFilter<boolean> | undefined>(
    undefined,
  );
  const { pageSize, onChange, currentPage, setCurrentPage } = useTable();
  const [selectedItem, setSelectedItem] = useState<
    DeepPartial<User> | undefined
  >(undefined);
  const clearSelectedItem = () => {
    setSelectedItem(undefined);
  };
  const { data, loading, refetch } = useGetUsersQuery({
    variables: {
      input: {
        orderBy: OrderBy.Desc,
        page: currentPage,
        limit: pageSize,
        role: UserRole.Customer,
        locationId: currentUser.locationId,
        ...(roomId && { roomId: Number(roomId) }),
        ...filters,
      },
    },
    fetchPolicy: 'network-only',
  });
  const users = data?.getUsers?.items ?? [];

  const [changeUserStatus, { loading: changeUserStatusLoading }] =
    useChangeUserStatusMutation({
      onCompleted() {
        showSuccess('Updated status successfully');
        refetch();
        clearSelectedItem();
      },
      onError: showError,
    });

  const [createUser, { loading: createLoading }] = useCreateUserMutation({
    onCompleted() {
      showSuccess('Created user successfully!');
      refetch();
      clearSelectedItem();
    },
    onError: showError,
  });

  const [updateUser, { loading: updateLoading }] = useUpdateUserMutation({
    onCompleted() {
      showSuccess('Update user successfully!');
      refetch();
      clearSelectedItem();
    },
    onError: showError,
  });

  const onFilter = ({ name, email, isActive }: GetUsersFilter) => {
    const newFilter = {
      ...(name && { name }),
      ...(email && { email }),
      ...(isActive && { isActive: isActive === 'true' }),
    };
    setCurrentPage(1);
    setFilters(newFilter);
  };

  const onSubmit = ({
    avatar,
    identityNumber,
    name,
    phoneNumber,
    dateOfBirth,
    email,
    password,
    address,
    roomId,
  }: Store) => {
    if (selectedItem?.id) {
      updateUser({
        variables: {
          input: {
            avatar,
            identityNumber,
            name,
            phoneNumber,
            address,
            id: Number(selectedItem?.id),
            dateOfBirth: dayjs.utc(dateOfBirth).startOf('date').toISOString(),
            ...(roomId && { roomId: Number(roomId) }),
          },
        },
      });
    } else {
      createUser({
        variables: {
          input: {
            email,
            password,
            address,
            avatar,
            dateOfBirth: dayjs.utc(dateOfBirth).startOf('date').toISOString(),
            identityNumber,
            name,
            phoneNumber,
          },
        },
      });
    }
  };

  const COLUMNS: ColumnsType<DeepPartial<User>> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: formatId,
      },
      {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, record: DeepPartial<User>) => formatDisplayUser(record),
      },
      {
        title: 'Date of Birth',
        dataIndex: 'dateOfBirth',
        key: 'dateOfBirth',
        render: (date: Date) => formatDate(date),
      },
      {
        title: 'Phone',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render: (phoneNumber?: string) => phoneNumber ?? 'N/A',
      },
      {
        title: 'Card ID',
        dataIndex: 'identityNumber',
        key: 'identityNumber',
        render: (identityNumber?: string) => identityNumber ?? 'N/A',
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (role?: UserRole) => <RoleTag role={role} />,
      },
      {
        title: 'Status',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (isActive: boolean, { id }: DeepPartial<User>) => (
          <Switch
            checked={isActive}
            onChange={() =>
              changeUserStatus({
                variables: {
                  input: {
                    id: Number(id),
                    isActive: !isActive,
                  },
                },
              })
            }
          />
        ),
      },
      {
        title: 'Current Room',
        dataIndex: ['room', 'name'],
        key: 'roomName',
        render: (roomName?: string) => roomName ?? 'N/A',
      },
      {
        title: 'Created Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt?: string) =>
          dayjs(createdAt).format('hh:mm A, DD MMM YYYY'),
      },
      {
        title: 'Updated Date',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (updatedAt?: string) =>
          dayjs(updatedAt).format('hh:mm A, DD MMM YYYY'),
      },
      {
        title: '',
        dataIndex: 'id',
        key: 'action',
        fixed: 'right' as const,
        render: (_: unknown, record: DeepPartial<User>) => {
          const onEdit = () => {
            setSelectedItem({
              ...record,
              dateOfBirth: dayjs(String(record?.dateOfBirth)).isValid()
                ? (dayjs(String(record?.dateOfBirth)) as DeepPartial<Dayjs>)
                : undefined,
            });
          };
          return (
            <div className="flex items-center justify-center gap-4 text-base text-primary-color">
              <Link to={`/customers/${record?.id}`}>
                <EyeSVG width={24} height={24} />
              </Link>
              <Button type="link" onClick={onEdit}>
                <EditSVG width={24} height={24} />
              </Button>
            </div>
          );
        },
      },
    ],
    [changeUserStatus],
  );

  return (
    <>
      <Filters onFilter={onFilter} />
      <div className="rounded-xl bg-[white] px-4">
        <div className="flex items-center justify-between py-4">
          <Typography className="text-xl font-semibold">User List</Typography>
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
          dataSource={users as unknown as DeepPartial<User>[]}
          columns={COLUMNS}
          scroll={{ x: 'max-content' }}
          loading={
            loading || createLoading || updateLoading || changeUserStatusLoading
          }
          onChange={onChange}
          pagination={false}
        />

        <PaginationPanel
          current={currentPage ?? 1}
          pageSize={10}
          total={data?.getUsers?.total ?? 0}
          setCurrentPage={setCurrentPage}
          className="flex justify-end py-6 pr-6"
          showQuickJumper
        />
      </div>
      <FormModal<UpdateUserInput>
        loading={createLoading || updateLoading}
        onSubmit={onSubmit}
        name="Customer"
        onClose={clearSelectedItem}
        selectedItem={selectedItem}
        initialValues={selectedItem}
      >
        <UserForm />
      </FormModal>
    </>
  );
}
export default List;

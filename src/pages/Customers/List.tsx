import { Button, Table, Switch } from 'antd';
import { useState, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { EditFilled, EyeFilled } from '@ant-design/icons';
import { useReactiveVar } from '@apollo/client';
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
import { userVar } from '#/graphql/cache';
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

export type GetUsersFilter<T = string> = {
  email?: string;
  name?: string;
  locationId?: number;
  isActive?: T;
  role?: UserRole;
};

function List() {
  const [filters, setFilters] = useState<GetUsersFilter<boolean> | undefined>(
    undefined,
  );
  const currentUser = useReactiveVar(userVar) as User;
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
        ...filters,
      },
    },
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

  const onFilter = ({
    name,
    email,
    role,
    locationId,
    isActive,
  }: GetUsersFilter) => {
    const newFilter = {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
      ...(isActive && { isActive: isActive === 'true' }),
      ...(locationId !== undefined && { locationId }),
    };
    setCurrentPage(1);
    setFilters(newFilter);
  };

  const onSubmit = (values: Store) => {
    const { locationId, ...updateValues } = values;
    if (selectedItem?.id) {
      updateUser({
        variables: {
          input: {
            ...updateValues,
            id: Number(selectedItem?.id),
          },
        },
      });
    } else {
      createUser({
        variables: {
          input: {
            ...values,
            ...(locationId && { locationId: Number(locationId) }),
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
        dataIndex: 'dob',
        key: 'dob',
        render: (date: Date) => formatDate(date),
      },
      {
        title: 'Phone',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: 'Card ID',
        dataIndex: 'identityNumber',
        key: 'identityNumber',
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
            <div className="flex items-center justify-center">
              <Button className="mr-2 border-none" shape="circle">
                <Link to={`/users/${record?.id}`}>
                  <EyeFilled />
                </Link>
              </Button>
              <Button onClick={onEdit} className="border-none" shape="circle">
                <EditFilled />
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
      <Filters
        onFilter={onFilter}
        extraButton={
          <Button type="primary" onClick={() => setSelectedItem({})}>
            Create
          </Button>
        }
      />
      <Table
        rowKey="id"
        dataSource={users as unknown as DeepPartial<User>[]}
        columns={COLUMNS}
        scroll={{ x: 'max-content' }}
        loading={
          loading || createLoading || updateLoading || changeUserStatusLoading
        }
        onChange={onChange}
        pagination={{
          total: data?.getUsers.total ?? 0,
          current: currentPage,
        }}
      />
      <FormModal<UpdateUserInput>
        loading={createLoading || updateLoading}
        onSubmit={onSubmit}
        name="User"
        onClose={clearSelectedItem}
        selectedItem={selectedItem}
        initialValues={selectedItem}
      >
        <UserForm isSuperAdmin={currentUser.role === UserRole.SuperAdmin} />
      </FormModal>
    </>
  );
}
export default List;

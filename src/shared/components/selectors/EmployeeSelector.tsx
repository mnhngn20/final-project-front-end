import {
  GetUsersDocument,
  GetUsersQuery,
  GetUsersQueryVariables,
  User,
  UserRole,
} from '#/generated/schemas';
import { userVar } from '#/graphql/cache';
import { useInfiniteLoadQuery } from '#/shared/hooks/useInfinityLoadQuery';
import { formatDisplayUser } from '#/shared/utils/format';
import { DeepPartial } from '#/shared/utils/type';
import { CloseOutlined } from '@ant-design/icons';
import { useReactiveVar } from '@apollo/client';
import { Avatar, Popover, Typography } from 'antd';
import { useEffect, useState } from 'react';
import DefaultAvatar from '#/assets/images/avatar.png';

interface EmployeeSelectorProps {
  value?: string;
  onChange?: (userId?: string) => void;
  disabled?: boolean;
  initialValue?: DeepPartial<User> | null;
}

export default function EmployeeSelector({
  value,
  onChange,
  disabled,
  initialValue,
}: EmployeeSelectorProps) {
  const [visible, setVisible] = useState(false);
  const { locationId } = useReactiveVar(userVar);
  const [selectedUser, setSelectedUser] = useState<
    DeepPartial<User> | undefined | null
  >(initialValue);

  const { data, loadMore } = useInfiniteLoadQuery<
    GetUsersQuery,
    GetUsersQueryVariables,
    DeepPartial<User>
  >({
    query: GetUsersDocument,
    formatData: data => data.getUsers,
    variables: {
      input: {
        role: UserRole.Admin,
        locationId: Number(locationId),
        isActive: true,
      },
    },
  });

  useEffect(() => {
    if (!value) {
      setSelectedUser(initialValue);
    } else {
      const foundUser = data.find(user => user.id === value);
      if (foundUser) {
        setSelectedUser(foundUser);
      } else {
        setSelectedUser(initialValue);
      }
    }
  }, [value, initialValue, data]);

  return (
    <Popover
      placement="bottom"
      visible={visible && !disabled}
      title={
        <div
          className="flex cursor-pointer justify-between py-1 text-xs"
          onClick={() => setVisible(false)}
        >
          Select Assignee
          <CloseOutlined />
        </div>
      }
      content={
        <div
          className="flex max-h-[25rem] flex-col overflow-y-auto p-2"
          onScroll={loadMore}
        >
          {data?.map(user => (
            <div
              onClick={() => {
                onChange?.(user?.id);
                setSelectedUser(user);
                setVisible(false);
              }}
              className={`${
                selectedUser?.id === user?.id ? 'bg-grey-primary' : ''
              } cursor-pointer p-1 hover:bg-grey-primary`}
              key={user?.id}
            >
              {formatDisplayUser(user, false)}
            </div>
          ))}
        </div>
      }
    >
      <div onClick={() => setVisible(true)}>
        <Typography className="flex cursor-pointer items-center gap-4 text-grey-secondary-300">
          <Avatar size={36} src={selectedUser?.avatar ?? DefaultAvatar} />
          {selectedUser ? (
            <span className="flex flex-col">
              <Typography className="text- font-semibold text-primary-color">
                {selectedUser?.name ?? 'N/A'}
              </Typography>
              <Typography className="text-xs">
                {selectedUser?.email ?? 'N/A'}
              </Typography>
            </span>
          ) : (
            '+ Add assignee in charge'
          )}
        </Typography>
      </div>
    </Popover>
  );
}

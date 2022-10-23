import InfinitySelect, { InfinitySelectProps } from '../commons/InfinitySelect';
import {
  GetUsersDocument,
  GetUsersQuery,
  GetUsersQueryVariables,
  User,
} from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';
import Avatar from '../commons/Avatar';
import { Typography } from 'antd';

function UserSelector({
  ...rest
}: InfinitySelectProps<DeepPartial<User>, GetUsersQueryVariables>) {
  return (
    <InfinitySelect<GetUsersQuery, GetUsersQueryVariables, DeepPartial<User>>
      formatData={data => data?.getUsers}
      query={GetUsersDocument}
      className="w-full"
      fetchPolicy="network-only"
      convertDataToOptions={users =>
        users?.map(user => ({
          value: user?.id,
          label: (
            <div className="flex gap-2">
              <div
                className={`mr-2 leading-none ${
                  rest.mode === 'multiple' ? '' : 'mt-1'
                }`}
              >
                <Avatar src={user?.avatar} size={30} />
              </div>
              <div>
                <Typography className="font-semibold text-primary-color">
                  {user?.name}
                </Typography>
                <Typography className="m-0 text-xs leading-snug">
                  {user?.email}
                </Typography>
              </div>
            </div>
          ),
        }))
      }
      {...rest}
    />
  );
}

export default UserSelector;

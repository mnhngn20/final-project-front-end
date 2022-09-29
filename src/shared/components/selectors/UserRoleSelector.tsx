import { Select, SelectProps } from 'antd';
import { UserRole } from '#/generated/schemas';

const options = [
  {
    value: UserRole.SuperAdmin,
    label: UserRole.SuperAdmin,
  },
  {
    value: UserRole.Admin,
    label: UserRole.Admin,
  },
  {
    value: UserRole.Customer,
    label: UserRole.Customer,
  },
];

function UserRoleSelector({ ...rest }: SelectProps<UserRole>) {
  return <Select className="w-full" {...rest} options={options} />;
}

export default UserRoleSelector;

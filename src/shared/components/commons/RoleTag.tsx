import { Tag } from 'antd';
import { Maybe, UserRole } from '#/generated/schemas';

interface Props {
  role?: Maybe<UserRole>;
}

function RoleTag({ role }: Props) {
  const roleColor = (() => {
    if (role === UserRole.SuperAdmin) return 'var(--info-color)';
    if (role === UserRole.Admin) return 'var(--error-color)';
    if (role === UserRole.Customer) return 'var(--grey-color)';
  })();

  return (
    <Tag color={roleColor} className="r-40">
      {role}
    </Tag>
  );
}

export default RoleTag;

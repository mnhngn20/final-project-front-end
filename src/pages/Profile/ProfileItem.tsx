import { Typography } from 'antd';
import Icon from '@ant-design/icons';
import { ComponentType, SVGProps } from 'react';

interface ProfileItemProps {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  value?: string | null;
  className?: string;
}

const { Title, Text } = Typography;

function ProfileItem({ icon, value, className }: ProfileItemProps) {
  return (
    <Typography className={`flex items-center ${className}`}>
      <Title level={5} className="my-3">
        <Icon component={icon} />
      </Title>
      <Text className="ml-2 text-base">{value ?? 'N/A'}</Text>
    </Typography>
  );
}

export default ProfileItem;

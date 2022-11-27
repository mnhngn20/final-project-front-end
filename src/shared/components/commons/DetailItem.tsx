import { Tooltip, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { ComponentType, SVGProps } from 'react';

interface ProfileItemProps {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  value?: string | number | null | JSX.Element;
  className?: string;
  toolTip?: string;
}

const { Title, Text } = Typography;

function DetailItem({ icon, toolTip, value, className }: ProfileItemProps) {
  return (
    <Tooltip title={toolTip} placement="top">
      <Typography className={`flex items-center ${className}`}>
        <Title level={5} className="my-3">
          <Icon component={icon} />
        </Title>
        <Text className="ml-2 text-base">{value ?? 'N/A'}</Text>
      </Typography>
    </Tooltip>
  );
}

export default DetailItem;

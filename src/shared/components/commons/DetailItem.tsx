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
      <Typography className={`my-1 flex gap-2 ${className}`}>
        <Title level={5} className="">
          <Icon component={icon} />
        </Title>
        <Text className="ml-2 text-base">{value ?? 'N/A'}</Text>
      </Typography>
    </Tooltip>
  );
}

export default DetailItem;

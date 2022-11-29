import { Tooltip } from 'antd';

interface PaymentItemProps {
  title?: string;
  icon?: JSX.Element;
  value?: string | number | JSX.Element;
  className?: string;
}

export default function PaymentItem({
  className,
  icon,
  title,
  value,
}: PaymentItemProps) {
  return (
    <Tooltip title={title} className={`flex items-center gap-3 ${className}`}>
      {icon}
      <span>{value}</span>
    </Tooltip>
  );
}

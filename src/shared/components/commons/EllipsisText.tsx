import { Tooltip, TooltipProps, Typography } from 'antd';

interface EllipsisTextProps {
  text?: string;
  length?: number;
  tooltipProps?: TooltipProps;
  className?: string;
}

export default function EllipsisText({
  text,
  length = 60,
  tooltipProps,
  className,
}: EllipsisTextProps) {
  return (
    <Tooltip title={text} {...tooltipProps}>
      <Typography className={className}>
        {(text?.length ?? 0) > length ? `${text?.slice(0, length)}...` : text}
      </Typography>
    </Tooltip>
  );
}

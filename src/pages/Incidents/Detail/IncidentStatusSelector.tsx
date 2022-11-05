import { TickCircleFilledSVG } from '#/assets/svgs';
import { IncidentStatus } from '#/generated/schemas';
import CustomTag from '#/shared/components/commons/CustomTag';
import { CloseOutlined } from '@ant-design/icons';
import { Divider, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { getIncidentStatus, getIncidentStatusColor } from '../utils';

interface IncidentStatusSelectorProps {
  value?: IncidentStatus | null;
  onChange?: (status: IncidentStatus) => void;
}

export default function IncidentStatusSelector({
  value,
  onChange,
}: IncidentStatusSelectorProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (value) {
      setSelectedStatus(value);
    }
  }, [value]);

  return (
    <Popover
      placement="bottom"
      visible={visible}
      content={
        <div className="flex flex-col gap-2">
          <div
            className="flex cursor-pointer justify-end text-xs"
            onClick={() => setVisible(false)}
          >
            <CloseOutlined />
          </div>
          <Divider className="m-0" />
          {Object.keys(IncidentStatus)?.map(status => (
            <CustomTag
              content={getIncidentStatus(status)}
              className={`${getIncidentStatusColor(
                status,
              )} cursor-pointer hover:opacity-90`}
              key={status}
              icon={
                status === selectedStatus && (
                  <TickCircleFilledSVG width={12} height={12} />
                )
              }
              onClick={() => {
                onChange?.(status as IncidentStatus);
                setSelectedStatus(status);
                setVisible(false);
              }}
            />
          ))}
        </div>
      }
    >
      <div onClick={() => setVisible(true)}>
        <CustomTag
          content={selectedStatus ? getIncidentStatus(selectedStatus) : 'N/A'}
          className={`${getIncidentStatusColor(
            selectedStatus,
          )} cursor-pointer font-bold`}
        />
      </div>
    </Popover>
  );
}

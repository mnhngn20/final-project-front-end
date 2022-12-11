import { FlagOutlineSVG } from '#/assets/svgs';
import { IncidentPriority } from '#/generated/schemas';
import { CloseOutlined } from '@ant-design/icons';
import { Divider, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { getIncidentPriorityColor } from '../utils';

interface IncidentPrioritySelectorProps {
  value?: IncidentPriority | null;
  onChange?: (status: IncidentPriority) => void;
  disabled?: boolean;
}

export default function IncidentPrioritySelector({
  value,
  onChange,
  disabled,
}: IncidentPrioritySelectorProps) {
  const [selectedPriority, setSelectedPriority] = useState<string | undefined>(
    undefined,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (value) {
      setSelectedPriority(value);
    }
  }, [value]);

  return (
    <Popover
      placement="bottom"
      visible={visible}
      content={
        <div className="flex flex-col gap-2 p-2">
          <div
            className="flex cursor-pointer justify-end text-xs"
            onClick={() => setVisible(false)}
          >
            <CloseOutlined />
          </div>
          <Divider className="m-0" />
          {Object.keys(IncidentPriority)?.map(priority => (
            <div
              className="flex w-full justify-between"
              key={priority}
              onClick={() => {
                setSelectedPriority(priority);
                onChange?.(priority as IncidentPriority);
                setVisible(false);
              }}
            >
              <div
                className={`${getIncidentPriorityColor(
                  priority,
                )} flex items-center gap-2`}
              >
                <FlagOutlineSVG width={16} height={16} />
                {priority}
              </div>
            </div>
          ))}
        </div>
      }
    >
      <div onClick={() => !disabled && setVisible(true)}>
        <div
          className={`${getIncidentPriorityColor(
            selectedPriority,
          )} flex items-center gap-2 ${disabled ? 'cursor-not-allowed' : ''}`}
        >
          <FlagOutlineSVG width={16} height={16} />
          {selectedPriority}
        </div>
      </div>
    </Popover>
  );
}

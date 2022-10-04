import { RoomStatus } from '#/generated/schemas';
import { Select, SelectProps } from 'antd';

const options = [
  { value: RoomStatus.Available, label: 'Available' },
  { value: RoomStatus.NotAvailable, label: 'Not Available' },
  { value: RoomStatus.Owned, label: 'Owned' },
];

function RoomStatusSelector({ ...rest }: SelectProps) {
  return (
    <Select placeholder="Filter by room status" options={options} {...rest} />
  );
}

export default RoomStatusSelector;

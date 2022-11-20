import { LocationReservationStatus } from '#/generated/schemas';
import { Select, SelectProps } from 'antd';

const options = [
  { value: LocationReservationStatus.Draft, label: 'Draft' },
  { value: LocationReservationStatus.Published, label: 'Published' },
  { value: LocationReservationStatus.Completed, label: 'Completed' },
];

function LocationReservationStatusSelector({ ...rest }: SelectProps) {
  return <Select options={options} {...rest} />;
}

export default LocationReservationStatusSelector;

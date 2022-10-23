import { IncidentStatus } from '#/generated/schemas';
import { Select, SelectProps } from 'antd';

const options = [
  { value: IncidentStatus.Cancel, label: 'Cancel' },
  { value: IncidentStatus.Done, label: 'Done' },
  { value: IncidentStatus.InProgress, label: 'In Progress' },
  { value: IncidentStatus.ToDo, label: 'To Do' },
];

function IncidentStatusSelector({ ...rest }: SelectProps) {
  return <Select options={options} {...rest} />;
}

export default IncidentStatusSelector;

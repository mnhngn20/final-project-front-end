import { IncidentPriority } from '#/generated/schemas';
import { Select, SelectProps } from 'antd';

const options = [
  { value: IncidentPriority.High, label: 'High' },
  { value: IncidentPriority.Low, label: 'Low' },
  { value: IncidentPriority.Medium, label: 'Medium' },
  { value: IncidentPriority.Urgent, label: 'Urgent' },
];

function IncidentPrioritySelector({ ...rest }: SelectProps) {
  return <Select options={options} {...rest} />;
}

export default IncidentPrioritySelector;

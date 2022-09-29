import { Select, SelectProps } from 'antd';

function StatusSelector({ ...rest }: SelectProps) {
  return (
    <Select
      placeholder="Filter by status"
      options={[
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' },
      ]}
      {...rest}
    />
  );
}

export default StatusSelector;

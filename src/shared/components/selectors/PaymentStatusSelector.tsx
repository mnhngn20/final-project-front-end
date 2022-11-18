import { PaymentStatus } from '#/generated/schemas';
import { Select, SelectProps } from 'antd';

const options = [
  { value: PaymentStatus.MissingLivingPrice, label: 'Missing Living Price' },
  { value: PaymentStatus.Paid, label: 'Paid' },
  { value: PaymentStatus.Unpaid, label: 'Unpaid' },
];

function PaymentStatusSelector({ ...rest }: SelectProps) {
  return (
    <Select
      placeholder="Filter by payment status"
      options={options}
      {...rest}
    />
  );
}

export default PaymentStatusSelector;

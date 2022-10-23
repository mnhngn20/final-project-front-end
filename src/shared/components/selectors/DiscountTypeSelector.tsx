import { DiscountType } from '#/generated/schemas';
import { Select, SelectProps } from 'antd';

const options = [
  { value: DiscountType.FixedCashDiscount, label: 'Fixed Cash Discount' },
  { value: DiscountType.PercentageDiscount, label: 'Percentage Discount' },
];

function DiscountTypeSelector({ ...rest }: SelectProps) {
  return <Select options={options} {...rest} />;
}

export default DiscountTypeSelector;

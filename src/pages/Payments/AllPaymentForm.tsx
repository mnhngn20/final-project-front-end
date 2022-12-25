import { Form, InputNumber } from 'antd';
// import { useReactiveVar } from '@apollo/client';
// import { userVar } from '#/graphql/cache';
import { DiscountType } from '#/generated/schemas';
import DiscountTypeSelector from '#/shared/components/selectors/DiscountTypeSelector';
import {
  DiscountFilledSVG,
  // DropFilledSVG,
  // FlashFilledSVG,
  MoneyTimeFilledSVG,
  ExtraCoinFilledSVG,
} from '#/assets/svgs';

function AllPaymentForm() {
  // const currentUser = useReactiveVar(userVar);

  return (
    <>
      {/* <Form.Item name="electricCounter" label="Electric Counter">
        <InputNumber
          prefix={
            <FlashFilledSVG width={24} height={24} className="text-warning" />
          }
          addonAfter="Electric Counter"
          formatter={value => `${Number(value)?.toLocaleString()?.toString()}`}
          placeholder="Enter electric counter"
          className="w-full"
        />
      </Form.Item>
      <Typography className="text-xs italic text-grey-secondary-300">
        (*) Your location currently charge{' '}
        {(currentUser?.location?.electricCounterPrice ?? 0)?.toLocaleString()}$
        per electric counter
      </Typography>
      <Form.Item name="waterPrice" label="Water Price">
        <InputNumber
          prefix={
            <DropFilledSVG width={24} height={24} className="text-info" />
          }
          addonAfter="VND"
          formatter={value => `${Number(value)?.toLocaleString()?.toString()}`}
          placeholder="Enter water price"
          className="w-full"
        />
      </Form.Item> */}
      <Form.Item name="extraFee" label="Extra Fee">
        <InputNumber
          prefix={
            <ExtraCoinFilledSVG width={24} height={24} className="text-error" />
          }
          addonAfter="VND"
          formatter={value => `${Number(value)?.toLocaleString()?.toString()}`}
          placeholder="Enter extra fee"
          className="w-full"
        />
      </Form.Item>
      <Form.Item name="prePaidFee" label="Pre-Paid Fee">
        <InputNumber
          prefix={
            <MoneyTimeFilledSVG
              width={24}
              height={24}
              className="text-success"
            />
          }
          placeholder="Enter amount of pre-paid fee"
          className="w-full"
          addonAfter="VND"
          formatter={value => `${Number(value)?.toLocaleString()?.toString()}`}
        />
      </Form.Item>
      <Form.Item name="discountType" label="Discount Type">
        <DiscountTypeSelector
          placeholder="Select discount type"
          className="w-full"
          allowClear
        />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) => (
          <Form.Item
            name="discount"
            label={`Discount Amount (in ${
              getFieldValue('discountType') === DiscountType.PercentageDiscount
                ? '%'
                : 'VND'
            })`}
          >
            <InputNumber
              prefix={
                <DiscountFilledSVG
                  width={24}
                  height={24}
                  className="text-success"
                />
              }
              addonAfter={
                getFieldValue('discountType') ===
                DiscountType.PercentageDiscount
                  ? '%'
                  : 'VND'
              }
              formatter={value =>
                `${Number(value)?.toLocaleString()?.toString()}`
              }
              placeholder="Enter discount amount"
              className="w-full"
            />
          </Form.Item>
        )}
      </Form.Item>
    </>
  );
}

export default AllPaymentForm;

import { Form, InputNumber } from 'antd';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import { DiscountType, RoomStatus } from '#/generated/schemas';
import RoomSelector from '#/shared/components/selectors/RoomSelector';
import DiscountTypeSelector from '#/shared/components/selectors/DiscountTypeSelector';

function PaymentForm() {
  const currentUser = useReactiveVar(userVar);

  return (
    <>
      <Form.Item label="Room" name="roomId" rules={[{ required: true }]}>
        <RoomSelector
          disabled
          variables={{
            input: {
              locationId: Number(currentUser?.locationId),
              status: RoomStatus.Owned,
            },
          }}
        />
      </Form.Item>
      <Form.Item name="electricCounter" label="Electric Counter">
        <InputNumber placeholder="Enter electric counter" className="w-full" />
      </Form.Item>
      <Form.Item name="waterPrice" label="Water Price">
        <InputNumber
          prefix="$"
          placeholder="Enter water price"
          className="w-full"
        />
      </Form.Item>
      <Form.Item name="extraFee" label="Extra Fee">
        <InputNumber
          prefix="$"
          placeholder="Enter extra fee"
          className="w-full"
        />
      </Form.Item>
      <Form.Item name="prePaidFee" label="Pre-Paid Fee">
        <InputNumber
          prefix="$"
          placeholder="Enter amount of pre-paid fee"
          className="w-full"
        />
      </Form.Item>
      <Form.Item name="discountType" label="Discount Type">
        <DiscountTypeSelector
          placeholder="Select discount type"
          className="w-full"
        />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) => (
          <Form.Item name="discount" label="Extra Fee">
            <InputNumber
              prefix={
                getFieldValue('discountType') ===
                  DiscountType.PercentageDiscount && '%'
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

export default PaymentForm;

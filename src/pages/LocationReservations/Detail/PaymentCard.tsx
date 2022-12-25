import { DiscountType, Payment } from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';
import { Image, Tooltip, Typography, Modal } from 'antd';
import DefaultImage from '#/assets/images/default.png';
import CustomTag from '#/shared/components/commons/CustomTag';
import { getPaymentStatusColor, getPaymentStatusTitle } from '../utils';
import {
  EditSVG,
  FlashFilledSVG,
  DropFilledSVG,
  UsersSVG,
  DiscountFilledSVG,
  CoinFilledSVG,
  ClockFilledSVG,
  CardOutlineSVG,
  MoneyTimeFilledSVG,
  ExtraCoinFilledSVG,
} from '#/assets/svgs';
import { formatDate } from '#/shared/utils/date';

interface PaymentCardProps {
  payment?: DeepPartial<Payment> | null;
  onEdit?: () => void;
  editable?: boolean;
  onManuallyPay?: (id: number) => void;
  isPublished?: boolean;
}

function DisplayItem({
  name,
  className,
  value,
  icon,
}: {
  name: string;
  value?: string | number | JSX.Element | null;
  className?: string;
  icon?: JSX.Element;
}) {
  return (
    <Tooltip title={name}>
      <div className={`flex cursor-pointer items-center gap-2 ${className}`}>
        <Typography className="col-span-1">{icon ?? name}</Typography>
        <Typography className="col-span-1">{value ?? 'N/A'}</Typography>
      </div>
    </Tooltip>
  );
}

export default function PaymentCard({
  payment,
  onEdit,
  editable,
  onManuallyPay,
  isPublished,
}: PaymentCardProps) {
  return (
    <div className="relative flex items-center gap-4 rounded-2xl p-4 shadow-header">
      <CustomTag
        content={getPaymentStatusTitle(payment?.status)}
        className={`absolute top-0 right-0 m-4 h-min ${getPaymentStatusColor(
          payment?.status,
        )}`}
      />
      <div className="flex items-center gap-4">
        <Image
          src={payment?.room?.thumbnail ?? DefaultImage}
          width={180}
          height={180}
          preview={false}
          className="rounded-2xl object-cover"
        />
        <div className="flex flex-col gap-2">
          <Typography className="text-xl font-semibold">
            Room{' '}
            <span className="font-bold text-primary-color">
              {payment?.room?.name}
            </span>
            {' - '}
            Floor {payment?.room?.floor}
          </Typography>
          <div className="grid grid-cols-4 gap-x-10 gap-y-4">
            <DisplayItem
              name="Base Price"
              value={`${payment?.room?.basePrice?.toLocaleString()} VND`}
              icon={
                <CoinFilledSVG
                  width={24}
                  height={24}
                  className="text-[#e1e13c]"
                />
              }
            />
            <DisplayItem
              name="Electric Counter"
              value={`${payment?.electricCounter} counter`}
              icon={
                <FlashFilledSVG
                  width={24}
                  height={24}
                  className="text-warning"
                />
              }
            />
            <DisplayItem
              name="Water Price"
              value={`${payment?.waterPrice?.toLocaleString()} VND`}
              icon={
                <DropFilledSVG width={24} height={24} className="text-info" />
              }
            />
            <DisplayItem
              name="Discount"
              value={`${payment?.discount?.toLocaleString()} ${
                payment?.discountType === DiscountType.FixedCashDiscount
                  ? '$'
                  : '%'
              }`}
              icon={
                <DiscountFilledSVG
                  width={24}
                  height={24}
                  className="text-primary-color"
                />
              }
            />
            <DisplayItem
              className="col-span-1"
              name="Extra Fee"
              value={`${payment?.extraFee?.toLocaleString()} VND`}
              icon={
                <ExtraCoinFilledSVG
                  width={24}
                  height={24}
                  className="text-error"
                />
              }
            />
            <DisplayItem
              className="col-span-1"
              name="Pre-paid Fee"
              value={`${payment?.prePaidFee?.toLocaleString()} VND`}
              icon={
                <MoneyTimeFilledSVG
                  width={24}
                  height={24}
                  className="text-success"
                />
              }
            />
            <DisplayItem
              className="col-span-1"
              name="Created At"
              value={formatDate(payment?.createdAt, 'hh:mm A DD/MM/YYYY ')}
              icon={
                <ClockFilledSVG
                  width={24}
                  height={24}
                  className="text-grey-secondary-300"
                />
              }
            />
            <DisplayItem
              className="col-span-4"
              name="Owners"
              value={payment?.users?.map(user => user?.name)?.join(', ')}
              icon={
                <UsersSVG width={24} height={24} className="text-brown-dark" />
              }
            />
            <DisplayItem
              className="col-span-4 text-base"
              name="Final Calculated Price"
              value={`${payment?.totalPrice?.toLocaleString()} VND`}
              icon={<Typography className="font-bold">Total Price</Typography>}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 m-4 flex items-center gap-4">
        {isPublished && (
          <Tooltip title="Manually Pay" placement="bottom">
            <span
              className="cursor-pointer rounded-full p-4 text-grey-secondary-300 hover:text-primary-color"
              title="Are you sure to delete this record?"
              onClick={() => {
                Modal.warning({
                  centered: true,
                  closable: true,
                  maskClosable: true,
                  title: 'Are you sure to pay this manually?',
                  okText: 'Agree',
                  onOk: () => onManuallyPay?.(Number(payment?.id)),
                });
              }}
            >
              <CardOutlineSVG width={24} height={24} />
            </span>
          </Tooltip>
        )}
        {editable && (
          <Tooltip title="Edit" placement="bottom">
            <div
              className="cursor-pointer rounded-full text-grey-secondary-300 hover:text-primary-color"
              onClick={onEdit}
            >
              <EditSVG width={24} height={24} />
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

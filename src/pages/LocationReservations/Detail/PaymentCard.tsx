import { Payment } from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';
import { Image, Typography } from 'antd';
import DefaultImage from '#/assets/images/default.png';
import CustomTag from '#/shared/components/commons/CustomTag';
import { getPaymentStatusColor, getPaymentStatusTitle } from '../utils';
import { EditSVG } from '#/assets/svgs';

interface PaymentCardProps {
  payment?: DeepPartial<Payment> | null;
  onEdit?: () => void;
}

function DisplayItem({
  name,
  className,
  value,
}: {
  name: string;
  value?: string | number | JSX.Element | null;
  className?: string;
}) {
  return (
    <div className={`col-span-1 flex items-center gap-2 ${className}`}>
      <Typography className="col-span-1">{name}</Typography>
      <Typography className="col-span-1 font-semibold">
        {value ?? 'N/A'}
      </Typography>
    </div>
  );
}

export default function PaymentCard({ payment, onEdit }: PaymentCardProps) {
  return (
    <div className="flex flex-col rounded-xl shadow-card">
      <div className="absolute top-0 z-10 flex w-full justify-between p-2 pr-6">
        <CustomTag
          content={getPaymentStatusTitle(payment?.status)}
          className={`h-min ${getPaymentStatusColor(payment?.status)}`}
        />
        <div
          className="cursor-pointer rounded-full bg-[black] bg-opacity-30 p-2 text-[white] hover:bg-opacity-100"
          onClick={onEdit}
        >
          <EditSVG width={24} height={24} />
        </div>
      </div>
      <Image
        src={payment?.room?.thumbnail ?? DefaultImage}
        width="100%"
        height={250}
        preview={false}
        className="rounded-b-none object-cover"
      />
      <div className="flex flex-col gap-4 p-4">
        <Typography className="text-xl">
          Room{' '}
          <span className="font-bold text-primary-color">
            {payment?.room?.name}
          </span>
        </Typography>
        <div className="grid grid-cols-2 gap-1">
          <DisplayItem name="Room floor:" value={payment?.room?.floor} />
          <DisplayItem
            name="Base Price:"
            value={payment?.room?.basePrice?.toLocaleString()}
          />
          <DisplayItem
            name="Electric Counter:"
            value={payment?.electricCounter}
          />
          <DisplayItem
            name="Water Price"
            value={payment?.waterPrice?.toLocaleString()}
          />
          <DisplayItem
            name="Discount:"
            value={payment?.discount?.toLocaleString()}
          />
          <DisplayItem
            className="col-span-2"
            name="Discount Type:"
            value={payment?.discountType}
          />
          <DisplayItem
            className="col-span-2"
            name="Owners:"
            value={payment?.users?.map(user => user?.name)?.join(', ')}
          />
          <DisplayItem
            className="col-span-2"
            name="Total Price:"
            value={payment?.totalPrice?.toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
}

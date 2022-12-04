import { Image, Modal, ModalProps, Skeleton, Typography } from 'antd';
import { useReactiveVar } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { userVar } from '#/graphql/cache';
import { DiscountType, useGetPaymentQuery } from '#/generated/schemas';
import {
  CardSVG,
  ClockFilledSVG,
  CoinFilledSVG,
  DiscountFilledSVG,
  DropFilledSVG,
  FlashFilledSVG,
  MoneyTimeFilledSVG,
  UsersFilledSVG,
} from '#/assets/svgs';
import CustomTag from '#/shared/components/commons/CustomTag';
import {
  getPaymentStatusColor,
  getPaymentStatusTitle,
} from '../LocationReservations/utils';
import { formatDate } from '#/shared/utils/date';
import PaymentItem from './PaymentItem';

export default function PaymentDetailModal({ ...rest }: ModalProps) {
  const navigate = useNavigate();
  const { search } = useLocation();

  const paymentId = new URLSearchParams(search).get('paymentId');

  const { location } = useReactiveVar(userVar);
  const { data, loading, error } = useGetPaymentQuery({
    variables: {
      id: Number(paymentId),
    },
    skip: !paymentId,
  });

  const payment = data?.getPayment?.payment;

  return (
    <Modal
      onCancel={() => navigate('')}
      destroyOnClose
      centered
      visible={!!paymentId && !error && !!payment}
      footer={false}
      title={
        <div className="flex items-center gap-4 text-primary-color">
          <CardSVG width={24} height={24} />
          <Typography className="font-semibold uppercase text-primary-color">
            Payment for Room {payment?.room?.name}
          </Typography>
        </div>
      }
      width={800}
      maskClosable
      {...rest}
    >
      <Skeleton loading={loading}>
        <div className="relative flex flex-col">
          <div className="absolute top-0 right-0">
            <CustomTag
              content={getPaymentStatusTitle(payment?.status)}
              className={getPaymentStatusColor(payment?.status)}
            />
          </div>
          <div className="flex gap-4">
            <Image
              src={payment?.room?.thumbnail ?? '/images/default.png'}
              alt=""
              className="rounded-xl object-cover"
              width={280}
              height={280}
            />
            <div className="flex flex-col gap-4">
              <div>
                <strong>Payment Time:</strong>{' '}
                {formatDate(
                  payment?.locationReservation?.startDate,
                  'MMM, YYYY',
                )}
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <PaymentItem
                  icon={
                    <CoinFilledSVG
                      width={24}
                      height={24}
                      className="text-[#efef21]"
                    />
                  }
                  className="col-span-1"
                  value={`${payment?.room?.basePrice.toLocaleString()} VND`}
                  title="Base Price"
                />
                <PaymentItem
                  icon={
                    <DiscountFilledSVG
                      width={24}
                      height={24}
                      className="text-primary-color"
                    />
                  }
                  className="col-span-1"
                  value={`${payment?.discount?.toLocaleString()} ${
                    payment?.discountType === DiscountType.FixedCashDiscount
                      ? 'VND'
                      : '$'
                  }`}
                  title="Discount"
                />
                <PaymentItem
                  icon={
                    <DropFilledSVG
                      width={24}
                      height={24}
                      className="text-info"
                    />
                  }
                  className="col-span-1"
                  value={`${payment?.waterPrice?.toLocaleString()} VND`}
                  title="Water Price"
                />
                <PaymentItem
                  icon={
                    <FlashFilledSVG
                      width={24}
                      height={24}
                      className="text-warning"
                    />
                  }
                  className="col-span-1"
                  value={
                    <div className="flex flex-col">
                      <span>
                        {`${payment?.electricCounter} counter${
                          (payment?.electricCounter ?? 0) > 1 ? 's' : ''
                        }`}
                      </span>
                      <span>{`${(
                        location?.electricCounterPrice ?? 0
                      ).toLocaleString()} VND/counter`}</span>
                    </div>
                  }
                  title="Electric Counter"
                />
                <PaymentItem
                  icon={
                    <CoinFilledSVG
                      width={24}
                      height={24}
                      className="text-error"
                    />
                  }
                  className="col-span-1"
                  value={`${payment?.extraFee?.toLocaleString()} VND`}
                  title="Extra Fee"
                />
                <PaymentItem
                  icon={
                    <MoneyTimeFilledSVG
                      width={24}
                      height={24}
                      className="text-success"
                    />
                  }
                  className="col-span-1"
                  value={`${payment?.prePaidFee?.toLocaleString()} VND`}
                  title="Pre-paid Fee"
                />
                <PaymentItem
                  icon={
                    <ClockFilledSVG
                      width={24}
                      height={24}
                      className="text-grey-secondary-300"
                    />
                  }
                  className="col-span-2"
                  value={formatDate(payment?.createdAt, 'hh:mm A, DD MMM YYYY')}
                  title="Created At"
                />
                <PaymentItem
                  icon={
                    <UsersFilledSVG
                      width={24}
                      height={24}
                      className="text-grey-secondary-300"
                    />
                  }
                  className="col-span-2"
                  value={payment?.users?.map(user => user?.name).join(', ')}
                  title="Users"
                />
                <PaymentItem
                  icon={
                    <Typography className="font-semibold">
                      Total Price
                    </Typography>
                  }
                  className="col-span-2"
                  value={`${payment?.totalPrice?.toLocaleString()} VND`}
                />
              </div>
            </div>
          </div>
        </div>
      </Skeleton>
    </Modal>
  );
}

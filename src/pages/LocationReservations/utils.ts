import { LocationReservationStatus, PaymentStatus } from '#/generated/schemas';

export const getLocationReservationStatusColor = (status?: string) => {
  switch (status) {
    case LocationReservationStatus.Published:
      return 'bg-success text-[white]';
    case LocationReservationStatus.Draft:
      return 'bg-alert text-[white]';
    default:
      return 'bg-grey-secondary-300 text-[black]';
  }
};

export const getPaymentStatusColor = (status?: string) => {
  switch (status) {
    case PaymentStatus.Paid:
      return 'bg-success text-[white]';
    case PaymentStatus.Unpaid:
      return 'bg-alert text-[white]';
    case PaymentStatus.Canceled:
      return 'bg-error text-[white]';
    case PaymentStatus.MissingLivingPrice:
      return 'bg-warning text-[white]';
    default:
      return 'bg-grey-secondary-300 text-[black]';
  }
};
export const getPaymentStatusTitle = (status?: string) => {
  switch (status) {
    case PaymentStatus.Paid:
      return 'Paid';
    case PaymentStatus.Unpaid:
      return 'Unpaid';
    case PaymentStatus.Canceled:
      return 'Canceled';
    case PaymentStatus.MissingLivingPrice:
      return 'Missing Living Price';
    default:
      return 'Canceled';
  }
};

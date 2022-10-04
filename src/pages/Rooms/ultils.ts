import { RoomStatus } from '#/generated/schemas';

export const getRoomStatusColor = (status?: RoomStatus) => {
  switch (status) {
    case RoomStatus.Available:
      return 'bg-success text-[white]';
    case RoomStatus.NotAvailable:
      return 'bg-grey-secondary-300 text-[black]';
    case RoomStatus.Owned:
      return 'bg-alert text-[white]';
    default:
      return 'bg-grey-secondary-300 text-[black]';
  }
};

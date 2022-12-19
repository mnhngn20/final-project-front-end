import { Popover } from 'antd';
import { useReactiveVar } from '@apollo/client';
import NotificationList from './NotificationList';
import { useGetMyNotificationStatusQuery } from '#/generated/schemas';
import { totalUnreadNotification } from '#/graphql/cache';
import { NotificationSVG } from '#/assets/svgs';

export default function Notification() {
  useGetMyNotificationStatusQuery({
    onCompleted(data) {
      totalUnreadNotification(data?.getMyNotificationStatus?.total ?? 0);
    },
    fetchPolicy: 'network-only',
    pollInterval: 10 * 1000,
  });

  const unreadNotifications = useReactiveVar(totalUnreadNotification);

  return (
    <Popover
      className="relative cursor-pointer"
      placement="bottom"
      content={<NotificationList />}
    >
      <div>
        <div className="cursor-pointer rounded-full bg-grey-primary p-2 text-grey-secondary-300">
          <NotificationSVG width={24} height={24} />
        </div>
        {!!unreadNotifications && (
          <div className="absolute top-0 right-0 -m-1 flex h-5 w-5 items-center justify-center rounded-full bg-error p-1 text-[8px] text-[white]">
            {unreadNotifications > 99 ? '99+' : unreadNotifications}
          </div>
        )}
      </div>
    </Popover>
  );
}

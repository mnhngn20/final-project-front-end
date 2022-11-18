import { LoadingOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import { useReactiveVar } from '@apollo/client';
import { DeepPartial } from '#/shared/utils/type';
import { useNavigate } from 'react-router-dom';
import {
  GetNotificationsDocument,
  GetNotificationsQuery,
  GetNotificationsQueryVariables,
  OrderBy,
  refetchGetMyNotificationStatusQuery,
  useReadNotificationMutation,
  Notification,
} from '#/generated/schemas';
import { totalUnreadNotification, userVar } from '#/graphql/cache';
import { useInfiniteLoadQuery } from '#/shared/hooks/useInfinityLoadQuery';
import {
  getNotificationIcon,
  getNotificationUrl,
} from '#/shared/utils/notification';
import { formatDate } from '#/shared/utils/date';

export default function NotificationList() {
  const navigate = useNavigate();
  const currentUser = useReactiveVar(userVar);
  const unreadNotification = useReactiveVar(totalUnreadNotification);
  const {
    data: notifications,
    loading,
    loadMore,
  } = useInfiniteLoadQuery<
    GetNotificationsQuery,
    GetNotificationsQueryVariables,
    DeepPartial<Notification>
  >({
    query: GetNotificationsDocument,
    fetchPolicy: 'network-only',
    formatData: data => data?.getNotifications,
    variables: {
      input: {
        orderBy: OrderBy.Desc,
        userId: Number(currentUser?.id),
      },
    },
  });

  const [readNotification] = useReadNotificationMutation({
    onCompleted() {
      unreadNotification > 0 && totalUnreadNotification(unreadNotification - 1);
    },
    refetchQueries: [refetchGetMyNotificationStatusQuery()],
  });

  return (
    <div
      className="flex max-h-[30rem] flex-col overflow-y-auto"
      onScroll={loadMore}
    >
      <div>
        {notifications?.[0] ? (
          notifications?.map(notification => (
            <div
              key={notification?.id}
              className={`relative grid w-min cursor-pointer grid-cols-12 items-center gap-8 border-b border-grey-light p-4 hover:bg-grey-light ${
                notification?.isRead === false
                  ? 'bg-grey-light-200 font-bold after:absolute after:right-0 after:mr-1 after:h-1 after:w-1 after:rounded-full after:bg-[black] hover:bg-grey-light-200'
                  : ''
              }`}
              onClick={() => {
                readNotification({
                  variables: {
                    id: Number(notification?.id),
                  },
                });
                navigate(
                  getNotificationUrl(
                    notification?.type,
                    notification?.dataId,
                  ) ?? '',
                );
              }}
            >
              <div className="col-span-2 flex justify-center">
                {getNotificationIcon(notification?.type)}
              </div>
              <div className="col-span-7 flex flex-col">
                <div className="font-semibold">{notification?.title}</div>
                <div className="text-xs">{notification?.content}</div>
              </div>
              <div className="col-span-3 flex flex-col items-end justify-center text-xs">
                <span>{formatDate(notification.createdAt, 'hh:mm')}</span>
                <span>{formatDate(notification.createdAt, 'DD-M-YYYY')}</span>
              </div>
            </div>
          ))
        ) : (
          <Empty className="w-full" />
        )}
      </div>
      {loading && (
        <div className="flex h-full items-center justify-center text-base">
          <LoadingOutlined />
        </div>
      )}
    </div>
  );
}

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
      className="flex max-h-[30rem] w-[20rem] flex-col overflow-y-auto"
      onScroll={loadMore}
    >
      <div>
        {notifications?.[0] ? (
          notifications?.map(notification => (
            <div
              key={notification?.id}
              className={`flex cursor-pointer items-center gap-2 border-b border-grey-light p-4 hover:bg-grey-light ${
                notification?.isRead === false ? 'bg-grey-light' : ''
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
              {getNotificationIcon(notification?.type)}
              <div className="flex flex-col">
                <div className="font-medium">{notification?.title}</div>
                <div className="text-xs">{notification?.content}</div>
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

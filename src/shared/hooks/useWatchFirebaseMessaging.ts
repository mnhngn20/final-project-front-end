import { notification } from 'antd';
import { useCallback } from 'react';
import { useReactiveVar } from '@apollo/client';
import { getToken } from 'firebase/messaging';
import { getNotificationUrl, showError } from '../utils/notification';
import messaging from '#/configs/fcm';
import { totalUnreadNotification, userVar } from '#/graphql/cache';
import {
  OrderBy,
  refetchGetNotificationsQuery,
  useCreateInstallationMutation,
  useReadNotificationMutation,
} from '#/generated/schemas';
import { useNavigate } from 'react-router-dom';

export default function useWatchFirebaseMessaging() {
  const [createInstallation] = useCreateInstallationMutation();
  const currentUser = useReactiveVar(userVar);
  const unreadNotification = useReactiveVar(totalUnreadNotification);
  const navigate = useNavigate();

  const [readNotification] = useReadNotificationMutation({
    onCompleted() {
      unreadNotification > 0 && totalUnreadNotification(unreadNotification - 1);
    },
    refetchQueries: [
      refetchGetNotificationsQuery({
        input: {
          userId: Number(currentUser?.id),
          orderBy: OrderBy.Desc,
          page: 1,
        },
      }),
    ],
  });

  const handleShowNotification = useCallback(
    async (event: MessageEvent) => {
      totalUnreadNotification(unreadNotification + 1);
      const data = event?.data?.data;
      notification.info({
        message: data?.title,
        description: data?.content,
        onClick() {
          data?.id && readNotification({ variables: { id: Number(data?.id) } });
          navigate(getNotificationUrl(data?.type, data?.dataId) ?? '');
        },
      });
    },
    [navigate, readNotification, unreadNotification],
  );

  const watchFirebaseInstallation = useCallback(async () => {
    try {
      if (messaging) {
        const permission = await Notification.requestPermission();

        if (permission !== 'denied') {
          const firebaseToken = await getToken(messaging);

          if (firebaseToken !== localStorage.getItem('firebaseToken')) {
            const createInstallationResponse = await createInstallation({
              variables: {
                input: {
                  firebaseToken,
                  userId: Number(currentUser?.id),
                },
              },
            });
            if (createInstallationResponse) {
              localStorage.setItem('firebaseToken', firebaseToken);
            }
          }
        } else {
          localStorage.removeItem('firebaseToken');
        }
      }

      if (navigator) {
        navigator.serviceWorker.addEventListener(
          'message',
          handleShowNotification,
        );
      }
    } catch (error) {
      showError(error);
    }

    return () => {
      navigator.serviceWorker.removeEventListener(
        'message',
        handleShowNotification,
      );
    };
  }, [createInstallation, currentUser?.id, handleShowNotification]);

  return {
    watchFirebaseInstallation,
  };
}

import { NotificationSVG, WarningFilledSVG } from '#/assets/svgs';
import { NotificationType } from '#/generated/schemas';
import { notification } from 'antd';
import i18next from 'i18next';

export const showError = (error: unknown | string) => {
  const message = (() => {
    if (typeof error === 'string') return error;
    if (error instanceof Error) {
      return error?.message;
    }
    return i18next.t('error.pleaseTryAgain');
  })();

  return notification.error({
    message,
    placement: 'topRight',
  });
};

export const showSuccess = (message: string) =>
  notification.success({
    message,
    placement: 'topRight',
  });

export function getNotificationUrl(
  type?: string | null,
  dataId?: number | null,
) {
  switch (type) {
    case NotificationType.Announcement:
      return '/announcements';
    case NotificationType.Incident:
      return `/incidents/${dataId}`;
    case NotificationType.Other:
      return '/others';
    case NotificationType.Payment:
      return `/payments/${dataId}`;
    default:
      return '/announcements';
  }
}

export function getNotificationIcon(type?: string | null) {
  switch (type) {
    case NotificationType.Announcement:
      return (
        <div className="flex h-min w-min items-center justify-center rounded-xl bg-primary-color bg-opacity-20 p-2 text-[white]">
          <NotificationSVG width={24} height={24} />
        </div>
      );
    case NotificationType.Incident:
      return (
        <div className="flex h-min w-min items-center justify-center rounded-xl bg-primary-color bg-opacity-20 p-2 text-[white]">
          <WarningFilledSVG width={24} height={24} />
        </div>
      );
    case NotificationType.Other:
      return (
        <div className="flex h-min w-min items-center justify-center rounded-xl bg-primary-color bg-opacity-20 p-2 text-[white]">
          <NotificationSVG width={24} height={24} />
        </div>
      );
    case NotificationType.Payment:
      return (
        <div className="flex h-min w-min items-center justify-center rounded-xl bg-primary-color bg-opacity-20 p-2 text-[white]">
          <NotificationSVG width={24} height={24} />
        </div>
      );
    default:
      return (
        <div className="flex h-min w-min items-center justify-center rounded-xl bg-primary-color bg-opacity-20 p-2 text-[white]">
          <NotificationSVG width={24} height={24} />
        </div>
      );
  }
}

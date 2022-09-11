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

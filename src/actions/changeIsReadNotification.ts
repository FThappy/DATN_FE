import { userRequest } from '@/utils/requestMethod';

export const changeIsReadNotification = async (notificationId: string) => {
  try {
    const res = await userRequest.put(
      '/api/notification/isRead',
      {
        notificationId: notificationId
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

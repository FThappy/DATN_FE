import { getEventById } from '@/actions/getEventId';
import { getTotalJoinEventById } from '@/actions/getTotalJoinEventById';
import { refuseAddFriend } from '@/actions/refuseAddFriend';
import { socket } from '@/utils/requestMethod';
import toastifyUtils from '@/utils/toastify';
import { UserPublic } from '@/utils/typeAuth';
import { EventProps } from '@/utils/typeEvent';
import { NotificationProps } from '@/utils/typeNotification';
import { FriendProps, ReqAddFriendProps } from '@/utils/typeReqAddFriend';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

type Props = {
  notification: NotificationProps;
  index: number;
  handleChangeIsRead: () => void;
  type: string;
};

const NotificationEventCard = (props: Props) => {
  const { notification, index, handleChangeIsRead, type } = props;

  const [event, setEvent] = useState<EventProps>();

  const [pending, setPending] = useState<boolean>(false);

  const [totalJoin, setTotalJoin] = useState<number>(0);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await getEventById(notification.content);
        const resToltal = await getTotalJoinEventById(notification.content);
        await Promise.all([res, resToltal]);
        if (resToltal.code === 4) {
          toastifyUtils('error', 'Lỗi server');
        }
        if (resToltal.code === 0) {
          setTotalJoin(resToltal.data);
        }
        if (res.code === 3) {
          return notFound();
        }
        if (res.code === 4) {
          throw new Error('Server Error');
        }
        setEvent(res.event);
      } catch (error) {
        console.error('Server Error', error);
        throw new Error('Server Error');
      }
    };

    getEvent();
  }, [notification.content]);

  return event ? (
    <div
      className='flex gap-2 hover:bg-gray-200 relative p-2 w-full rounded-[8px] '
      onMouseOver={e => {
        e.preventDefault();
        if (notification.type !== 'addFriend' && !notification.isRead) {
          handleChangeIsRead();
        }
      }}
    >
      {event.wallImg.length > 0 && event.wallImg ? (
        <Link href={`/event/${event._id}`} className='h-[3.5rem] w-[3.5rem]'>
          <Avatar className='h-[3.5rem] w-[3.5rem]'>
            <AvatarImage src={event.wallImg[0]} alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <div className='h-[3.5rem] w-[3.5rem] rounded-full '></div>
      )}
      <p className='text-[1.1rem]'>
        Đã có
        <span className='ml-1 mr-1 font-medium text-[1.2rem]'>{totalJoin} người</span>
        đăng ký tham gia sự kiện của bạn
      </p>
      {!notification.isRead && <div className='w-[1rem] h-[1rem] bg-blue rounded-full self-center p-2'></div>}
    </div>
  ) : (
    <>
      <Skeleton className='w-full h-[3.5rem] rounded-[8px]' />
    </>
  );
};

export default NotificationEventCard;

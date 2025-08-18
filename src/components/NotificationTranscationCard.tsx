import { getEventById } from '@/actions/getEventId';
import { getTotalJoinEventById } from '@/actions/getTotalJoinEventById';
import toastifyUtils from '@/utils/toastify';
import { EventProps } from '@/utils/typeEvent';
import { NotificationProps } from '@/utils/typeNotification';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { UserPublic } from '@/utils/typeAuth';
import { getNotifiTrans } from '@/actions/getNotifiTrans';
import { ProjectProps } from '@/utils/typeProject';

type Props = {
  notification: NotificationProps;
  index: number;
  handleChangeIsRead: () => void;
  type: string;
};

const NotificationTranscationCard = (props: Props) => {
  const { notification, index, handleChangeIsRead, type } = props;

  const [project, setProject] = useState<ProjectProps>();

  const [pending, setPending] = useState<boolean>(false);

  const [total, setTotal] = useState<number>(0);

  const [lastUser, setLastUser] = useState<UserPublic>();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await getNotifiTrans(notification.content);
        if (res.code === 0) {
          console.log(res);
          setProject(res.project);
          setLastUser(res.lastUser);
          setTotal(res.total);
        }
      } catch (error) {
        console.error('Server Error', error);
        throw new Error('Server Error');
      }
    };

    getEvent();
  }, [notification.content]);

  return project ? (
    <div
      className='flex gap-2 hover:bg-gray-200 relative p-2 w-full rounded-[8px] '
      onMouseOver={e => {
        e.preventDefault();
        if (notification.type !== 'addFriend' && !notification.isRead) {
          handleChangeIsRead();
        }
      }}
    >
      {project.image.length > 0 && project.image ? (
        <Link href={`/project/${project._id}`} className='h-[3.5rem] w-[3.5rem]'>
          <Avatar className='h-[3.5rem] w-[3.5rem]'>
            <AvatarImage src={project.image[0]} alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <div className='h-[3.5rem] w-[3.5rem] rounded-full '></div>
      )}
      <p className='text-[1rem]'>
        Đã có
        <span className='ml-1 mr-1 font-medium text-[1rem] flex gap-1'>
          <Link href={`/profile/${lastUser?._id}`} className='font-bold text-[1rem]'>
            {lastUser?.displayname ? lastUser?.displayname : lastUser?.username}
          </Link>
          và {total} người
        </span>
        đã quyên góp cho dự án của bạn tổng số tiền hiện tại là{' '}
        <span className='ml-1 mr-1 font-medium text-[1rem]'>
          {project.rise
            ? project.rise.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND'
              })
            : '0VND'}
        </span>
      </p>
      {!notification.isRead && <div className='w-[1rem] h-[1rem] bg-blue rounded-full self-center p-2'></div>}
    </div>
  ) : (
    <>
      <Skeleton className='w-full h-[3.5rem] rounded-[8px]' />
    </>
  );
};

export default NotificationTranscationCard;

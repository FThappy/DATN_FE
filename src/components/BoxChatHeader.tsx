import { boxChatStore, State } from '@/store/boxChatStore';

import React from 'react';
import { MdClose } from 'react-icons/md';
import { Skeleton } from './ui/skeleton';
import { UserPublic } from '@/utils/typeAuth';

type Props = {
  roomId: string;
  index: number;
  user: UserPublic;
};
const BoxChatHeader = (props: Props) => {
  const { roomId, index, user } = props;

  const deleteBoxChat = boxChatStore((state: State) => state?.deleteBoxChat);

  return (
    <div className='h-[3rem] w-full rounded-t-[8px] flex justify-between px-2 py-1 items-center'>
      {user ? (
        <div className='flex gap-2 items-center'>
          <img
            src={user?.img ? user.img : '/twitter.png'}
            alt='image'
            className='border-2 w-[2rem] h-[2rem] rounded-full'
            loading='lazy'
          />
          <p className='font-medium text-[1.2rem] self-start'>
            {user?.displayname ? user.displayname : user?.username}
          </p>
        </div>
      ) : (
        <>
          <Skeleton className='border-2 w-[2rem] h-[2rem] rounded-full' />
          <Skeleton className='w-[18rem] rounded-[8px] h-[2rem]' />
        </>
      )}

      <MdClose
        size={24}
        onClick={e => {
          e.preventDefault();
          deleteBoxChat(roomId);
        }}
        className='cursor-pointer'
      />
    </div>
  );
};

export default BoxChatHeader;

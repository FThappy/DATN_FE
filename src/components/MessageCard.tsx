import { CardRoom } from '@/utils/typeMess';
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { userStore } from '@/store/userStore';
import { boxChatStore, State } from '@/store/boxChatStore';
import { usePathname } from 'next/navigation';

type Props = {
  item: CardRoom;
  index: number;
  totalNewMess: number;
  setTotalNewMess: React.Dispatch<React.SetStateAction<number>>;
};

const MessageCard = (props: Props) => {
  const { item, index, setTotalNewMess } = props;
  const user = userStore((state: any) => state?.user);
  const updateBoxChat = boxChatStore((state: State) => state?.updateBoxChat);

  const [read, setRead] = useState(true);
  const pathname = usePathname();

  return (
    <div
      className='flex gap-2 hover:bg-gray-300 rounded-[8px] p-2 cursor-pointer w-full justify-between'
      key={index}
      onClick={e => {
        e.preventDefault();
        if (pathname !== '/message') {
          updateBoxChat(item?.room?._id, item.room.type, item);
        }
        setRead(false);
        if (read && !item.lastMess?.isRead.includes(user?.id) && item?.lastMess?.from !== user?.id) {
          setTotalNewMess(prev => (prev > 0 ? prev - 1 : 0));
        }
      }}
    >
      {' '}
      <div className='flex gap-2'>
        <div className='h-12 w-12'>
          <Avatar className='h-12 w-12'>
            <AvatarImage src={item?.user?.img ? item?.user.img : '/twitter.png'} alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex flex-col  justify-center'>
          <p className='text-[1.2rem] font-medium'>
            {item?.user?.displayname ? item?.user.displayname : item?.user?.username}
          </p>
          <p className='text-[0.8rem] text-gray-400'>
            {user?.id === item?.lastMess?.from && 'Bạn :'}{' '}
            {item?.lastMess?.content && item?.lastMess?.content?.length > 40
              ? item?.lastMess?.content.slice(0, 40) + '...'
              : item?.lastMess?.content}
            {!item?.lastMess?.content && item?.lastMess?.img && item?.lastMess?.img.length > 0 && 'Đã gửi file ảnh'}
          </p>
        </div>
      </div>
      {read &&
        item?.lastMess?.isRead &&
        !item?.lastMess?.isRead.includes(user?.id) &&
        item?.lastMess?.from !== user?.id && (
          <div className='w-[1rem] h-[1rem] bg-blue rounded-full self-center p-2'></div>
        )}
    </div>
  );
};

export default MessageCard;

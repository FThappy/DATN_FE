import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardRoom } from '@/utils/typeMess';
import Link from 'next/link';
import React from 'react';

type Props = {
  active: CardRoom;
};

const SideMessRight = (props: Props) => {
  const { active } = props;
  return (
    <div className='w-[22%] desktop:h-[53rem] laptop:h-[39.5rem] flex flex-col items-center p-2 gap-2 border-l-gray-300 border-l-2'>
      <div className='h-24 w-24'>
        <Avatar className='h-24 w-24'>
          <AvatarImage src={active.user.img ? active.user.img : '/twitter.png'} alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <p className='font-medium text-[1.2rem] '>
        {active.user?.displayname ? active.user.displayname : active.user?.username}
      </p>
      <Link
        href={`/profile/${active.user._id}`}
        className='p-2 text-black bg-gray-300 hover:bg-slate-400 rounded-[8px] font-medium px-8 text-[1.2rem]'
      >
        Xem trang cá nhân
      </Link>
    </div>
  );
};

export default SideMessRight;

import { getUserPublic } from '@/actions/getInfoUserPublic';
import { Skeleton } from '@/components/ui/skeleton';
import toastifyUtils from '@/utils/toastify';
import { UserPublic } from '@/utils/typeAuth';
import React, { useEffect, useState } from 'react';
import BtnCheckFriend from './BtnCheckFriend';
import Link from 'next/link';

type Props = {
  userId: string;
};

const FriendCard = (props: Props) => {
  const { userId } = props;

  console.log(userId);

  const [user, setUser] = useState<UserPublic>();

  useEffect(() => {
    const getUserJoin = async (): Promise<void> => {
      try {
        const res = await getUserPublic(userId);
        if (res.code === 3) {
          toastifyUtils('error', 'Không tồn tại người dùng');
        }
        setUser(res.data);
      } catch (error) {
        console.log(error);
        toastifyUtils('error', 'Lỗi server');
      }
    };
    getUserJoin();
  }, [userId]);
  return (
    <div className='w-[full] h-auto min-h-[20rem] rounded-[8px] shadow-beautiful flex flex-col'>
      {user ? (
        <div>
          {' '}
          <img src={user?.img ? user.img : '/twitter.png'} className='h-[12rem] rounded-t-[8px] w-full' />
          <p className='px-2 font-medium mt-2'>{user?.displayname ? user.displayname : user?.username}</p>
          <div className='w-full px-2 flex flex-col gap-2'>
            <Link
              href={`/profile/${user._id}`}
              className='bg-blue text-white flex items-center justify-center font-medium w-full rounded-[8px] p-2'
            >
              Xem trang cá nhân
            </Link>
            <BtnCheckFriend userId={userId} />
          </div>
        </div>
      ) : (
        <>
          <Skeleton className='h-[20rem] w-full  rounded-[8px]' />
        </>
      )}
    </div>
  );
};

export default FriendCard;

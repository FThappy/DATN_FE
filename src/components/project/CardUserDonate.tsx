import React, { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { getUserPublic } from '@/actions/getInfoUserPublic';
import toastifyUtils from '@/utils/toastify';
import { dateFormatCustom } from '@/utils/timeSend';

type Props = {
  userId: string;
  amount: number;
  createdAt: Date;
};
type UserJoin = {
  _id: string;
  username: string;
  img: string;
  displayname: string;
};
const CardUserDonate = (props: Props) => {
  const { userId, amount, createdAt } = props;

  const [userJoin, setUserJoin] = useState<UserJoin>();

  const [pending, setPending] = useState(false);

  useEffect(() => {
    const getUserJoin = async (): Promise<void> => {
      try {
        const res = await getUserPublic(userId);
        if (res.code === 3) {
          toastifyUtils('error', 'Không tồn tại người dùng');
        }
        setUserJoin(res.data);
      } catch (error) {
        console.log(error);
        toastifyUtils('error', 'Lỗi server');
      }
    };
    getUserJoin();
  }, [userId]);
  return (
    <div className='w-full h-[60px] flex items-center justify-between gap-2 rounded-[0.8rem] '>
      {userJoin ? (
        <div className='flex items-center gap-2 hover:bg-gray-200 cursor-pointer w-full rounded-[8px]'>
          <Link className='w-full flex items-center gap-2' href={`/profile/${userJoin?._id}`}>
            <div className='w-[40px] h-[40px]'>
              {userJoin?.img && (
                <Image
                  src={userJoin?.img}
                  alt='logo'
                  width={40}
                  height={40}
                  loading='lazy'
                  className='cursor-pointer h-full rounded-full border'
                />
              )}
            </div>
            <div className='flex w-[90%] justify-between'>
              <div className='flex flex-col'>
                <p className='font-medium text-[1.1rem] text-slate-800 mr-[1rem]'>
                  {userJoin?.displayname ? userJoin?.displayname : userJoin?.username}
                </p>
                <p className='text-[0.8rem] text-gray-300 font-medium'>Hỗ trợ</p>
              </div>

              <div className='flex flex-col'>
                <p className='text-red text-[0.8rem] font-medium text-right'>{dateFormatCustom(new Date(createdAt))}</p>
                <p className='text-greenPrimary text-[1.2rem] font-medium text-right'>
                  +{' '}
                  {amount
                    ? amount.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND'
                      })
                    : '0VND'}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <Skeleton className='w-full flex items-center gap-2 h-[3rem]' />
      )}
    </div>
  );
};

export default CardUserDonate;

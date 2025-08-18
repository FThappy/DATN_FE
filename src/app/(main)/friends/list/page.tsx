'use client';
import { getListFriend } from '@/actions/getListFriend';
import toastifyUtils from '@/utils/toastify';
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useInView } from 'react-intersection-observer';
import FriendCard from '../FriendCard';
import { Skeleton } from '@/components/ui/skeleton';
import { getTotalFriend } from '@/actions/getTotalFriend';
import { friendStore } from '@/store/friendStore';

type Props = {};

const Page = (props: Props) => {
  const [page, setPage] = useState<number>(0);

  const [listFriendId, setListFriendId] = useState<string[]>([]);

  const [endFriend, setEndFriend] = useState<boolean>(true);

  const [endFriendSearch, setEndFriendSearch] = useState<boolean>(true);

  const [qSearch, setQSearch] = useState<string>('');

  const { ref, inView } = useInView();

  const [loading, setLoading] = useState<boolean>(false);

  const totalFriend = friendStore((state: any) => state?.totalFriend);

  const updateTotalFriend = friendStore((state: any) => state?.updateTotalFriend);

  const getFriends = async () => {
    try {
      const res = await getListFriend(page);
      if (res.code === 0) {
        if (res.data.length < 10) {
          setEndFriend(false);
        }
        setListFriendId(prev => [...prev, ...res.data]);
        setPage(prev => prev + 1);
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };
  useEffect(() => {
    getFriends();
  }, []);

  useEffect(() => {
    const getTotal = async () => {
      try {
        const res = await getTotalFriend();
        if (res.code === 0) {
          updateTotalFriend(res.data);
        }
      } catch (error) {
        console.log(error);
        toastifyUtils('error', 'Lỗi server');
      }
    };
    getTotal();
  }, []);

  useEffect(() => {
    if (inView) {
      console.log('a');
      getFriends();
    }
  }, [inView]);

  return (
    <div className='p-2 w-[80%] '>
      <div className='shadow-beautiful w-full h-auto min-h-[55rem] flex flex-col bg-white rounded-[8px]'>
        <div className='h-auto w-full px-8 pt-1 flex flex-col '>
          <div className='flex items-center justify-between'>
            <p className='text-[1.5rem] font-bold mb-2'>Bạn bè ({totalFriend}) :</p>
            <form
              // onSubmit={(e) => {
              //   e.preventDefault();
              //   handleSearch();
              // }}
              className='h-[3rem] w-[14rem] bg-white flex items-center border-b-2'
            >
              <input
                type='text'
                className='h-[3rem] w-[11rem] p-2 pb-1 text-[0.9rem] outline-none'
                placeholder='Tìm kiếm liên hệ..............................'
                // onChange={(e: ChangeEvent<HTMLInputElement>) => {
                //   e.preventDefault();
                //   setQSearch(e.target.value);
                //   if (page > 0) {
                //     setPage(0);
                //   }
                //   if (listFriendId.length > 0) {
                //     setListFriendId([]);
                //   }
                // }}
              />
              <button type='submit' className='w-[3rem] h-[3rem] p-2 flex items-center justify-center'>
                <IoIosSearch size={32} />
              </button>
            </form>
          </div>
          <div className='grid grid-cols-5 gap-1 w-full mt-2 mb-8'>
            {listFriendId.length > 0 &&
              listFriendId.map((item, index) => (
                <div className='w-full' key={index}>
                  <FriendCard userId={item} />
                </div>
              ))}
          </div>
          {loading && endFriend && (
            <div className='grid grid-cols-5 gap-1 w-full mt-2 mb-8' ref={ref}>
              <Skeleton className='w-full h-[20rem] rounded-[8px] flex flex-col' />
              <Skeleton className='w-full h-[20rem] rounded-[8px] flex flex-col' />
              <Skeleton className='w-full h-[20rem] rounded-[8px] flex flex-col' />
              <Skeleton className='w-full h-[20rem] rounded-[8px] flex flex-col' />
              <Skeleton className='w-full h-[20rem] rounded-[8px] flex flex-col' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Inter, Dancing_Script } from 'next/font/google';
import TextUnderline from '../utils/TextUnderline';
import { event } from '@/lib/placeholder-data';
import { ProjectProps } from '@/utils/typeProject';
import { getEventLike } from '@/actions/getEventLike';
import toastifyUtils from '@/utils/toastify';
import { Skeleton } from '../ui/skeleton';
import { EventProps } from '@/utils/typeEvent';
import { format } from 'date-fns';
import Link from 'next/link';

const dancing = Dancing_Script({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

type ItemProps = {
  event: EventProps;
  totalLike: number;
};
const OurEvent = () => {
  const [listEvent, setListEvent] = useState<ItemProps[]>([]);

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await getEventLike(6);
        if (res.code === 0) {
          setListEvent(res.data);
        }
      } catch (error) {
        console.log(error);
        return toastifyUtils('error', 'Lỗi server');
      }
    };
    getItem();
  }, []);
  return (
    <div className='w-full  h-[950px] bg-slate-50 flex flex-col justify-center items-center'>
      <p className={`${dancing.className} font-bold text-red text-4xl mb-4 `}>Sự kiện thiện nguyện</p>
      <p className={`${inter.className} font-bold text-slate-800 text-4xl  mb-8`}>
        Sự kiện
        <TextUnderline chilldren=' thiện nguyện ' width={300} top='2.5rem' left='0.4rem' />
        sắp tới.
      </p>
      <p className={`${inter.className}  text-neutral-800  w-[50rem] text-[1.3rem] text-center mb-8`}>
        Sự kiện thiện nguyện là cách để mọi người, tổ chức và cộng đồng đóng góp và tham gia vào các hoạt động từ thiện
        nhằm hỗ trợ và cải thiện đời sống của người khác. Đây là dịp để kết nối và lan tỏa những giá trị nhân văn,
        khuyến khích sự đoàn kết và hỗ trợ lẫn nhau để đạt được mục đích chung của từ thiện
      </p>
      <div className='grid grid-cols-3 gap-4 items-center  justify-center  w-[65rem]'>
        {listEvent && listEvent.length > 0 ? (
          listEvent.map((item, index) => (
            <Link
              href={`/event/${item?.event?._id}`}
              key={index}
              className='flex flex-col bg-cover rounded-[12px] w-[20rem] h-[20rem] '
              style={{
                backgroundImage: `${item?.event?.wallImg?.length > 0 ? `url(${item.event.wallImg[0]})` : '/bg2.jpg'}`
              }}
            >
              <div
                className='w-full h-full opacity-[0] hover:opacity-[1] flex flex-col justify-end items-center pb-12 cursor-pointer'
                style={{
                  background: 'linear-gradient(179.98deg,rgba(37,41,47,.613) 15.88%,rgba(248,77,66,.84) 62.28%)'
                }}
              >
                <p
                  className='font-semibold
                 text-white text-[2rem]'
                >
                  {item.event.eventName}
                </p>
                <div className='flex w-full justify-between p-2'>
                  <div className='flex items-center gap-1'>
                    <Image src='/clock.png' alt='clock' loading='lazy' height={25} width={25} />
                    <p
                      className='
                  text-white text-[1rem] font-medium'
                    >
                      {format(new Date(item.event.timeStart), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Image src='/pin.png' alt='pin' loading='lazy' height={25} width={25} />
                    <p
                      className='
                     text-white text-[1rem] font-medium'
                    >
                      {item.event.city}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <>
            {' '}
            <Skeleton className='flex flex-col bg-cover rounded-[12px] w-[20rem] h-[20rem]' />
            <Skeleton className='flex flex-col bg-cover rounded-[12px] w-[20rem] h-[20rem]' />
            <Skeleton className='flex flex-col bg-cover rounded-[12px] w-[20rem] h-[20rem]' />
          </>
        )}
      </div>
    </div>
  );
};

export default OurEvent;

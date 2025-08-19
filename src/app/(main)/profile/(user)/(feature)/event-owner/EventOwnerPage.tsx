'use client';
import { getTotalPageEventOwner } from '@/actions/getTotalEventOwner';
import { searchEventOwner } from '@/actions/searchEventOwner';
import EventCard from '@/components/event/EventCard';
import { PaginationPage } from '@/components/PaginationPage';
import SearchContainer from '@/components/SearchContainer';
import { Skeleton } from '@/components/ui/skeleton';
import toastifyUtils from '@/utils/toastify';
import { EventProps } from '@/utils/typeEvent';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EventOwnerPage = () => {
  const [endEvent, setEndEvent] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page')!);

  const pSearch = searchParams.get('qSearch');

  const pDate = searchParams.get('qDate');

  const pSort = searchParams.get('qSort');

  const pCity = searchParams.get('qCity');

  const [events, setEvents] = useState<EventProps[]>([]);

  const [totalPage, setTotalPage] = useState<number[]>([]);

  const getTotalPageEvent = async () => {
    try {
      const res = await getTotalPageEventOwner();
      if (res.code === 4) {
        toastifyUtils('error', 'Lỗi server');
      }
      if (res.code === 0) {
        setTotalPage(res.data);
      }
    } catch (error) {
      console.log(error);
      return toastifyUtils('error', 'Lỗi server');
    }
  };

  const handleSearch = async (page: number) => {
    try {
      const dataSend: Record<string, any> = {
        page: page
      };
      if (pSearch) {
        dataSend['qSearch'] = pSearch;
      }
      if (pSort) {
        dataSend['qSort'] = pSort;
      }
      if (pCity) {
        dataSend['qCity'] = pCity;
      }
      if (pDate) {
        dataSend['qDate'] = new Date(pDate as string);
      }
      const res = await searchEventOwner(dataSend);
      if (res.code === 0) {
        setEvents(res.listEvent);
        if (res.listEvent.length === 0) {
          setEndEvent(true);
        } else {
          setEndEvent(false);
        }
        setTotalPage(res.data);
      }
    } catch (error) {
      console.log(error);
      return toastifyUtils('error', 'Lỗi server');
    }
  };
  useEffect(() => {
    handleSearch(page);
  }, [pCity, pSort, pDate, pSearch, page]);

  return (
    <div className='p-2 w-full '>
      <div className='shadow-beautiful w-full h-[55rem] flex flex-col bg-white rounded-[8px]'>
        <div className='h-[53.25rem] w-full px-8 pt-1 flex flex-col items-center'>
          <SearchContainer pDate={pDate} pCity={pCity} />
          {!endEvent ? (
            !(events.length <= 0) ? (
              <div className='grid grid-cols-3 gap-2 w-full mt-2 mb-8'>
                {events.map((event, index) => (
                  <div className='w-full' key={index}>
                    <EventCard event={event} index={index} />
                  </div>
                ))}
              </div>
            ) : (
              <div className='grid grid-cols-3 gap-2 w-full mt-2 mb-2'>
                <Skeleton className='w-full h-[23rem]  rounded-[8px] ' />
                <Skeleton className='w-full h-[23rem]  rounded-[8px] ' />
                <Skeleton className='w-full h-[23rem]  rounded-[8px] ' />
              </div>
            )
          ) : (
            <p className='text-center text-[1.5rem] my-4 text-gray-400 font-bold'>Đã hết Sự kiện</p>
          )}

          <PaginationPage totalPage={totalPage} getTotalPageEvent={getTotalPageEvent} active={page + 1} page={page} />
        </div>
      </div>
    </div>
  );
};
export default EventOwnerPage;

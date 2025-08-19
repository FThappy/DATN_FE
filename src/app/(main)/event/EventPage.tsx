'use client';
import { PaginationPage } from '@/components/PaginationPage';
import React, { useEffect, useState } from 'react';
import EventCard from '@/components/event/EventCard';
import ModalCreateEvent from '@/components/event/ModalCreateEvent';
import toastifyUtils from '@/utils/toastify';
import { EventProps } from '@/utils/typeEvent';
import EventSkeleton from '@/components/event/EventSkeleton';
import { searchEvent } from '@/actions/searchEvent';
import SearchContainer from '@/components/SearchContainer';
import { getTotalPageEvent } from '@/actions/getTotalPageEvent';
import { useSearchParams } from 'next/navigation';

const EventPage = () => {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || '0', 10);

  const pSearch = searchParams.get('qSearch');

  const pDate = searchParams.get('qDate');

  const pSort = searchParams.get('qSort');

  const pCity = searchParams.get('qCity');

  const [endEvent, setEndEvent] = useState<boolean>(false);

  const [events, setEvents] = useState<EventProps[]>([]);

  const [totalPage, setTotalPage] = useState<number[]>([]);

  const getTotalPage = async () => {
    try {
      const res = await getTotalPageEvent();
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
      const res = await searchEvent(dataSend);
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
    <div className='relative h-[53.25rem] w-full bg-[#f1eff4d1] px-16 pt-1 flex flex-col items-center'>
      <SearchContainer pDate={pDate} pCity={pCity} />
      {!endEvent ? (
        !(events.length <= 0) ? (
          <div className='grid grid-cols-4 gap-2 w-full mt-2 mb-2'>
            {events.map((event, index) => (
              <div className='w-full' key={index}>
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <EventSkeleton />
        )
      ) : (
        <p className='text-center text-[1.5rem] my-4 text-gray-400 font-bold'>Đã hết Sự kiện</p>
      )}
      <ModalCreateEvent />
      <PaginationPage totalPage={totalPage} getTotalPageEvent={getTotalPage} active={page + 1} page={page} />
    </div>
  );
};

export default EventPage;

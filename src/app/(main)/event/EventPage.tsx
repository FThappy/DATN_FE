'use client';
import { PaginationPage } from '@/components/PaginationPage';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import EventCard from '@/components/event/EventCard';
import ModalCreateEvent from '@/components/event/ModalCreateEvent';
import toastifyUtils from '@/utils/toastify';
import { EventProps } from '@/utils/typeEvent';
import { getEvent } from '@/actions/getEvent';
import EventSkeleton from '@/components/event/EventSkeleton';
import { searchEvent } from '@/actions/searchEvent';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import SearchContainer from '@/components/SearchContainer';
import { getTotalPageEvent } from '@/actions/getTotalPageEvent';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

type Props = {};

type DataSearch = {
  qSearch: string | undefined;
  qDate: Date | undefined;
  qSort: string | undefined;
  qCity: string | undefined;
  page: number;
};

const EventPage = (props: Props) => {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const page = parseInt(searchParams.get('page')!);

  const pSearch = searchParams.get('qSearch');

  const pDate = searchParams.get('qDate');

  const pSort = searchParams.get('qSort');

  const pCity = searchParams.get('qCity');

  const router = useRouter();

  const [endEvent, setEndEvent] = useState<boolean>(false);

  const [events, setEvents] = useState<EventProps[]>([]);

  const [totalPage, setTotalPage] = useState<number[]>([]);

  const [qSearch, setQSearch] = useState<string | undefined>(pSearch && pSearch !== 'undefined' ? pSearch : undefined);

  const [qDate, setQDate] = React.useState<Date | undefined>(
    pDate && pDate !== 'undefined' ? new Date(pDate as string) : undefined
  );

  const [qSort, setQSort] = useState<string>(pSort ? pSort : '');

  const [qCity, setQCity] = useState<string>(pCity && pCity !== 'undefined' ? pCity : '');

  const [isSearch, setIsSearch] = useState<boolean>(false);

  const [active, setActive] = useState(page + 1);
  const getListEvent = async () => {
    try {
      const res = await getEvent(page);
      if (res.code === 4) {
        toastifyUtils('error', 'Lỗi server');
      }
      if (res.data.length === 0) {
        setEndEvent(true);
      }
      if (res.code === 0) {
        setEvents(res.data);
      }
    } catch (error) {
      console.log(error);
      return toastifyUtils('error', 'Lỗi server');
    }
  };

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

  const handlePushPrams = (qDate: Date | undefined, qSearch: string | undefined, qSort: string, qCity: string) => {
    router.push(`/event?page=${page}&&qDate=${qDate}&&qSearch=${qSearch}&&qSort=${qSort}&&qCity=${qCity}`);
  };

  const handleSearch = async (page: number) => {
    try {
      const dataSend: DataSearch = {
        qSearch: qSearch ? qSearch : undefined,
        qDate: qDate ? qDate : undefined,
        qSort: qSort !== '' ? qSort : 'new',
        qCity: qCity !== '' ? qCity : undefined,
        page: page
      };
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
    if ((qSearch && qSearch !== 'undefined') || qDate || (qSort && qSort !== '') || qCity) {
      handleSearch(page);
    } else {
      getListEvent();
    }
  }, [qDate, qSort, qCity, page]);

  //   useEffect(() => {
  //   if (
  //     (qSearch && qSearch !== "undefined") ||
  //     (qDate) ||
  //     (qSort && qSort !== "") ||
  //     (qCity)
  //   ) {
  //     console.log("aa")
  //     handleSearch(page);
  //   }
  // }, []);
  // const handleOnSearch = useCallback(() => {
  //     if (qSearch || qDate || qSort !== "" || qCity !== "") {
  //       handleSearch(page);
  //     }
  //   },
  //   [qSearch, qDate, qSort, qCity]
  // );

  return (
    <div className='relative h-[53.25rem] w-full bg-[#f1eff4d1] px-16 pt-1 flex flex-col items-center'>
      <SearchContainer
        qSearch={qSearch}
        qDate={qDate}
        qCity={qCity}
        qSort={qSort}
        setIsSearch={setIsSearch}
        setQCity={setQCity}
        setQSort={setQSort}
        setQDate={setQDate}
        setQSearch={setQSearch}
        handleSearch={handleSearch}
        page={page}
        handlePushParams={handlePushPrams}
      />
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
      <PaginationPage
        setEvents={setEvents}
        totalPage={totalPage}
        setTotalPage={setTotalPage}
        getTotalPageEvent={getTotalPage}
        active={active}
        setActive={setActive}
        page={page}
      />
    </div>
  );
};

export default EventPage;

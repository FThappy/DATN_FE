"use client";
import { getEvent } from "@/actions/getEvent";
import { getEventOwner } from "@/actions/getEventOwner";
import { getTotalPageEventOwner } from "@/actions/getTotalEventOwner";
import { searchEvent } from "@/actions/searchEvent";
import { searchEventOwner } from "@/actions/searchEventOwner";
import EventCard from "@/components/event/EventCard";
import EventSkeleton from "@/components/event/EventSkeleton";
import ModalCreateEvent from "@/components/event/ModalCreateEvent";
import { PaginationPage } from "@/components/PaginationPage";
import SearchContainer from "@/components/SearchContainer";
import { Skeleton } from "@/components/ui/skeleton";
import toastifyUtils from "@/utils/toastify";
import { EventProps } from "@/utils/typeEvent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

type DataSearch = {
  qSearch: string | undefined;
  qDate: Date | undefined;
  qSort: string | undefined;
  qCity: string | undefined;
  page: number;
};

const EventOwnerPage = (props: Props) => {
  const [endEvent, setEndEvent] = useState<boolean>(false);

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page")!);

  const pSearch = searchParams.get("qSearch");

  const pDate = searchParams.get("qDate");

  const pSort = searchParams.get("qSort");

  const pCity = searchParams.get("qCity");

  const router = useRouter();

  const [events, setEvents] = useState<EventProps[]>([]);

  const [totalPage, setTotalPage] = useState<number[]>([]);

  const [qSearch, setQSearch] = useState<string | undefined>(
    pSearch && pSearch !== "undefined" ? pSearch : undefined
  );

  const [qDate, setQDate] = React.useState<Date | undefined>(
    pDate && pDate !== "undefined" ? new Date(pDate as string) : undefined
  );

  const [qSort, setQSort] = useState<string>(pSort ? pSort : "");

  const [qCity, setQCity] = useState<string>(
    pCity && pCity !== "undefined" ? pCity : ""
  );

  const [isSearch, setIsSearch] = useState<boolean>(false);

  const [active, setActive] = useState(page + 1);
  const getListEvent = async () => {
    try {
      const res = await getEventOwner(page);
      if (res.code === 4) {
        toastifyUtils("error", "Lỗi server");
      }
      if (res.data.length === 0) {
        setEndEvent(true);
      }
      if (res.code === 0) {
        setEvents(res.data);
      }
    } catch (error) {
      console.log(error);
      return toastifyUtils("error", "Lỗi server");
    }
  };

  const getTotalPageEvent = async () => {
    try {
      const res = await getTotalPageEventOwner();
      if (res.code === 4) {
        toastifyUtils("error", "Lỗi server");
      }
      if (res.code === 0) {
        setTotalPage(res.data);
      }
    } catch (error) {
      console.log(error);
      return toastifyUtils("error", "Lỗi server");
    }
  };

  const handleGetEventPage = async (page: number) => {
    if (isSearch) {
      handleSearch(page);
    } else {
      try {
        const res = await getEventOwner(page);
        if (res.code === 4) {
          toastifyUtils("error", "Lỗi server");
        }
        if (res.data.length === 0) {
          setEndEvent(true);
        }
        if (res.code === 0) {
          setEvents(res.data);
        }
      } catch (error) {
        console.log(error);
        return toastifyUtils("error", "Lỗi server");
      }
    }
  };
  const handleSearch = async (page: number) => {
    try {
      const dataSend: DataSearch = {
        qSearch: qSearch ? qSearch : undefined,
        qDate: qDate ? qDate : undefined,
        qSort: qSort,
        qCity: qCity !== "" ? qCity : undefined,
        page: page,
      };
      const res = await searchEventOwner(dataSend);
      if (res.code === 4) {
        toastifyUtils("error", "Lỗi server");
      }
      if (res.code === 0) {
        setEvents(res.listEvent);
        setTotalPage(res.data);
        if (res.listEvent.length === 0) {
          setEndEvent(true);
        } else {
          setEndEvent(false);
        }
      }
    } catch (error) {
      console.log(error);
      return toastifyUtils("error", "Lỗi server");
    }
  };
  const handlePushPrams = (
    qDate: Date | undefined,
    qSearch: string | undefined,
    qSort: string,
    qCity: string
  ) => {
    router.push(
      `/profile/event-owner?page=${page}&&qDate=${qDate}&&qSearch=${qSearch}&&qSort=${qSort}&&qCity=${qCity}`
    );
  };

  useEffect(() => {
    if (
      (qSearch && qSearch !== "undefined") ||
      qDate ||
      (qSort && qSort !== "") ||
      qCity
    ) {
      handleSearch(page);
    } else {
      getListEvent();
    }
  }, [qDate, qSort, qCity, page]);

  return (
    <div className="p-2 w-full ">
      <div className="shadow-beautiful w-full h-[55rem] flex flex-col bg-white rounded-[8px]">
        <div className="h-[53.25rem] w-full px-8 pt-1 flex flex-col items-center">
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
              <div className="grid grid-cols-3 gap-2 w-full mt-2 mb-8">
                {events.map((event, index) => (
                  <div className="w-full" key={index}>
                    <EventCard event={event} index={index} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 w-full mt-2 mb-2">
                <Skeleton className="w-full h-[23rem]  rounded-[8px] " />
                <Skeleton className="w-full h-[23rem]  rounded-[8px] " />
                <Skeleton className="w-full h-[23rem]  rounded-[8px] " />
              </div>
            )
          ) : (
            <p className="text-center text-[1.5rem] my-4 text-gray-400 font-bold">
              Đã hết Sự kiện
            </p>
          )}

          <PaginationPage
            setEvents={setEvents}
            totalPage={totalPage}
            setTotalPage={setTotalPage}
            getTotalPageEvent={getTotalPageEvent}
            active={active}
            setActive={setActive}
            page={page}
          />
        </div>
      </div>
    </div>
  );
};
export default EventOwnerPage;

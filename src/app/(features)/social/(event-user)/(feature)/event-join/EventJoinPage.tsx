"use client";
import { getEventUserJoin } from "@/actions/getEventUserJoin";
import { getTotalPageUserJoinEvent } from "@/actions/getTotalPageUserJoinEvent";
import EventCard from "@/components/event/EventCard";
import { PaginationPage } from "@/components/PaginationPage";
import { Skeleton } from "@/components/ui/skeleton";
import toastifyUtils from "@/utils/toastify";
import { EventProps } from "@/utils/typeEvent";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

type DataSearch = {
  qSearch: string | undefined;
  qDate: Date | undefined;
  qSort: string | undefined;
  qCity: string | undefined;
  page: number;
};
const EventJoinPage = (props: Props) => {
  const [endEvent, setEndEvent] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page")!);

  const [events, setEvents] = useState<EventProps[]>([]);

  const [totalPage, setTotalPage] = useState<number[]>([]);

  const [active, setActive] = useState(page + 1);

  useEffect(() => {
    const getListEvent = async () => {
      try {
        const res = await getEventUserJoin(page);
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
    getListEvent();
  }, []);

  const getTotalPageEvent = async () => {
    try {
      const res = await getTotalPageUserJoinEvent();
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
    // if (isSearch) {
    //   handleSearch(page);
    // } else {
    try {
      const res = await getEventUserJoin(page);
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
    // }
  };
  // const handleSearch = async (page: number) => {
  //   try {
  //     const dataSend: DataSearch = {
  //       qSearch: qSearch ?  qSearch  : undefined,
  //       qDate: qDate ? qDate : undefined,
  //       qSort: qSort,
  //       qCity: qCity !== "" ? qCity : undefined,
  //       page: page,
  //     };
  //     const res = await searchEventOwner(dataSend);
  //     if (res.code === 0) {
  //       setEvents(res.listEvent);
  //       setTotalPage(res.data);
  //       setActive(page + 1);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return toastifyUtils("error", "Lỗi server");
  //   }
  // };
  // useEffect(() => {
  //   if (isSearch) {
  //     handleSearch(0);
  //   }
  // }, [qDate, qSort, qCity, isSearch]);

  // useEffect(() => {
  //   if (qSearch === "") {
  //     handleSearch(0);
  //   }
  // }, [qSearch]);

  return (
    <div className="p-2 w-5/6 ">
      <div className="shadow-beautiful w-full h-[55rem] flex flex-col bg-white rounded-[8px]">
        <div className="h-[53.25rem] w-full px-8 pt-1 flex flex-col items-center">
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
export default EventJoinPage;

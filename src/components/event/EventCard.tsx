import React, { useEffect, useState } from "react";
import { event } from "../../lib/placeholder-data";
import { EventProps } from "@/utils/typeEvent";
import { timeFormatCustom } from "@/utils/timeSend";
import Link from "next/link";
import toastifyUtils from "@/utils/toastify";
import { getTotalJoinEventById } from "@/actions/getTotalJoinEventById";

type Props = {
  event: EventProps;
  index: number;
};

const EventCard = (props: Props) => {
  const { event, index } = props;

  const [totalJoin, setTotalJoin] = useState<number>(0);

  useEffect(() => {
    const getTotal = async () => {
      try {
        const res = await getTotalJoinEventById(event._id);
        if (res.code === 4) {
          toastifyUtils("error", "Lỗi server");
        }
        if (res.code === 0) {
          setTotalJoin(res.data);
        }
      } catch (error) {
        console.log(error);
        return toastifyUtils("error", "Lỗi server");
      }
    };
    getTotal()
  }, [event._id]);

  return (
    <div className="w-full h-[23rem] shadow-beutifull bg-white rounded-[8px] hover:bg-gray-200 cursor-pointer">
      <Link href={`/event/${event._id}`} className="w-full h-[23rem]">
        {event.wallImg.length > 0 && event.wallImg ? (
          <img
            src={event.wallImg[0]}
            alt="image"
            className="w-full h-1/2 cursor-pointer object-cover	rounded-t-[8px] "
          />
        ) : (
          <div className="w-full h-1/2 cursor-pointer object-cover bg-gray-400 border	rounded-t-[8px] "></div>
        )}
        <div className="flex flex-col px-4 mt-1 ">
          <p className="font-medium	 text-[0.9rem] text-red">
            {event?.timeStart &&
            event?.timeEnd &&
            new Date() > new Date(event.timeStart)
              ? new Date() > new Date(event?.timeEnd)
                ? "Sự kiện đã kết thúc"
                : "Sự kiện đang diễn ra"
              : timeFormatCustom(new Date(event.timeStart))}
          </p>
          <p className="font-medium	 text-[1.2rem]">{event.eventName}</p>
          <p className="font-medium	text-gray-400">{event.city}</p>
          <p className="font-medium	text-gray-400 text-[0.8rem]">
            {totalJoin} người sẽ tham gia
          </p>
          <button className=" flex justify-center items-center bg-green p-1 rounded-[8px] hover:bg-green/75 mt-1 font-bold text-white text-[1.2rem]">
            Xem sự kiện
          </button>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;

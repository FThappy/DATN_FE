"use client";
import { userStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { BiSolidCommentError } from "react-icons/bi";
import { notFound } from "next/navigation";
import { EventProps } from "@/utils/typeEvent";
import { getEventById } from "../../../../actions/getEventId";
import { timeFormatCustom } from "@/utils/timeSend";
import SlideWallImg from "../../../../components/event/SlideWallImg";
import InfoCard from "@/components/event/InfoCard";
import ReportModal from "@/components/ReportModal";
import BtnJoinEvent from "@/components/event/BtnJoinEvent";
import { Skeleton } from "@/components/ui/skeleton";
import ListUserJoin from "@/components/event/ListUserJoin";
import ModaleDeleteEvent from "@/components/event/ModaleDeleteEvent";
import ModalUpdateEvent from "@/components/event/ModalUpdateEvent";
import DiscussContainer from "@/components/event/DiscussContainer";
import ModalShareEventProject from "@/components/ModalShareEventProject";
import LikeContainer from "@/components/LikeContainer";
import { getTotalLike } from "@/actions/getTotalLike";
import toastifyUtils from "@/utils/toastify";

type ListJoinProps = {
  _id: string;
  itemId: string;
  userId: string;
};

const Page = ({ params }: { params: { id: string } }) => {
  const user = userStore((state: any) => state?.user);

  const [isActive, setIsActive] = useState("introduce");

  const [totalJoin, setTotalJoin] = useState<number>(0);

  const [listJoin, setListJoin] = useState<ListJoinProps[]>([]);

  const [openPopover, setOpenPopover] = useState(false);

  const [event, setEvent] = useState<EventProps>();
  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await getEventById(params.id);
        if (res.code === 3) {
          return notFound();
        }
        if (res.code === 4) {
          throw new Error("Server Error");
        }
        setEvent(res.event);
      } catch (error) {
        console.error("Server Error", error);
        throw new Error("Server Error");
      }
    };

    getEvent();
  }, [params.id]);

    const [totalLike, setTotalLike] = useState<number>(0);

    useEffect(() => {
      const totalLike = async () => {
        try {
          const res = await getTotalLike(params.id);
          if (res.code === 0) {
            console.log(res);
            setTotalLike(res.total);
          }
        } catch (error) {
          console.log(error);
          toastifyUtils("error", "Lỗi server");
        }
      };
      totalLike();
    }, [params.id]);

  return (
    <div className="bg-[#f1eff4d1] shadow-beautiful w-full pb-4">
      <div className="flex flex-col w-full relative">
        {event?.wallImg && event.wallImg.length > 0 ? (
          <SlideWallImg listWallImg={event.wallImg} />
        ) : (
          <div className="bg-gray-200 w-full desktop:h-[30rem] laptop:h-[25rem] relative"></div>
        )}{" "}
        <div className="absolute shadow-beautiful bg-white w-[7rem] h-[7rem] bottom-4 left-20 rounded-[12px]">
          <div className="bg-red h-[2rem] rounded-t-[12px]"></div>
          <div className="flex justify-center items-center w-full h-[5rem] text-[3.5rem] font-bold  ">
            {event?.timeStart && new Date(event.timeStart).getDate()}
          </div>
        </div>
      </div>
      <div className="px-20 bg-white">
        {" "}
        <p className="font-bold	text-red text-[1.2rem]">
          {event?.timeStart && event?.timeEnd
            ? timeFormatCustom(new Date(event.timeStart)) +
              "-" +
              timeFormatCustom(new Date(event.timeEnd))
            : ""}
        </p>
        <p className="font-medium	 text-[2rem]">{event?.eventName}</p>
        <p className="font-medium	text-gray-400">{event?.city}</p>
        <div className="border-slate-300 w-full h-[1px] border-t-[1px] mt-1"></div>
        <div className="flex justify-between items-center w-full  ">
          <div className="flex gap-2 items-center ">
            <button
              className={`hover:bg-gray-200 font-medium text-[1.2rem] p-4  flex items-center justify-center  ${
                isActive === "introduce"
                  ? "border-b-4 text-blue border-blue h-[4rem] rounded-[0px] text-blue"
                  : "h-[3.6rem] rounded-[8px] text-gray-500 "
              }`}
              onClick={() => setIsActive("introduce")}
            >
              Giới thiệu
            </button>
            <button
              className={`hover:bg-gray-200 font-medium text-[1.2rem] p-4  flex items-center justify-center  ${
                isActive === "discuss"
                  ? "border-b-4 text-blue border-blue h-[4rem] rounded-[0px] text-blue"
                  : "h-[3.6rem] rounded-[8px] text-gray-500 "
              }`}
              onClick={() => setIsActive("discuss")}
            >
              Thảo luận
            </button>
          </div>
          <div className="flex items-center gap-2 ">
            {user?.id || event?.userId ? (
              user?.id === event?.userId ? (
                <>
                  {event && (
                    <ModalUpdateEvent event={event} setEvent={setEvent} />
                  )}
                  {event?._id && (
                    <div>
                      <ModaleDeleteEvent userId={user.id} eventId={event._id} />
                    </div>
                  )}
                  {event && (
                    <ModalShareEventProject itemId={event._id} type="project" />
                  )}
                </>
              ) : (
                <>
                  {event && (
                    <>
                      <ReportModal
                        postId={event._id}
                        type="event"
                        userId={user?.id}
                        setOpenPopover={setOpenPopover}
                      >
                        <div className="h-[3rem] flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] ">
                          <BiSolidCommentError size={24} />
                          <p className="font-bold text-[1.1rem]">
                            Báo cáo sự kiện
                          </p>
                        </div>
                      </ReportModal>
                      <ModalShareEventProject itemId={event._id} type="event" />
                      <BtnJoinEvent
                        userId={user?.id}
                        eventId={event._id}
                        totalJoin={totalJoin}
                        setTotalJoin={setTotalJoin}
                        listJoin={listJoin}
                        setListJoin={setListJoin}
                      />
                    </>
                  )}
                </>
              )
            ) : (
              <>
                <Skeleton
                  className="h-[3rem] w-[10rem] 
                flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] "
                />
                <Skeleton
                  className="h-[3rem] w-[10rem] 
                flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] "
                />
              </>
            )}
            <LikeContainer
              itemId={params.id}
              type="event"
              totalLike={totalLike}
              setTotalLike={setTotalLike}
            />
          </div>
        </div>
      </div>
      <div className="flex  w-full mt-8 gap-4 px-20">
        <div className="flex flex-col w-[63%] ">
          {isActive === "introduce" ? (
            <>
              {event?.address && event?.city && event?.userId && event?._id && (
                <InfoCard
                  address={event.address}
                  city={event.city}
                  userId={event.userId}
                  description={event.description}
                  eventId={event._id}
                  totalJoin={totalJoin}
                  setTotalJoin={setTotalJoin}
                />
              )}
            </>
          ) : (
            event?._id && <DiscussContainer eventId={event._id} />
          )}
        </div>
        <div className="flex flex-col shadow-beautiful bg-white rounded-[8px] w-[37%] h-auto p-2 px-4 overflow-y-scroll max-h-[32.5rem]">
          <p className="font-bold text-[1.2rem]">Danh sách người tham gia :</p>
          {event && (
            <ListUserJoin
              eventId={params.id}
              ownerId={event.userId}
              listJoin={listJoin}
              setListJoin={setListJoin}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

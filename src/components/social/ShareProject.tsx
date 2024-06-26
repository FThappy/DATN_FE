import { getPostById } from "@/actions/getPostById";
import { PostProps } from "@/utils/typePost";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { BiSolidErrorAlt } from "react-icons/bi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { getUser } from "@/actions/getUser";
import toastifyUtils from "@/utils/toastify";
import { User } from "@/utils/typeAuth";
import { differenceInDays, differenceInHours } from "date-fns";
import Readmore from "../utils/Readmore";
import Link from "next/link";
import { getEventById } from "@/actions/getEventId";
import { EventProps } from "@/utils/typeEvent";
import { timeFormatCustom } from "@/utils/timeSend";
import { ProjectProps } from "@/utils/typeProject";
import { getProjectById } from "@/actions/getProjectById";

type Props = {
  itemId: string;
};

const ShareProject = (props: Props) => {
  const { itemId } = props;

  const [item, setItem] = useState<ProjectProps>();

  const [pending, setPending] = useState<boolean>(false);

  const [poster, setPoster] = useState<User>();

  useEffect(() => {
    const getItem = async () => {
      setPending(true);
      try {
        const res = await getProjectById(itemId);
        if (res.code === 0) {
          setPending(false);
          setItem(res.project);
        }
        if (res.code === 4) {
          setPending(false);
          throw new Error("Server Error");
        }
      } catch (error) {
        setPending(false);
        console.error("Server Error", error);
        throw new Error("Server Error");
      }
    };
    if (itemId) {
      getItem();
    }
  }, [itemId]);

  useEffect(() => {
    if (item?.userId) {
      const getPoster = async (): Promise<void> => {
        try {
          const res = await getUser(item?.userId);
          if (res.code === 3) {
            toastifyUtils("error", "Không tồn tại người dùng");
          }
          setPoster(res.data);
        } catch (error) {
          console.log(error);
          toastifyUtils("error", "Lỗi server");
        }
      };
      getPoster();
    }
  }, [item?.userId]);

  return !pending ? (
    <div className="p-2">
      <div className="h-auto w-full border-2 rounded-[8px] flex flex-col">
        {item ? (
          <div className="h-auto w-full ">
            {item.image.length > 0 && (
              <Carousel>
                <CarouselContent className="w-full desktop:h-[35rem] laptop:h-[30rem] ml-0 pl-0 relative">
                  {item.image.slice(0, 2).map((url, index) => (
                    <CarouselItem key={index} className="ml-0 pl-0 relative">
                      <img
                        src={url}
                        alt="image"
                        className="w-full desktop:h-[35rem] laptop:h-[30rem]  cursor-pointer object-cover rounded-[8px]"
                        loading="lazy"
                      />
                    </CarouselItem>
                  ))}
                  <Link
                    href={`/project/${item?._id}`}
                    className="absolute flex gap-2 bg-black/40 bottom-0 w-full rounded-b-[8px] px-2 h-[5rem] items-center cursor-pointer 
                  hover:bg-black/75
                  "
                  >
                    <div className="flex flex-col">
                      <p className="font-bold	text-red text-[1rem]">
                        Kết thúc{" "}
                        {item?.timeEnd &&
                          timeFormatCustom(new Date(item.timeEnd))}
                      </p>
                      <p className="font-medium text-white	 text-[1.5rem]">
                        {item?.projectName}
                      </p>
                    </div>
                  </Link>
                </CarouselContent>
                {item.image.length > 1 ? (
                  <>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </>
                ) : (
                  <></>
                )}
              </Carousel>
            )}
            <div className="w-full h-[60px] cursor-pointer flex items-center gap-2 p-2  mb-2">
              <div className="h-12 w-12 rounded-full  flex justify-center items-center border-1">
                <img
                  src={poster?.img ? poster?.img : "/twitter.png"}
                  alt="logo-user"
                  loading="lazy"
                  // height={80}
                  // width={80}
                  className="cursor-pointer rounded-full w-full h-full"
                />
              </div>
              <div className="flex flex-col ">
                <Link
                  href={`/profile/${poster?._id}`}
                  className="font-bold text-[1.3rem] text-slate-800 mr-[1rem]"
                >
                  {poster?.displayname ? poster?.displayname : poster?.username}
                </Link>
                <div className="flex gap-2">
                  <p className=" w-[200px] text-gray-400 cursor-pointer">
                    {differenceInHours(new Date(), new Date(item?.createdAt)) <=
                    0
                      ? "Vài phút trước"
                      : differenceInHours(
                          new Date(),
                          new Date(item?.createdAt)
                        ) >= 24
                      ? differenceInDays(
                          new Date(),
                          new Date(item?.createdAt)
                        ) + " ngày trước"
                      : differenceInHours(
                          new Date(),
                          new Date(item?.createdAt)
                        ) + "h"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[10rem] w-full flex flex-col gap-2 items-center justify-center bg-gray-200">
            <div className="w-[3rem] h-[3rem] p-2 rounded-full  flex  items-center justify-center">
              <BiSolidErrorAlt size={32} />
            </div>
            <p className="text-[1.2rem] font-bold">Sự kiện đã bị gỡ</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Skeleton className="h-[35rem] w-full rounded-[8px]" />
  );
};

export default ShareProject;

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

type Props = {
  itemId: string;
};

const SharePost = (props: Props) => {
  const { itemId } = props;

  const [item, setItem] = useState<PostProps>();

  const [pending, setPending] = useState<boolean>(false);

  const [poster, setPoster] = useState<User>();

  useEffect(() => {
    const getItem = async () => {
      setPending(true);
      try {
        const res = await getPostById(itemId);
        if (res.code === 0) {
          setPending(false);
          console.log(res.post);
          setItem(res.post);
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
            {item.img.length > 0 && (
              <Carousel>
                <CarouselContent className="w-full desktop:h-[32rem] laptop:h-[27rem] ml-0 pl-0">
                  {item.img.map((url, index) => (
                    <CarouselItem key={index} className="ml-0 pl-0 relative">
                      <img
                        src={url}
                        alt="image"
                        className="w-full desktop:h-[32rem] laptop:h-[27rem]  cursor-pointer object-cover rounded-[8px]"
                        loading="lazy"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {item.img.length > 1 ? (
                  <>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </>
                ) : (
                  <></>
                )}
              </Carousel>
            )}
            <div className=" border-slate-300 w-full h-[1px] border-t-[1px] "></div>
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
                <Link href={`/profile/${poster?._id}`} className="font-bold text-[1.3rem] text-slate-800 mr-[1rem]">
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
            {item.document && <Readmore documentation={item.document} />}
          </div>
        ) : (
          <div className="h-[10rem] w-full flex flex-col gap-2 items-center justify-center bg-gray-200">
            <div className="w-[3rem] h-[3rem] p-2 rounded-full  flex  items-center justify-center">
              <BiSolidErrorAlt size={32} />
            </div>
            <p className="text-[1.2rem] font-bold">Bài viết đã bị gỡ</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Skeleton className="h-[35rem] w-full rounded-[8px]" />
  );
};

export default SharePost;

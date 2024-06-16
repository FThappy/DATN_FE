"use client";
import React, { useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { PostProps } from "@/utils/typePost";
import { differenceInHours, differenceInDays } from "date-fns";
import { getUserPublic } from "@/actions/getInfoUserPublic";
import toastifyUtils from "@/utils/toastify";
import { userStore } from "@/store/userStore";
import Readmore from "@/components/utils/Readmore";
import ImageGroup from "@/components/utils/ImageGroup";
import Image from "next/image";
import { User } from "@/utils/typeAuth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BiSolidCommentError } from "react-icons/bi";
import ReportModal from "@/components/ReportModal";
import ModalPost from "@/components/ModalPost";

type Props = {
  post: PostProps;
  user: User;
};

const PostForeign = (props: Props) => {
  const { post, user } = props;

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className="py-4 shadow-beautiful bg-white rounded-[0.5rem] mt-4">
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full  flex justify-center items-center ">
            <Image
              src={user?.img ? user.img : "/twitter.png"}
              alt="logo-user"
              loading="lazy"
              height={80}
              width={80}
              className="cursor-pointer rounded-full"
            />
          </div>
          <div className=" ml-2 ">
            <p className=" w-[250px] font-bold cursor-pointer">
              {user?.displayname ? user?.displayname : user?.username}
            </p>
            <p className=" w-[200px] text-gray-400 cursor-pointer">
              {differenceInHours(new Date(), new Date(post.createdAt)) <= 0
                ? "Vài phút trước"
                : differenceInHours(new Date(), new Date(post.createdAt)) >= 24
                ? differenceInDays(new Date(), new Date(post.createdAt)) +
                  " ngày trước"
                : differenceInHours(new Date(), new Date(post.createdAt)) + "h"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <div className="flex w-[40px] h-[40px] p-2 justify-center items-center hover:bg-gray-300 rounded-full">
                <Image
                  src="/more.png"
                  alt="more"
                  loading="lazy"
                  height={30}
                  width={30}
                  className="cursor-pointer"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="mr-[12rem] p-1 w-[18rem] px-4">
              <ReportModal
                postId={post._id}
                type="post"
                userId={user._id}
                setOpenPopover={setOpenPopover}
              >
                <button className="w-full h-[50px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-1  rounded-[0.5rem] mt-1 ">
                  <BiSolidCommentError size={24} />
                  <p className="font-bold text-[1.1rem]">Báo cáo bài viết</p>
                </button>
              </ReportModal>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {post.document && <Readmore documentation={post.document} />}
      <ImageGroup listUrl={post.img} />
      <div className="flex items-center gap-2 mt-4 px-4">
        <Image
          src="/like.png"
          alt="like"
          loading="lazy"
          height={20}
          width={20}
          className="cursor-pointer"
        />
        <p className=" w-[200px] text-gray-400 cursor-pointer">100</p>
      </div>
      <div className="px-4">
        <div className=" border-slate-300 w-full h-[10px] border-t-[1px] mt-[0.65rem] "></div>
      </div>
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 rounded-[10px] p-2 w-1/3">
          <BiLike size={28} color={"#9ca3af"} />
          <p className="text-gray-400 font-bold text-[1rem]">Thích</p>
        </div>
        <div className="w-1/3">
          <ModalPost
            post={post}
            userName={user.username}
            userImg={user.img}
            userId={user._id}
            displayName={user.displayname}
          />
        </div>
        <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 rounded-[10px] p-2 w-1/3">
          <PiShareFatLight size={28} color={"#9ca3af"} />
          <p className="text-gray-400 font-bold text-[1rem]">Chia Sẻ</p>
        </div>
      </div>
    </div>
  );
};

export default PostForeign;

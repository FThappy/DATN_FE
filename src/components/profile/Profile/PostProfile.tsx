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
import { FaTrashCan } from "react-icons/fa6";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContentCustom,
} from "@/components/ui/dialog";
import { deletePost } from "@/actions/deletePost";
import UpdatePost from "@/components/UpdatePost";
import ModalPost from "@/components/ModalPost";
import DeleteSure from "@/components/DeleteSure";
type Props = {
  post: PostProps;
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
  user: User;
  index: number;
};

const PostProfile = (props: Props) => {
  const { post, user, index, setPosts } = props;

  const [pending, setPending] = useState(false);

  const [openDeleteModal ,setOpenDeleteModal] = useState(false);

  const [openPopover, setOpenPopover] = useState(false);

  const removePost = (index: number) => {
    setPosts((prev : PostProps[]) => {
      const posts : PostProps[] = [...prev]
      posts.splice(index, 1);
      return posts;
    });
  };
  const handleDeletePost = async (): Promise<void> => {
    setPending(true);
    try {
      const res = await deletePost(user._id, post._id);
      if (res.code === 4) {
        setPending(false);
        toastifyUtils("error", "Lỗi server");
      }
      if (res.code === 3) {
        setPending(false);
        toastifyUtils("error", "Không tồn tại post này");
      }
      if (res.code === 0) {
        setPending(false);
        removePost(index);
        setOpenDeleteModal(false);
        setOpenPopover(false);
        toastifyUtils("success", "Xóa bài viết thành công");
      }
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <div className="py-4 shadow-beutifull bg-white rounded-[0.5rem] mt-4">
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full  flex justify-center items-center ">
            <img
              src={user?.img ? user.img : "/twitter.png"}
              alt="logo-user"
              loading="lazy"
              // height={80}
              // width={80}
              className="cursor-pointer rounded-full w-full h-full"
            />
          </div>
          <div className=" ml-2 ">
            <p className=" w-[250px] font-bold cursor-pointer">
              {user?.username}
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
              <UpdatePost
                post={post}
                user={user}
                index={index}
                setPosts={setPosts}
                setOpenPopover={setOpenPopover}
              />
              <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
                <DialogTrigger className="w-full">
                  <button className="w-full h-[50px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-1  rounded-[0.5rem] mt-1 ">
                    <FaTrashCan size={24} />
                    <p className="font-bold text-[1.1rem]">Xóa bài viết</p>
                  </button>
                </DialogTrigger>
                <DialogContentCustom className="rounded-[8px] px-0 py-2 w-[20rem]">
                  <DeleteSure
                    pending={pending}
                    handleDelete={handleDeletePost}
                    type="bài viết"
                  />
                </DialogContentCustom>
              </Dialog>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {post.document && <Readmore documentation={post.document} />}
      {post.img.length > 0 && <ImageGroup listUrl={post.img} />}
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

export default PostProfile;

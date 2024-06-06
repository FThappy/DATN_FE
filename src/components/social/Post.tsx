"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import ImageGroup from "../utils/ImageGroup";
import { img1, img2, img3, img4, img5, img6 } from "@/lib/placeholder-data";
import { PostProps } from "@/utils/typePost";
import { differenceInHours, differenceInDays } from "date-fns";
import Readmore from "../utils/Readmore";
import { getUserPublic } from "@/actions/getInfoUserPublic";
import toastifyUtils from "@/utils/toastify";
import { userStore } from "@/store/userStore";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FaTrashCan } from "react-icons/fa6";
import { BiSolidPencil } from "react-icons/bi";
import { BiSolidCommentError } from "react-icons/bi";
import { deletePost } from "@/actions/deletePost";
import { Dialog, DialogContentCustom, DialogTrigger } from "../ui/dialog";
import DeletePost from "../DeleteSure";
import ReportModal from "../ReportModal";
import ModalPost from "../ModalPost";
import UpdatePost from "../UpdatePost";
import { getUser } from "@/actions/getUser";
import { User } from "@/utils/typeAuth";

type Props = {
  post: PostProps;
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
  index: number;
};
type Poster = {
  _id: string;
  username: string;
  img: string;
};

const Post = (props: Props) => {
  const user = userStore((state: any) => state?.user);

  const { post, setPosts, index } = props;

  const [poster, setPoster] = useState<User>();

  const getPoster = async (): Promise<void> => {
    try {
      const res = await getUser(post.userId);
      if (res.code === 3) {
        toastifyUtils("error", "Không tồn tại người dùng");
      }
      setPoster(res.data);
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  useEffect(() => {
    if (post.userId) {
      getPoster();
    }
  }, [post.userId]);

  const [pending, setPending] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [openPopover, setOpenPopover] = useState(false);

  const removePost = () => {
    setPosts((prev: PostProps[]) => {
      const posts: PostProps[] = [...prev];
      posts.splice(index, 1);
      return posts;
    });
  };
  const handleDeletePost = async (): Promise<void> => {
    setPending(true);
    try {
      const res = await deletePost(poster!._id, post._id);
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
        removePost();
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
    <div className="py-4 shadow-beautiful rounded-[0.5rem]	bg-white mt-4">
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex items-center">
          <Link href={`/profile/${poster?._id}`}>
            <div className="h-12 w-12 rounded-full  flex justify-center items-center ">
              <Image
                src={poster?.img ? poster.img : "/twitter.png"}
                alt="logo-user"
                loading="lazy"
                height={80}
                width={80}
                className="cursor-pointer w-[50px] h-[50px] border-slate-300	border rounded-full"
              />
            </div>
          </Link>
          <div className=" ml-2 ">
            <Link href={`/profile/${poster?._id}`}>
              <p className=" w-[250px] font-bold cursor-pointer">
                {poster?.username}
              </p>
            </Link>
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
              {user?.id !== poster?._id ? (
                <ReportModal
                  postId={post._id}
                  type="post"
                  userId={poster?._id}
                  setOpenPopover={setOpenPopover}
                >
                  <button className="w-full h-[50px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-1  rounded-[0.5rem] mt-1 ">
                    <BiSolidCommentError size={24} />
                    <p className="font-bold text-[1.1rem]">Báo cáo bài viết</p>
                  </button>
                </ReportModal>
              ) : (
                <>
                  <UpdatePost
                    post={post}
                    user={poster!}
                    index={index}
                    setPosts={setPosts}
                    setOpenPopover={setOpenPopover}
                  />
                  <Dialog
                    open={openDeleteModal}
                    onOpenChange={setOpenDeleteModal}
                  >
                    <DialogTrigger className="w-full">
                      <button className="w-full h-[50px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-1  rounded-[0.5rem] mt-1 ">
                        <FaTrashCan size={24} />
                        <p className="font-bold text-[1.1rem]">Xóa bài viết</p>
                      </button>
                    </DialogTrigger>
                    <DialogContentCustom className="rounded-[8px] px-0 py-2 w-[20rem]">
                      <DeletePost
                        pending={pending}
                        handleDelete={handleDeletePost}
                        type="bài viết"
                      />
                    </DialogContentCustom>
                  </Dialog>
                </>
              )}
            </PopoverContent>
          </Popover>
          {user?.id !== poster?._id && (
            <button
              className="flex w-[40px] h-[40px] p-2 justify-center items-center hover:bg-gray-300 rounded-full"
              onClick={removePost}
            >
              {" "}
              <Image
                src="/reject.png"
                alt="reject"
                loading="lazy"
                height={30}
                width={30}
                className="cursor-pointer"
              />
            </button>
          )}
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
        {/* <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 rounded-[10px] p-2 w-1/3">
          <FaRegComment size={28} color={"#9ca3af"} />
          <p className="text-gray-400 font-bold text-[1rem] ">Bình Luận</p>
        </div> */}
        <div className="w-1/3">
          <ModalPost
            post={post}
            userName={poster?.username}
            userImg={poster?.img}
            userId={poster?._id}
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

export default Post;

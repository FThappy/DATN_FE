"use client";

import React, { useEffect, useState, Suspense } from "react";
import { userStore } from "@/store/userStore";
import Image from "next/image";
import ModalCreatePost from "../ModalCreatePost";
import Post from "./Post";
import PostSkeleton from "../PostSkeleton";
import { PostProps } from "@/utils/typePost";
import { getPost } from "@/actions/getPost";
import toastifyUtils from "@/utils/toastify";
import LoadMore from "./LoadMore";

const SocialMain = () => {
  const user = userStore((state: any) => state?.user);
  const [open, setOpen] = useState<boolean>(false);

  const [posts, setPosts] = useState<PostProps[]>([]); // State để lưu trữ danh sách bài đăng

  // useEffect(() => {
  //   // Hàm để gọi listPost và cập nhật state posts
  //   const getListPost = async (): Promise<void> => {
  //     try {
  //       const res = await getPost(0);
  //       if (res.code === 4) {
  //         toastifyUtils("error", "Lỗi server");
  //       }
  //       setPosts(res.data);
  //     } catch (error) {
  //       console.log(error);
  //       toastifyUtils("error", "Lỗi server");
  //     }
  //   };

  //   getListPost();
  // }, []);

  return (
    <div
      className={`w-1/2  pr-[3rem] ${open && `max-h-screen overflow-hidden`}`}
    >
      {user && (
        <div className="p-4 shadow-beautiful rounded-[0.5rem]	bg-white ">
          <div className="flex items-center">
            <div className="w-[40px] h-[40px] ">
              <Image
                src={user?.img ? user?.img : "/twitter.png"}
                alt="logo-user"
                loading="lazy"
                height={50}
                width={50}
                className="cursor-pointer rounded-full h-full"
              />
            </div>
            <button
              className="ml-4 bg-gray-100 h-[3rem] w-full rounded-[2rem] text-left p-2 text-[1.2rem] pl-4
          hover:bg-[#E8E5ED] "
              onClick={() => setOpen(true)}
            >
              Bạn đang nghĩ gi thế?
            </button>
          </div>
          <div className="border-slate-300 w-full h-[10px] border-t-[1px] mt-[0.65rem]"></div>
          <div className="flex justify-between">
            <div
              className="w-full h-[40px] cursor-pointer flex items-center justify-center
           gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]"
              onClick={() => setOpen(true)}
            >
              <div className="w-[30px] h-[30px]">
                <Image
                  src="/photo.png"
                  alt="logo"
                  loading="lazy"
                  height={30}
                  width={30}
                  className="cursor-pointer h-full"
                />
              </div>
              <p className="font-normal text-[1rem] text-slate-800 mr-[1rem]">
                Ảnh/Video
              </p>
            </div>
            <div
              className="w-full h-[40px] cursor-pointer flex items-center justify-center
           gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]"
              onClick={() => setOpen(true)}
            >
              <div className="w-[30px] h-[30px]">
                <Image
                  src="/smiling.png"
                  alt="logo"
                  loading="lazy"
                  height={30}
                  width={30}
                  className="cursor-pointer h-full"
                />
              </div>
              <p className="font-normal text-[1rem] text-slate-800 mr-[1rem]">
                Cảm xúc/Hoạt động
              </p>
            </div>
          </div>
        </div>
      )}

      {/* <Suspense fallback={<PostSkeleton />}>
        {posts.map((item, index) => (
          <div className="" key={index}>
            <Post post={item} />
          </div>
        ))}
      </Suspense> */}
      <LoadMore posts={posts} setPosts={setPosts} />

      {/* <PostSkeleton />
      <div className="bg-black w-full h-[300rem] mt-4"></div>
      <div className="bg-black w-full h-[300rem] mt-4"></div>
      <div className="bg-black w-full h-[300rem] mt-4"></div> */}
      {open && (
        <ModalCreatePost
          open={open}
          setOpen={setOpen}
          posts={posts}
          setPosts={setPosts}
          organizationId={undefined}
          type={undefined}
        />
      )}
    </div>
  );
};

export default SocialMain;

"use client";

import { getPost } from "@/actions/getPost";
import toastifyUtils from "@/utils/toastify";
import { PostProps } from "@/utils/typePost";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostSkeleton from "../PostSkeleton";
import Post from "./Post";
import { userStore } from "@/store/userStore";
import { getPostPublic } from "@/actions/getPostPublic";

type Props = {
  posts: PostProps[];
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
};

const LoadMore = (props: Props) => {
  const { ref, inView } = useInView();

  const [page, setPage] = useState<number>(0);

  const [endPost, setEndPost] = useState<boolean>(true);

  const { posts, setPosts } = props; // State để lưu trữ danh sách bài đăng

  const user = userStore((state: any) => state?.user);


  const getListPost = async (): Promise<void> => {
    try {
    const res = user ? await getPost(page) : await getPostPublic(page);
      if (res.code === 4) {
        toastifyUtils("error", "Lỗi server");
      }
      if (res.data.length === 0) {
        setEndPost(false);
      }
      if (res.code === 0) {
        setPosts((prevPost) => [...prevPost, ...res.data]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  useEffect(() => {
    // Hàm để gọi listPost và cập nhật state posts
    if (inView) {
      getListPost();
    }
  }, [inView]);

  return (
    <div>
      {posts.map((item, index) => (
        <div className="" key={index}>
          <Post post={item} setPosts={setPosts} index={index}/>
        </div>
      ))}
      {endPost ? (
        <div ref={ref}>
          <PostSkeleton />
          <PostSkeleton />
        </div>
      ) : (
        <p className="text-center text-[1.5rem] my-4 text-gray-400 font-bold">
          Đã hết bài viết
        </p>
      )}
    </div>
  );
};

export default LoadMore;

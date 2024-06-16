import React, { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/utils/typeAuth";
import toastifyUtils from "@/utils/toastify";
import { useInView } from "react-intersection-observer";
import { PostProps } from "@/utils/typePost";
import PostSkeleton from "@/components/PostSkeleton";
import { getPostByUserId } from "@/actions/getPostByUserId";
import PostForeign from "./PostForeign";
import { userStore } from "@/store/userStore";
type Props = {
  user: User;
};

const ListPostForeign = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const owner = userStore((state: any) => state?.user);

  const { user } = props;

  const { ref, inView } = useInView();

  const [page, setPage] = useState<number>(0);

  const [endPost, setEndPost] = useState<boolean>(true);

  const [posts, setPosts] = useState<PostProps[]>([]);

  const getListPost = async (): Promise<void> => {
    try {
      const res = await getPostByUserId(page, user._id);
      if (res.code === 4) {
        toastifyUtils("error", "Lỗi server");
      }
      if (res.code === 3) {
        toastifyUtils("error", "Không có người dùng này");
      }
      if (res.data.length === 0) {
        setEndPost(false);
      }
      setPosts((prevPost) => [...prevPost, ...res.data]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  useEffect(() => {
    // Hàm để gọi listPost và cập nhật state posts
    if (inView && owner) {
      getListPost();
    }
  }, [inView]);

  return (
    <div className="w-1/2 ml-[5rem]">
      <div>
        {posts.map((item, index) => (
          <div className="" key={index}>
            <PostForeign post={item} user={user} />
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
    </div>
  );
};

export default ListPostForeign;

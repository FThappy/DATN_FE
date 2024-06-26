import React, { useEffect, useState } from "react";
import PostProfile from "./PostProfile";
import Image from "next/image";
import { User } from "@/utils/typeAuth";
import toastifyUtils from "@/utils/toastify";
import { useInView } from "react-intersection-observer";
import { PostProps } from "@/utils/typePost";
import PostSkeleton from "@/components/PostSkeleton";
import { getPostByUserId } from "@/actions/getPostByUserId";
import ModalCreatePost from "@/components/ModalCreatePost";

type Props = {
  user: User;
};

const ListPostProfile = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const { user } = props;

  const { ref, inView } = useInView();

  const [page, setPage] = useState<number>(0);

  const [endPost, setEndPost] = useState<boolean>(true);

  const [posts, setPosts] = useState<PostProps[]>([]); // State để lưu trữ danh sách bài đăng

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
    <div
      className={`w-1/2 ml-[5rem] ${
        openCreateModal && `max-h-[8rem] overflow-hidden `
      }`}
    >
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
            onClick={() => setOpenCreateModal(true)}
          >
            Bạn đang nghĩ gi thế?
          </button>
        </div>
        <div className="border-slate-300 w-full h-[10px] border-t-[1px] mt-[0.65rem]"></div>
        <div className="flex justify-between">
          <div
            className="w-full h-[40px] cursor-pointer flex items-center justify-center
           gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]"
            onClick={() => setOpenCreateModal(true)}
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
            onClick={() => setOpenCreateModal(true)}
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
      <div>
        {posts.map((item, index) => (
          <div className="" key={index}>
            <PostProfile
              post={item}
              user={user}
              index={index}
              setPosts={setPosts}
            />
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
      {openCreateModal && (
        <ModalCreatePost
          open={openCreateModal}
          setOpen={setOpenCreateModal}
          posts={posts}
          setPosts={setPosts}
          organizationId={undefined}
          type={undefined}
        />
      )}
    </div>
  );
};

export default ListPostProfile;

import { getPost } from '@/actions/getPost';
import { getPostByEventId } from '@/actions/getPostByEventId';
import PostSkeleton from '@/components/PostSkeleton';
import Post from '@/components/social/Post';
import toastifyUtils from '@/utils/toastify';
import { PostProps } from '@/utils/typePost';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  posts: PostProps[];
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
  organizationId: string;
};

const LoadMoreDisscuss = (props: Props) => {
  const { ref, inView } = useInView();

  const [page, setPage] = useState<number>(0);

  const [endPost, setEndPost] = useState<boolean>(true);

  const { posts, setPosts, organizationId } = props; // State để lưu trữ danh sách bài đăng

  const getListPost = async (): Promise<void> => {
    try {
      const res = await getPostByEventId(page, organizationId);
      if (res.code === 4) {
        toastifyUtils('error', 'Lỗi server');
      }
      if (res.data.length === 0) {
        setEndPost(false);
      }
      if (res.code === 0) {
        setPosts(prevPost => [...prevPost, ...res.data]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
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
        <div className='' key={index}>
          <Post post={item} setPosts={setPosts} index={index} />
        </div>
      ))}
      {endPost ? (
        <div ref={ref}>
          <PostSkeleton />
          <PostSkeleton />
        </div>
      ) : (
        <p className='text-center text-[1.5rem] my-4 text-gray-400 font-bold'>Đã hết bài viết</p>
      )}
    </div>
  );
};

export default LoadMoreDisscuss;

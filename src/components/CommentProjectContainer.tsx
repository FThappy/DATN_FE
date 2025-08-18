import React, { useEffect, useState } from 'react';
import CommentSkeleton from './CommentSkeleton';
import CommentCard from './CommentCard';
import { socket } from '@/utils/requestMethod';
import { CommentProps } from '@/utils/typeComment';
import toastifyUtils from '@/utils/toastify';
import { useInView } from 'react-intersection-observer';
import { ProjectProps } from '@/utils/typeProject';

type Props = {
  project: ProjectProps;
  comments: CommentProps[];
  setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>;
  handleSetRepUser: (user: string, commentId: string, toUserId: string) => void;
};

const CommentProjectContainer = (props: Props) => {
  const { project, comments, setComments, handleSetRepUser } = props;

  const [page, setPage] = useState<number>(0);

  const { ref, inView } = useInView();

  const [endComment, setEndComment] = useState<boolean>(true);

  const [newComments, setNewComments] = useState<CommentProps[]>([]);

  const [pending, setPending] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      socket.emit('join-room', project._id, 'project');
      socket.on('comment-room', listComment => {
        console.log(listComment);
        setComments(listComment);
        setIsLoading(false);
      });
      return () => {
        socket.off('comment-room');
      };
    }
  }, [project._id, inView]);

  useEffect(() => {
    socket.off('error-comment').on('error-comment', error => {
      return toastifyUtils('error', error.msg);
    });

    return () => {
      socket.off('error-comment');
    };
  }, []);

  useEffect(() => {
    const handleNewComment = (newComment: CommentProps) => {
      setNewComments(prevComments => [...prevComments, newComment]);
    };
    socket.on('new-comment', handleNewComment);

    return () => {
      socket.off('new-comment');
    };
  }, [setComments]);

  const handleLoadMore = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPending(true);
    try {
      socket.emit('load-more', project._id, page + 1, newComments.length, 'project');
      setPage(page + 1);
      socket.off('load-more').on('load-more', (newListComments: CommentProps[]) => {
        if (newListComments.length === 0) {
          setPending(false);
          return setEndComment(false);
        }
        console.log(newListComments);
        setComments(prevComments => [...prevComments, ...newListComments]);
        setPending(false);
      });
    } catch (error) {
      setPending(false);
      console.log(error);
      return toastifyUtils('error', 'Lỗi server');
    }
  };

  const handleSocketChangeComment = (newComment: CommentProps) => {
    setComments(prevComments => {
      const comments = [...prevComments];
      const index = comments.findIndex(item => item._id === newComment._id);
      if (index < 0) {
        return comments;
      } else {
        comments.splice(index, 1, newComment);
        return comments;
      }
    });
    setNewComments(prevComments => {
      const comments = [...prevComments];
      const index = comments.findIndex(item => item._id === newComment._id);
      if (index < 0) {
        return comments;
      } else {
        comments.splice(index, 1, newComment);
        return comments;
      }
    });
  };
  socket.off('change-comment').on('change-comment', handleSocketChangeComment);

  const handleSocketDeleteComment = (oldCommentId: string) => {
    setComments(prevComments => {
      const comments = [...prevComments];
      const index = comments.findIndex(item => item._id === oldCommentId);
      if (index < 0) {
        return comments;
      } else {
        comments.splice(index, 1);
        return comments;
      }
    });
    setNewComments(prevComments => {
      const comments = [...prevComments];
      const index = comments.findIndex(item => item._id === oldCommentId);
      if (index < 0) {
        return comments;
      } else {
        comments.splice(index, 1);
      }
      return comments;
    });
  };
  socket.off('delete-comment').on('delete-comment', handleSocketDeleteComment);

  return (
    <div ref={ref} className='flex flex-col w-full gap-2  mt-4'>
      <div className=' flex flex-col border-l-4 border-sky-600 gap-2'>
        {newComments.map((comment, index) => (
          <div className='px-4' key={index}>
            <CommentCard
              comment={comment}
              setComment={setNewComments}
              index={index}
              postId={project._id}
              type='new'
              handleSetRepUser={handleSetRepUser}
              typeItem='project'
            />
          </div>
        ))}
      </div>
      {comments.map((comment, index) => (
        <div className='px-4' key={index}>
          <CommentCard
            comment={comment}
            setComment={setComments}
            index={index}
            postId={project._id}
            type='load'
            handleSetRepUser={handleSetRepUser}
            typeItem='project'
          />
        </div>
      ))}
      {comments.length <= 0 && newComments.length <= 0 ? (
        isLoading ? (
          <>
            <CommentSkeleton />
            <CommentSkeleton />
          </>
        ) : (
          <p className='text-gray-400 font-[500] mt-2 text-center'>- Chưa có bình luận nào -</p>
        )
      ) : comments.length >= 8 && endComment ? (
        <button className='text-gray-400 font-[500]' onClick={handleLoadMore} disabled={pending}>
          {pending ? (
            <div className='flex w-full justify-center'>
              <p>Loading</p>
              <div className='loader1'></div>
            </div>
          ) : (
            'Xem thêm bình luận...'
          )}
        </button>
      ) : (
        <p className='text-gray-400 font-[500] text-center'>- Đã hết bình luận -</p>
      )}
    </div>
  );
};

export default CommentProjectContainer;

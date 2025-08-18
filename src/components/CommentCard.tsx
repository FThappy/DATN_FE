import { getUserPublic } from '@/actions/getInfoUserPublic';
import toastifyUtils from '@/utils/toastify';
import { CommentProps } from '@/utils/typeComment';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useEffect, useState, KeyboardEvent } from 'react';
import CommentSkeleton from './CommentSkeleton';
import { timeSend } from '@/utils/timeSend';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { socket } from '@/utils/requestMethod';
import { userStore } from '@/store/userStore';
import ListNewRepComment from './ListNewRepComment';
import RepCommentCard from './RepCommentCard';
import RepCommentSkeleton from './RepCommentSkeleton';

type Props = {
  comment: CommentProps;
  setComment: React.Dispatch<React.SetStateAction<CommentProps[]>>;
  index: number;
  postId: string;
  type: string;
  handleSetRepUser: (user: string, commentId: string, toUserId: string) => void;
  typeItem: string;
};

type Commenter = {
  _id: string;
  username: string;
  img: string;
  displayname: string;
};

// eslint-disable-next-line react/display-name
const CommentCard = React.memo((props: Props) => {
  const [commenter, setCommenter] = useState<Commenter>();

  const user = userStore((state: any) => state?.user);

  const [isChange, setIsChange] = useState(false);

  const [pending, setPending] = useState(false);

  const [page, setPage] = useState(0);

  const [endRepComment, setEndRepComment] = useState(true);

  const { comment, setComment, index, postId, type, handleSetRepUser, typeItem } = props;

  const [newRepComments, setNewRepComments] = useState<Omit<CommentProps, 'repLength'>[]>([]);

  const [repComments, setRepComments] = useState<Omit<CommentProps, 'repLength'>[]>([]);

  const [detail, setDetail] = useState(comment.detail);

  const [isOpenRepComment, setIsOpenRepComment] = useState(false);

  const getPoster = async (): Promise<void> => {
    try {
      const res = await getUserPublic(comment.userId);
      if (res.code === 3) {
        toastifyUtils('error', 'Không tồn tại người dùng');
      }
      setCommenter(res.data);
    } catch (error) {
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };

  useEffect(() => {
    if (comment.userId) {
      getPoster();
    }
  }, [comment.userId]);

  const handleLoadMoreRepComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPending(true);
    setIsOpenRepComment(true);
    try {
      socket.emit('load-repcomment-more', comment._id, page, newRepComments.length);
      setPage(page + 1);
      socket
        .off('load-repcomment-more')
        .on('load-repcomment-more', (newListComments: Omit<CommentProps, 'repLength'>[]) => {
          if (newListComments.length === 0) {
            setPending(false);
            return setEndRepComment(false);
          }
          setRepComments(prevComments => [...prevComments, ...newListComments]);
          setPending(false);
        });
    } catch (error) {
      setPending(false);
      console.log(error);
      return toastifyUtils('error', 'Lỗi server');
    }
  };

  const handleChangeComment = async (event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    try {
      socket.emit('change-comment', comment._id, detail, postId);
      setDetail('');
      setIsChange(false);
    } catch (error) {
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };
  const handleDeleteComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      socket.emit('delete-comment', comment._id, postId);
    } catch (error) {
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };
  const handleSocketDeleteRepComment = (oldCommentId: string) => {
    if (comment._id === oldCommentId) {
      setNewRepComments(prevComments => []);
    }
  };
  socket.off('delete-repcomment').on('delete-repcomment', handleSocketDeleteRepComment);

  const handleSocketChangeComment = (newComment: CommentProps) => {
    setNewRepComments(prevComments => {
      const comments = [...prevComments];
      const index = comments.findIndex(item => item._id === newComment._id);
      if (index < 0) {
        return comments;
      } else {
        comments.splice(index, 1, newComment);
        return comments;
      }
    });
    setRepComments(prevComments => {
      const comments = [...prevComments];
      const index = comments.findIndex(item => item._id === newComment._id);
      if (index < 0) {
        return comments;
      } else {
        comments.splice(index, 1, newComment);
      }
      return comments;
    });
  };
  socket.off('change-rep-comment').on('change-rep-comment', handleSocketChangeComment);

  const handleSocketDeleteOneRepComment = (oldCommentId: string) => {
    setNewRepComments(prevComments => {
      const comments = [...prevComments];
      const index = comments.findIndex(item => item._id === oldCommentId);
      if (index < 0) {
        return comments;
      } else {
        comments.splice(index, 1);
        return comments;
      }
    });
    setRepComments(prevComments => {
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
  socket.off('delete-rep-comment').on('delete-rep-comment', handleSocketDeleteOneRepComment);

  return (
    <>
      {commenter ? (
        <div className='flex gap-2 w-full'>
          <div className='h-10 w-10 rounded-full  flex justify-center items-center z-[100] relative'>
            <img
              src={commenter?.img ? commenter?.img : '/twitter.png'}
              alt='logo-user'
              loading='lazy'
              className='cursor-pointer rounded-full w-full h-full'
            />
          </div>
          {isChange ? (
            <form onSubmit={handleChangeComment} className='flex flex-col w-full bg-gray-200 rounded-[8px] z-50'>
              <textarea
                className='outline-none	bg-white/0 h-[3.5rem] min-h-[3.5rem] max-h-[3.5rem] p-2 text-[1rem]'
                placeholder='Viết bình luận...'
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  e.preventDefault();
                  setDetail(e.target.value);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleChangeComment(e);
                    e.currentTarget.value = '';
                  }
                }}
                value={detail}
              />
              <button
                type='submit'
                className='flex justify-end items-center h-full'
                disabled={detail !== comment.detail ? false : true}
              >
                <PiPaperPlaneRightFill
                  color={detail !== comment.detail ? '#1E90FF' : 'gray'}
                  className='mr-2'
                  size={20}
                />
              </button>
            </form>
          ) : (
            <div className='flex flex-col w-full z-50'>
              <div className='flex flex-col  bg-gray-200 w-full p-1 px-2 rounded-[8px] z-[1000]'>
                <Link href={`/profile/${commenter?._id}`} className='font-bold'>
                  {commenter?.displayname ? commenter?.displayname : commenter?.username}
                </Link>
                <p className=''>{comment.detail}</p>
              </div>
              <div className='flex w-full justify-between  px-2 mt-1'>
                <p className='text-gray-400'> {timeSend(comment.createdAt)}</p>
                {user?.id === comment.userId ? (
                  <div className='flex gap-3'>
                    <p className='text-[1rem] text-gray-300'>{comment.__v >= 1 && 'Đã chỉnh sửa'}</p>
                    <button
                      className='font-bold text-gray-600 z-[1000]'
                      onClick={e => {
                        e.preventDefault();
                        setIsChange(true);
                        setDetail(comment.detail);
                      }}
                    >
                      Chỉnh sửa
                    </button>
                    <button className='font-bold text-gray-600' onClick={handleDeleteComment}>
                      Xóa
                    </button>
                  </div>
                ) : (
                  <div className='flex gap-3'>
                    <p className='text-[0.8rem] text-gray-300'>{comment.__v >= 1 && 'Đã chỉnh sửa'}</p>
                    <button
                      className='font-bold text-gray-600'
                      onClick={e => {
                        e.preventDefault();
                        handleSetRepUser(
                          commenter?.displayname ? commenter?.displayname : commenter?.username,
                          comment._id,
                          commenter._id
                        );
                      }}
                    >
                      Trả lời
                    </button>
                  </div>
                )}
              </div>
              <ListNewRepComment
                newRepComments={newRepComments}
                setNewRepComments={setNewRepComments}
                commentId={comment._id}
                handleSetRepUser={handleSetRepUser}
              />
              {comment.repLength > 0 &&
                (!isOpenRepComment ? (
                  <div className='w-full relative '>
                    <button
                      className='font-medium text-gray-400 cursor-pointer z-[50] p-2'
                      onClick={e => {
                        e.preventDefault();
                        handleLoadMoreRepComment(e);
                      }}
                    >
                      Xem tất cả {comment.repLength} phản hồi
                    </button>
                    <div className='flex absolute w-full left-[-50px] top-[-4.7rem] rounded-full items-end '>
                      <div className=' border-slate-300 w-[1rem] h-[6rem] border-r-[2px]'></div>
                      <div className=' border-slate-300 w-[2.2rem] h-[2px] border-t-[2px]'></div>
                    </div>
                  </div>
                ) : repComments.length > 0 ? (
                  <>
                    {repComments.map((repComment, index) => (
                      <div className='w-full relative' key={index}>
                        <RepCommentCard
                          comment={repComment}
                          index={index}
                          commentFatherId={comment._id}
                          type='new'
                          handleSetRepUser={handleSetRepUser}
                        />
                        <div className='flex absolute w-full left-[-50px] top-[-75px] rounded-full items-end z-40'>
                          <div className=' border-slate-300 w-[1rem] h-[6rem] border-r-[2px] '></div>
                          <div className=' border-slate-300 w-[2rem] h-[1px] border-t-[2px] '></div>
                        </div>
                      </div>
                    ))}
                    {pending && (
                      <div className='px-4 w-full py-2'>
                        <RepCommentSkeleton />
                        <RepCommentSkeleton />
                      </div>
                    )}
                    {!endRepComment ? (
                      <p className='text-gray-400 font-[500] mt-2 text-center'>{/* - Đã hết phản hồi - */}</p>
                    ) : (
                      <div className='w-full relative '>
                        <button
                          className='font-medium text-gray-400 cursor-pointer p-2 z-[1000]'
                          onClick={handleLoadMoreRepComment}
                        >
                          Xem thêm phản hồi
                        </button>
                        <div className='flex absolute w-full left-[-50px] top-[-4.7rem] rounded-full items-end '>
                          <div className=' border-slate-300 w-[1rem] h-[6rem] border-r-[2px]'></div>
                          <div className=' border-slate-300 w-[2.5rem] h-[2px] border-t-[2px]'></div>
                        </div>
                      </div>
                    )}
                  </>
                ) : pending ? (
                  <div className='px-4 w-full py-2'>
                    <RepCommentSkeleton />
                    <RepCommentSkeleton />
                  </div>
                ) : (
                  <p className='text-gray-400 font-[500] mt-2 text-center'>{/* - Chưa có phản hồi nào - */}</p>
                ))}
            </div>
          )}
        </div>
      ) : (
        <CommentSkeleton />
      )}
    </>
  );
});

export default CommentCard;

import React, { ChangeEvent, FormEvent, useEffect, useState, KeyboardEvent } from 'react';
import CommentSkeleton from './CommentSkeleton';
import { timeSend } from '@/utils/timeSend';
import Link from 'next/link';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import toastifyUtils from '@/utils/toastify';
import { getUserPublic } from '@/actions/getInfoUserPublic';
import { userStore } from '@/store/userStore';
import { CommentProps } from '@/utils/typeComment';
import RepCommentSkeleton from './RepCommentSkeleton';
import LinkToUser from './LinkToUser';
import { socket } from '@/utils/requestMethod';

type Props = {
  comment: Omit<CommentProps, 'repLength'>;
  index: number;
  commentFatherId: string;
  type: string;
  handleSetRepUser: (user: string, commentId: string, toUserId: string) => void;
};
type Commenter = {
  _id: string;
  username: string;
  img: string;
  displayname: string;
};
const RepCommentCard = (props: Props) => {
  const { comment, index, commentFatherId, type, handleSetRepUser } = props;

  const [commenter, setCommenter] = useState<Commenter>();

  const user = userStore((state: any) => state?.user);

  const [isChange, setIsChange] = useState(false);

  const [detail, setDetail] = useState(comment.detail);

  const getCommenter = async (): Promise<void> => {
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
      getCommenter();
    }
  }, [comment.userId]);

  const handleChangeRepComment = async (event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    try {
      socket.emit('change-rep-comment', comment._id, detail, commentFatherId);
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
      socket.emit('delete-rep-comment', comment._id, commentFatherId);
    } catch (error) {
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };

  return (
    <>
      {commenter ? (
        <div className='flex gap-2 w-full'>
          <div className='h-10 w-10 rounded-full  flex justify-center items-center '>
            <img
              src={commenter?.img ? commenter?.img : '/twitter.png'}
              alt='logo-user'
              loading='lazy'
              className='cursor-pointer rounded-full w-full h-full'
            />
          </div>
          {isChange ? (
            <form onSubmit={handleChangeRepComment} className='flex flex-col w-full bg-gray-200 rounded-[8px] z-[1000]'>
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
                    handleChangeRepComment(e);
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
            <div className='flex flex-col w-full'>
              <div className='flex flex-col  bg-gray-200 w-full p-1 px-2 rounded-[8px] '>
                <Link href={`/profile/${commenter?._id}`} className='font-bold cursor-pointer z-[1005]'>
                  {commenter?.displayname ? commenter?.displayname : commenter?.username}
                </Link>
                <div className='flex gap-2 z-[1000]'>
                  <LinkToUser toUserId={comment.toUserId} />
                  <p>{comment.detail}</p>
                </div>
              </div>
              <div className='flex w-full justify-between  px-2 mt-1'>
                <p className='text-gray-400'> {timeSend(comment.createdAt)}</p>
                {user.id === comment.userId ? (
                  <div className='flex gap-3'>
                    <p className='text-[0.8rem] text-gray-300'>{comment.__v >= 1 && 'Đã chỉnh sửa'}</p>
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
                          commentFatherId,
                          commenter._id
                        );
                      }}
                    >
                      Trả lời
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <RepCommentSkeleton />
      )}
    </>
  );
};

export default RepCommentCard;

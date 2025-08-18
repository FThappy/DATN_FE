'use client';
import { checkReqAddFriend } from '@/actions/checkReqAddFriend';
import { deleteAddFriend } from '@/actions/deleteAddFriend';
import { userStore } from '@/store/userStore';
import { socket } from '@/utils/requestMethod';
import toastifyUtils from '@/utils/toastify';
import { User } from '@/utils/typeAuth';
import { FriendProps, ReqAddFriendProps } from '@/utils/typeReqAddFriend';
import React, { useEffect, useState } from 'react';
import { GoPersonAdd } from 'react-icons/go';
import { FaUserCheck } from 'react-icons/fa';
import { FaUserTimes } from 'react-icons/fa';
import { checkFriend } from '@/actions/checkFriend';
import { deleteFriend } from '@/actions/deleteFriend';
import { refuseAddFriend } from '@/actions/refuseAddFriend';
import { FaUserXmark } from 'react-icons/fa6';

type Props = {
  user: User;
};

const BtnHeader = (props: Props) => {
  const { user } = props;

  const owner = userStore((state: any) => state?.user);

  const [isAddFriend, setIsAddFriend] = useState<ReqAddFriendProps>();

  const [isFriend, setIsFriend] = useState<FriendProps>();

  const [pending, setPending] = useState<boolean>(false);

  const [pendingRefuse, setPendingRefuse] = useState<boolean>(false);

  useEffect(() => {
    const checkAddFriend = async () => {
      if (!user) {
        toastifyUtils('error', 'Không tồn tại người dùng này');
        return;
      }
      try {
        const res = await checkReqAddFriend(user._id);
        if (res.code === 0) {
          setIsAddFriend(res.reqAddFriend);
        }
      } catch (error) {
        console.log(error);
        toastifyUtils('error', 'Lỗi server');
      }
    };
    checkAddFriend();
  }, [user]);

  useEffect(() => {
    const checkIsFriend = async () => {
      if (!user) {
        toastifyUtils('error', 'Không tồn tại người dùng này');
        return;
      }
      try {
        const res = await checkFriend(user._id);
        if (res.code === 0) {
          setIsFriend(res.isFriend);
        }
      } catch (error) {
        console.log(error);
        toastifyUtils('error', 'Lỗi server');
      }
    };
    checkIsFriend();
  }, [user]);

  useEffect(() => {
    socket.off('error-req').on('error-req', error => {
      setPending(false);

      setPendingRefuse(false);

      return toastifyUtils('error', error.message);
    });

    return () => {
      socket.off('error-req');
    };
  }, []);

  useEffect(() => {
    const handleNewReqAddFriend = (newReqAddFriend: ReqAddFriendProps) => {
      setIsAddFriend(newReqAddFriend);
      setPending(false);
    };

    socket.on('send-req-add-friend', handleNewReqAddFriend);

    return () => {
      socket.off('send-req-add-friend');
    };
  }, [setIsAddFriend]);
  useEffect(() => {
    const handleNewFriend = (newFriend: FriendProps) => {
      console.log(newFriend);
      setIsAddFriend(undefined);
      setIsFriend(newFriend);
      setPending(false);
    };

    socket.on('accept-req-friend', handleNewFriend);

    return () => {
      socket.off('accept-req-friend');
    };
  }, [setIsFriend]);

  const handleAddFriend = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPending(true);
    if (!user) {
      setPending(false);
      toastifyUtils('error', 'Không tồn tại người dùng này');
      return;
    }
    if (!owner) {
      setPending(false);
      toastifyUtils('warning', 'Đăng nhập để thực hiện chức năng này');
      return;
    }
    try {
      socket.emit('send-req-add-friend', user._id);
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };
  const handleRejectFriend = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPending(true);
    try {
      if (!user) {
        setPending(false);
        toastifyUtils('error', 'Không tồn tại người dùng này');
        return;
      }
      const res = await deleteAddFriend(user._id);
      if (res.code === 0) {
        setPending(false);
        setIsAddFriend(undefined);
        socket.emit('remove-notification', user._id, 'addFriend');
      }
      if (res.code === 1) {
        setPending(false);
        return toastifyUtils('warning', 'Không tồn tại yêu cầu kết bạn này');
      }
      if (res.code === 3) {
        setPending(false);
        return toastifyUtils('warning', 'Không tồn tại người dùng');
      }
      if (res.code === 4) {
        setPending(false);
        return toastifyUtils('error', 'Không đủ quyền');
      }
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };
  const handleAcept = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPending(true);
    if (!user) {
      setPending(false);
      toastifyUtils('error', 'Không tồn tại người dùng này');
      return;
    }
    if (!owner) {
      setPending(false);
      toastifyUtils('warning', 'Đăng nhập để thực hiện chức năng này');
      return;
    }
    try {
      socket.emit('accept-req-friend', user._id);
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };
  const handleRefuse = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPendingRefuse(true);
    try {
      if (!user) {
        setPendingRefuse(false);
        toastifyUtils('error', 'Không tồn tại người dùng này');
        return;
      }
      const res = await refuseAddFriend(user._id);
      if (res.code === 0) {
        setPendingRefuse(false);
        setIsAddFriend(undefined);
        socket.emit('remove-notification', user._id, 'addFriend');
      }
      if (res.code === 1) {
        setPendingRefuse(false);
        return toastifyUtils('warning', 'Không tồn tại yêu cầu này');
      }
      if (res.code === 3) {
        setPendingRefuse(false);
        return toastifyUtils('warning', 'Không tồn tại người dùng');
      }
      if (res.code === 4) {
        setPendingRefuse(false);
        return toastifyUtils('error', 'Không đủ quyền');
      }
    } catch (error) {
      setPendingRefuse(false);
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };
  const handleDeleteFriend = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPending(true);
    try {
      if (!user) {
        setPending(false);
        toastifyUtils('error', 'Không tồn tại người dùng này');
        return;
      }
      const res = await deleteFriend(user._id);
      if (res.code === 0) {
        setPending(false);
        setIsFriend(undefined);
      }
      if (res.code === 1) {
        setPending(false);
        return toastifyUtils('warning', 'Không tồn tại mối quan hệ này');
      }
      if (res.code === 3) {
        setPending(false);
        return toastifyUtils('warning', 'Không tồn tại người dùng');
      }
      if (res.code === 4) {
        setPending(false);
        return toastifyUtils('error', 'Không đủ quyền');
      }
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };

  return (
    <>
      {!isFriend ? (
        !isAddFriend ? (
          <button
            className='flex gap-2 justify-center items-center p-2 bg-sky-400 w-[15rem] rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-sky-600'
            onClick={handleAddFriend}
          >
            <GoPersonAdd size={24} color='white' />
            <div className='flex justify-center gap-2 font-bold text-[1rem] text-white'>
              {pending ? (
                <>
                  <p>Loading</p>
                  <div className='loader'></div>
                </>
              ) : (
                'Thêm bạn bè'
              )}
            </div>
          </button>
        ) : (
          <>
            {owner?.id === isAddFriend.from && user._id === isAddFriend.to && (
              <button
                className='flex gap-2 justify-center items-center p-2 bg-red w-[15rem] rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-red/75'
                onClick={handleRejectFriend}
              >
                <GoPersonAdd size={24} color='white' />
                <div className='flex justify-center gap-2 font-bold text-[1rem] text-white'>
                  {pending ? (
                    <>
                      <p>Loading</p>
                      <div className='loader'></div>
                    </>
                  ) : (
                    'Hủy lời mời'
                  )}
                </div>
              </button>
            )}
            {user._id === isAddFriend.from && owner?.id === isAddFriend.to && (
              <div className='flex gap-2 items-center'>
                <button
                  className='flex gap-2 justify-center items-center p-2 bg-greenPrimary px-8 rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-greenPrimary/75'
                  onClick={handleAcept}
                >
                  <FaUserCheck size={24} color='white' />
                  <div className='flex justify-center gap-2 font-bold text-[1rem] text-white'>
                    {pending ? (
                      <>
                        <p>Loading</p>
                        <div className='loader'></div>
                      </>
                    ) : (
                      'Chấp nhận lời mời'
                    )}
                  </div>
                </button>
                <button
                  className='flex gap-2 justify-center items-center p-2 bg-red px-8 rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-red/75'
                  onClick={handleRefuse}
                >
                  <FaUserTimes size={24} color='white' />
                  <div className='flex justify-center gap-2 font-bold text-[1rem] text-white'>
                    {pendingRefuse ? (
                      <>
                        <p>Loading</p>
                        <div className='loader'></div>
                      </>
                    ) : (
                      'Từ chối lời mời'
                    )}
                  </div>
                </button>
              </div>
            )}
          </>
        )
      ) : (
        <button
          className='flex gap-2 justify-center items-center p-2 bg-red w-[15rem] rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-red/75'
          onClick={handleDeleteFriend}
        >
          <FaUserXmark size={24} color='white' />
          <div className='flex justify-center gap-2 font-bold text-[1rem] text-white'>
            {pending ? (
              <>
                <p>Loading</p>
                <div className='loader'></div>
              </>
            ) : (
              'Hủy kết bạn'
            )}
          </div>
        </button>
      )}
    </>
  );
};

export default BtnHeader;

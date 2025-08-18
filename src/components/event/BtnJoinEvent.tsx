import { checkJoin } from '@/actions/checkJoin';
import { createJoinEvent } from '@/actions/createJoinEvent';
import { deleteJoinEvent } from '@/actions/deleteJoinEvent';
import { userStore } from '@/store/userStore';
import toastifyUtils from '@/utils/toastify';
import React, { useEffect, useState } from 'react';
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import { Skeleton } from '../ui/skeleton';
type ListJoinProps = {
  _id: string;
  itemId: string;
  userId: string;
};
type Props = {
  userId: string;
  eventId: string;
  listJoin: ListJoinProps[];
  setListJoin: React.Dispatch<React.SetStateAction<ListJoinProps[]>>;
  totalJoin: number;
  setTotalJoin: React.Dispatch<React.SetStateAction<number>>;
};

const BtnJoinEvent = (props: Props) => {
  const { userId, eventId, setListJoin, setTotalJoin } = props;

  const [isJoin, setIsJoin] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const [pending, setPending] = useState(false);

  useEffect(() => {
    const checkJoinEvent = async () => {
      try {
        const res = await checkJoin(userId, eventId);
        setIsJoin(prev => res.success);
        setIsActive(true);
      } catch (error) {
        return toastifyUtils('error', 'Lỗi server');
      }
    };
    checkJoinEvent();
  }, [userId, eventId]);

  const handleJoinEvent = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const dataSend = {
      userId: userId,
      eventId: eventId
    };
    if (!userId) {
      setPending(false);
      return toastifyUtils('warning', 'Bạn phải đăng nhập để thực hiện chức năng này');
    }
    setPending(true);

    try {
      const res = await createJoinEvent(dataSend);
      if (res.code === 1) {
        setPending(false);

        return toastifyUtils('warning', 'Không tồn tại sự kiện này');
      }
      if (res.code === 2) {
        setPending(false);

        return toastifyUtils('warning', 'Không tồn tại người dùng');
      }
      if (res.code === 3) {
        setPending(false);

        return toastifyUtils('warning', 'Bạn đã tham gia sự kiện này rồi');
      }
      if (res.code === 4) {
        setPending(false);

        return toastifyUtils('error', 'Lỗi server');
      }
      setIsJoin(prev => res.success);
      setPending(false);
      setTotalJoin(prev => prev + 1);
      setListJoin(prev => {
        const newJoin = [res.join, ...prev];
        return newJoin;
      });
      toastifyUtils('success', 'Đăng ký tham gia thành công');
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils('error', 'Lỗi server');
    }
  };
  const handleDeleteJoin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPending(true);
    try {
      const res = await deleteJoinEvent(userId, eventId);
      if (res.code === 1) {
        setPending(false);

        return toastifyUtils('warning', 'Không tồn tại sự kiện này');
      }
      if (res.code === 2) {
        setPending(false);

        return toastifyUtils('warning', 'Không tồn tại người dùng');
      }
      if (res.code === 4) {
        setPending(false);

        return toastifyUtils('error', 'Lỗi server');
      }
      setIsJoin(prev => res.success);
      setPending(false);
      setListJoin(prev => {
        const newJoin = [...prev];
        newJoin.splice(0, 1);
        return newJoin;
      });
      setTotalJoin(prev => prev - 1);
      toastifyUtils('success', 'Hủy tham gia thành công');
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils('error', 'Lỗi server');
    }
  };

  return (
    <>
      {isActive ? (
        isJoin ? (
          <>
            <button
              className='h-[3rem] flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] '
              onClick={handleDeleteJoin}
            >
              {pending ? (
                <>
                  <p>Loading</p>
                  <div className='loader'></div>
                </>
              ) : (
                <>
                  <CiCircleRemove size={24} />
                  <p className='font-bold text-[1.1rem]'>Hủy tham gia</p>
                </>
              )}
            </button>
          </>
        ) : (
          <>
            <button
              className='h-[3rem] flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] '
              onClick={handleJoinEvent}
            >
              {pending ? (
                <>
                  <p>Loading</p>
                  <div className='loader'></div>
                </>
              ) : (
                <>
                  <CiCircleCheck size={24} />
                  <p className='font-bold text-[1.1rem]'>Sẽ tham gia</p>
                </>
              )}
            </button>
          </>
        )
      ) : (
        <Skeleton
          className='h-[3rem] w-[10rem] 
                flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] '
        />
      )}
    </>
  );
};

export default BtnJoinEvent;

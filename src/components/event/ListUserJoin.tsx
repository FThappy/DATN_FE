import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '../ui/skeleton';
import toastifyUtils from '@/utils/toastify';
import CardListJoin from './CardListJoin';
import { getListUserJoinEvent } from '@/actions/getListUserJoinEvent';
import { deleteJoinEventByOwner } from '@/actions/deleteJoinEventByOwner';

type ListJoinProps = {
  _id: string;
  itemId: string;
  userId: string;
};
type Props = {
  eventId: string;
  ownerId: string;
  listJoin: ListJoinProps[];
  setListJoin: React.Dispatch<React.SetStateAction<ListJoinProps[]>>;
};

const ListUserJoin = (props: Props) => {
  const { eventId, ownerId, listJoin, setListJoin } = props;

  const { ref, inView } = useInView();

  const [page, setPage] = useState<number>(0);

  const [endListJoin, setEndListJoin] = useState<boolean>(true);

  const getListPost = async (): Promise<void> => {
    try {
      const res = await getListUserJoinEvent(page, eventId);
      if (res.code === 4) {
        toastifyUtils('error', 'Lỗi server');
      }
      if (res.data.length < 9) {
        setEndListJoin(false);
      }
      if (res.code === 0) {
        setListJoin(prevPost => [...prevPost, ...res.data]);
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

  const removeJoin = (index: number) => {
    setListJoin(prevListJoin => {
      const listJoin: ListJoinProps[] = [...prevListJoin];
      listJoin.splice(index, 1);
      return listJoin;
    });
  };

  return (
    <>
      {listJoin.map((item, index) => (
        <div className='w-full ' key={index}>
          <CardListJoin
            userId={item.userId}
            itemId={item.itemId}
            joinId={item._id}
            index={index}
            ownerId={ownerId}
            removeJoin={removeJoin}
          />
        </div>
      ))}
      {endListJoin ? (
        <div className='w-full flex flex-col gap-2' ref={ref}>
          <Skeleton className='w-full h-[60px] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]' />
          <Skeleton className='w-full h-[60px] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]' />
          <Skeleton className='w-full h-[60px] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]' />
          <Skeleton className='w-full h-[60px] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]' />
          <Skeleton className='w-full h-[60px] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]' />
        </div>
      ) : (
        <p className='text-center text-[1.5rem] my-4 text-gray-400 font-bold'>Đã hết người dùng</p>
      )}
    </>
  );
};

export default ListUserJoin;

import { checkLike } from '@/actions/checkLike';
import { createLike } from '@/actions/createLike';
import { unLike } from '@/actions/unLike';
import { userStore } from '@/store/userStore';
import toastifyUtils from '@/utils/toastify';
import React, { useEffect, useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';

type Props = {
  itemId: string;
  type: string;
  totalLike: number;
  setTotalLike: React.Dispatch<React.SetStateAction<number>>;
};

const LikeContainer = (props: Props) => {
  const { itemId, type, setTotalLike, totalLike } = props;
  const user = userStore((state: any) => state?.user);

  const [isLike, setIsLike] = useState<boolean>(false);

  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    const browserLike = async () => {
      try {
        const res = await checkLike(itemId);
        if (res.code === 0) {
          setIsLike(true);
        }
      } catch (error) {
        console.log(error);
        toastifyUtils('error', 'Lỗi server');
      }
    };
    browserLike();
  }, [itemId]);

  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const res = await createLike(itemId, type);
      if (res.code === 0) {
        setIsLike(true);
        setTotalLike(prev => prev + 1);
      }
      if (res.code === 1) {
        return toastifyUtils('warning', 'Không tồn tại sản phẩm');
      }
      if (res.code === 3) {
        return toastifyUtils('warning', 'Không tồn tại người dùng');
      }
      if (res.code === 4) {
        return toastifyUtils('error', 'Lỗi server');
      }
    } catch (error) {
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };
  const handleUnLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const res = await unLike(itemId);
      if (res.code === 0) {
        setIsLike(false);
        setTotalLike(prev => prev - 1);
      }
      if (res.code === 1) {
        return toastifyUtils('warning', 'Không tồn tại sản phẩm');
      }
      if (res.code === 3) {
        return toastifyUtils('warning', 'Không tồn tại người dùng');
      }
      if (res.code === 4) {
        return toastifyUtils('error', 'Lỗi server');
      }
    } catch (error) {
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    }
  };
  const handleToast = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    return toastifyUtils('warning', 'Vui lòng đăng nhập');
  };

  if (type === 'post') {
    return user ? (
      <button
        className='flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 rounded-[10px] p-2 w-full'
        onClick={e => {
          e.preventDefault();
          if (isLike) {
            handleUnLike(e);
          } else {
            handleLike(e);
          }
        }}
      >
        <AiFillLike size={28} color={isLike ? '#0766FF' : '#9ca3af'} />
        <p
          className='text-gray-400 font-bold text-[1rem]'
          style={{
            color: isLike ? '#0766FF' : '#9ca3af'
          }}
        >
          Thích
        </p>
      </button>
    ) : (
      <button
        className='flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 rounded-[10px] p-2 w-full'
        onClick={handleToast}
      >
        <AiFillLike size={28} color={'#9ca3af'} />
        <p className='text-gray-400 font-bold text-[1rem]'>Thích</p>
      </button>
    );
  } else {
    return user ? (
      <button
        className='flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 rounded-[10px] p-1 w-[5rem] h-[3rem]'
        onClick={e => {
          e.preventDefault();
          if (isLike) {
            handleUnLike(e);
          } else {
            handleLike(e);
          }
        }}
      >
        <FaHeart size={32} color={isLike ? '#E3242B' : '#FEC9C3'} className='hover:text-[#E3242B]' />
        <p
          className='text-gray-400 font-bold text-[1rem]'
          style={{
            color: isLike ? '#E3242B' : '#FEC9C3'
          }}
        >
          {totalLike}
        </p>
      </button>
    ) : (
      <button
        className='flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 rounded-[10px] p-1 w-[5rem] h-[3rem]'
        onClick={handleToast}
      >
        <FaHeart size={28} color={'#FEC9C3'} />
        <p className='text-gray-400 font-bold text-[1rem]'>{totalLike}</p>
      </button>
    );
  }
};

export default LikeContainer;

'use client';

import { userStore } from '@/store/userStore';
import { PostProps } from '@/utils/typePost';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalCreatePost from '../ModalCreatePost';
import LoadMoreDisscuss from '../profile/ForeignProfile/LoadMoreDisscuss';

type Props = {
  eventId: string;
};

const DiscussContainer = (props: Props) => {
  const { eventId } = props;
  const user = userStore((state: any) => state?.user);
  const [open, setOpen] = useState<boolean>(false);

  const [posts, setPosts] = useState<PostProps[]>([]); // S

  return (
    <div className={`w-full bg-[#f1eff4d1] pr-[3rem] ${open && `max-h-[10rem] overflow-hidden`}`}>
      <div className='p-4 shadow-beautiful rounded-[0.5rem]	bg-white '>
        <div className='flex items-center'>
          <div className='w-[40px] h-[40px] '>
            <Image
              src={user?.img ? user?.img : '/twitter.png'}
              alt='logo-user'
              loading='lazy'
              height={50}
              width={50}
              className='cursor-pointer rounded-full h-full'
            />
          </div>
          <button
            className='ml-4 bg-gray-100 h-[3rem] w-full rounded-[2rem] text-left p-2 text-[1.2rem] pl-4
          hover:bg-[#E8E5ED] '
            onClick={() => setOpen(true)}
          >
            Bạn đang nghĩ gi thế?
          </button>
        </div>
        <div className='border-slate-300 w-full h-[10px] border-t-[1px] mt-[0.65rem]'></div>
        <div className='flex justify-between'>
          <div
            className='w-full h-[40px] cursor-pointer flex items-center justify-center
           gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]'
            onClick={() => setOpen(true)}
          >
            <div className='w-[30px] h-[30px]'>
              <Image
                src='/photo.png'
                alt='logo'
                loading='lazy'
                height={30}
                width={30}
                className='cursor-pointer h-full'
              />
            </div>
            <p className='font-normal text-[1rem] text-slate-800 mr-[1rem]'>Ảnh/Video</p>
          </div>
          <div
            className='w-full h-[40px] cursor-pointer flex items-center justify-center
           gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]'
            onClick={() => setOpen(true)}
          >
            <div className='w-[30px] h-[30px]'>
              <Image
                src='/smiling.png'
                alt='logo'
                loading='lazy'
                height={30}
                width={30}
                className='cursor-pointer h-full'
              />
            </div>
            <p className='font-normal text-[1rem] text-slate-800 mr-[1rem]'>Cảm xúc/Hoạt động</p>
          </div>
        </div>
      </div>
      <LoadMoreDisscuss posts={posts} setPosts={setPosts} organizationId={eventId} />
      {open && (
        <ModalCreatePost
          open={open}
          setOpen={setOpen}
          posts={posts}
          setPosts={setPosts}
          organizationId={eventId}
          type={'event'}
        />
      )}
    </div>
  );
};

export default DiscussContainer;

'use client';
import ForeignProfile from '@/components/profile/ForeignProfile/ForeignProfile';
import Profile from '@/components/profile/Profile/Profile';
import { userStore } from '@/store/userStore';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  const user = userStore((state: any) => state?.user);

  if (params.id === user?.id && user) {
    return (
      <div className='bg-[#f1eff4d1] w-full relative'>
        <Profile id={params.id} />{' '}
      </div>
    );
  }

  return (
    <div className='bg-[#f1eff4d1] w-full '>
      <ForeignProfile id={params.id} />
    </div>
  );
};

export default page;

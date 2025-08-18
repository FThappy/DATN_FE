'use client';

import React from 'react';
import { userStore } from '@/store/userStore';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Accordion } from '@/components/ui/accordion';
import FeatureEvent from './FeatureEvent';
import FeatureAuth from './FeatureAuth';
import FeatureProject from './FeatureProject';
import FeatureTranscation from './FeatureTranscation';

const Sidebar = () => {
  const user = userStore((state: any) => state?.user);

  const pathname = usePathname().split('/')[2];

  return (
    <div className='w-1/6 pr-4 pl-2 pt-4 flex flex-col gap-4 shadow-beautiful  h-auto bg-white'>
      <div className='fixed w-1/6 pr-6'>
        <div className='w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem] mb-2'>
          <div className='w-[50px] h-[50px]'>
            <Image
              src={user?.img ? user?.img : '/twitter.png'}
              alt='logo-user'
              loading='lazy'
              height={50}
              width={50}
              className='cursor-pointer rounded-full  h-full'
            />
          </div>
          <p className='font-normal text-[1.2rem] text-slate-800 mr-[1rem]'>
            {user?.displayName ? user.displayName : user?.username}
          </p>
        </div>
        <Accordion type='single' collapsible className='w-full'>
          <FeatureAuth pathName={pathname} />
          <FeatureEvent pathName={pathname} />
          <FeatureProject pathName={pathname} />
          <FeatureTranscation pathName={pathname} />
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;

'use client';
import React, { Suspense } from 'react';
import EventJoinPage from './EventJoinPage';
import ModalCreateEvent from '@/components/event/ModalCreateEvent';

type Props = {};

const page = (props: Props) => {
  return (
    <div className='w-5/6'>
      <Suspense fallback={<div>Loading...</div>}>
        <EventJoinPage />
      </Suspense>
      <ModalCreateEvent />
    </div>
  );
};

export default page;

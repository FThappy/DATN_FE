'use client';
import React, { Suspense } from 'react';
import EventOwnerPage from './EventOwnerPage';
import ModalCreateEvent from '@/components/event/ModalCreateEvent';

type Props = {};

const page = (props: Props) => {
  return (
    <div className='w-5/6'>
      <Suspense fallback={<div>Loading...</div>}>
        <EventOwnerPage />
      </Suspense>
      <ModalCreateEvent />
    </div>
  );
};

export default page;

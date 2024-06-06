"use client"
import React, { Suspense } from 'react'
import EventJoinPage from './EventJoinPage';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EventJoinPage />
      </Suspense>
    </div>
  );
}

export default page
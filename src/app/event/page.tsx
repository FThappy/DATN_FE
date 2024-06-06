"use client"
import React, { Suspense } from 'react'
import EventPage from './EventPage';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EventPage />
      </Suspense>
    </div>
  );
}

export default page
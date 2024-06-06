"use client"
import React, { Suspense } from 'react'
import EventOwnerPage from './EventOwnerPage';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EventOwnerPage />
      </Suspense>
    </div>
  );
}

export default page
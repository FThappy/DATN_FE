"use client"
import React, { Suspense } from 'react'
import ContentProject from './ContentProject';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ContentProject />
      </Suspense>
    </div>
  );
}

export default page
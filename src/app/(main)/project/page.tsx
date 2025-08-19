'use client';
import React, { Suspense } from 'react';
import ContentProject from './ContentProject';

const page = () => {
  return   <Suspense fallback={<div>Loading...</div>}>
      <ContentProject />
    </Suspense>;
};

export default page;

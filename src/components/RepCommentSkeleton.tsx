import React from 'react';
import { Skeleton } from './ui/skeleton';

type Props = {};

const RepCommentSkeleton = (props: Props) => {
  return (
    <div className='flex items-center mt-2 mb-2'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2 ml-2'>
        <Skeleton className='h-12 w-[32rem]' />
      </div>
    </div>
  );
};

export default RepCommentSkeleton;

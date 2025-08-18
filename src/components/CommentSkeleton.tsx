import React from 'react';
import { Skeleton } from './ui/skeleton';

type Props = {};

const CommentSkeleton = (props: Props) => {
  return (
    <div className='flex items-center'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2 ml-2'>
        <Skeleton className='h-12 w-[38rem]' />
      </div>
    </div>
  );
};

export default CommentSkeleton;

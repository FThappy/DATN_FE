import React from 'react'
import { Skeleton } from './ui/skeleton';

type Props = {}

const NotificationSkeleton = (props: Props) => {
  return (
    <div className="flex items-center mt-2 mb-2 gap-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 ml-2">
        <Skeleton className="h-12 w-[18rem]" />
      </div>
    </div>
  );
}

export default NotificationSkeleton
import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const EventSkeleton = (props: Props) => {
  return (
    <div className="grid grid-cols-4 gap-2 w-full mt-2 mb-2">
      <Skeleton className="w-full h-[23rem]  rounded-[8px] " />
      <Skeleton className="w-full h-[23rem]  rounded-[8px] " />
      <Skeleton className="w-full h-[23rem]  rounded-[8px] " />
      <Skeleton className="w-full h-[23rem]  rounded-[8px] " />
    </div>
  );
}

export default EventSkeleton
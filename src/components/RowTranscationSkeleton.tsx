import React from 'react'
import { TableCell, TableRow } from './ui/table';
import { Skeleton } from './ui/skeleton';

type Props = {}

const RowTranscationSkeleton = (props: Props) => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-full h-[2rem] rounded-[8px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[100%] h-[2rem] rounded-[8px] " />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[100%] h-[2rem] rounded-[8px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[100%] h-[2rem] rounded-[8px]" />
      </TableCell>
    </TableRow>
  );
}

export default RowTranscationSkeleton
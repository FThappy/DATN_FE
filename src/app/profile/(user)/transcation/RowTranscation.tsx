import { getProjectById } from '@/actions/getProjectById';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';
import { dateFormatCustom } from '@/utils/timeSend';
import toastifyUtils from '@/utils/toastify';
import { ProjectProps } from '@/utils/typeProject';
import { TranscationProps } from '@/utils/typeTranscation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

type Props = {
    transcation : TranscationProps;
    index : number;
}

const RowTranscation = (props: Props) => {

  const { index , transcation } = props

  const [project, setProject] = useState<ProjectProps>();

    useEffect(() => {
    const getProject = async () => {
      try {
        const res = await getProjectById(transcation.projectId);
        if (res.code === 9) {
          return toastifyUtils("error", "Dự án của bạn đã bị khóa");
        }
        if (res.code === 4) {
          throw new Error("Server Error");
        }
        setProject(res.project);
      } catch (error) {
        console.error("Server Error", error);
      }
    };

    getProject();
  }, [transcation.projectId]);
  return (
    <TableRow key={index}>
      <TableCell className="font-medium w-[150px] text-[1.2rem] flex justify-center py-4">
        {index + 1}
      </TableCell>
      <TableCell className="text-[1.2rem] w-[30rem] text-red py-4">
        {transcation.amount
          ? transcation.amount.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          : "0VND"}
      </TableCell>
      <TableCell className="text-[1.2rem] w-[30rem] py-4">
        <Link href={`/project/${transcation.projectId}`}  className="hover:text-blue">
          {project?.projectName ? project?.projectName : <Skeleton className="w-[100%] h-[2rem] rounded-[8px]" />}
        </Link>
      </TableCell>
      <TableCell className="text-right text-[1.2rem] py-4">
        {dateFormatCustom(new Date(transcation.createdAt))}
      </TableCell>
    </TableRow>
  );
}

export default RowTranscation
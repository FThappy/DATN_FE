'use client';
import React, { useEffect, useState } from 'react';
import { Inter, Dancing_Script } from 'next/font/google';
import TextUnderline from '../utils/TextUnderline';
import UrgentCauseCard from './urgentCausesCard/UrgentCauseCard';
import { ourcauses } from '@/lib/placeholder-data';
import { ProjectProps } from '@/utils/typeProject';
import toastifyUtils from '@/utils/toastify';
import { getProjectLike } from '@/actions/getProjectLike';
import { Skeleton } from '../ui/skeleton';
import ProjectCard from '../project/ProjectCard';

const dancing = Dancing_Script({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const colors = ['#F84D42', '#FFB840', '#20b86d'];

type ItemProps = {
  project: ProjectProps;
  totalLike: number;
};

const OurCause = () => {
  const [listProject, setListProject] = useState<ItemProps[]>([]);

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await getProjectLike(3);
        if (res.code === 0) {
          setListProject(res.data);
        }
      } catch (error) {
        console.log(error);
        return toastifyUtils('error', 'Lỗi server');
      }
    };
    getItem();
  }, []);
  return (
    <div className='flex flex-col items-center justify-center w-full h-[820px] bg-slate-200 gap-4'>
      <p className={`${dancing.className} font-bold text-red text-4xl `}>Dự án thiện nguyện</p>
      <p className={`${inter.className} font-bold text-slate-800 text-4xl  mb-4`}>
        Dự án được
        <TextUnderline chilldren=' Yêu thích' width={270} top='2rem' left='0.6rem' />
      </p>
      <p className={`${inter.className}  text-neutral-800 mb-4 w-[40rem] text-[1.3rem] text-center`}>
        Hãy giúp đỡ những hoàn cảnh và đời sống của các cá nhân hoặc cộng đồng có hoàn cảnh khó khăn, mỗi một sự đóng
        góp nhỏ của các bạn tạo nên một con ngưới mới trong tương lai.
      </p>
      <div className='flex gap-4 w-[75%] justify-center mb-1'>
        {listProject && listProject.length > 0 ? (
          listProject.map((cause, index) => (
            <div key={index} className='w-1/3'>
              <ProjectCard cause={cause.project} color={colors[index % 3]} />
            </div>
          ))
        ) : (
          <>
            <Skeleton className='bg-white w-[320px] h-full rounded p-4 flex flex-col' />
            <Skeleton className='bg-white w-[320px] h-full rounded p-4 flex flex-col' />
            <Skeleton className='bg-white w-[320px] h-full rounded p-4 flex flex-col' />
          </>
        )}
      </div>
    </div>
  );
};

export default OurCause;

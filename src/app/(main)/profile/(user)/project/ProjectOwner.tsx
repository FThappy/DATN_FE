import { searchProjectByOwner } from '@/actions/searchProjectByOwner';
import SearchProjectContainer from '@/components/project/SearchProjectContainer';
import toastifyUtils from '@/utils/toastify';
import { ProjectProps } from '@/utils/typeProject';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { IoCreateOutline } from 'react-icons/io5';
import ProjectCard from '@/components/project/ProjectCard';

type Props = {};

const colors = ['#F84D42', '#FFB840', '#20b86d'];

const ProjectOwner = (props: Props) => {
  const searchParams = useSearchParams();

  const pSearch = searchParams.get('qSearch');

  const pType = searchParams.get('qType');

  const pSort = searchParams.get('qSort');

  const pCity = searchParams.get('qCity');

  const [pageSearch, setPageSearch] = useState<number>(0);

  const [endProject, setEndProject] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [project, setProject] = useState<ProjectProps[]>([]);

  const handleSearch = async (page: number, isLoadMore = false) => {
    setIsLoading(true);
    console.log(pageSearch);
    try {
      const dataSend: Record<string, any> = {
        page: page
      };
      if (pSearch) {
        dataSend['qSearch'] = pSearch;
      }
      if (pSort) {
        dataSend['qSort'] = pSort;
      }
      if (pCity) {
        dataSend['qCity'] = pCity;
      }
      if (pType) {
        dataSend['qType'] = pType.length > 0 ? pType : [];
      }
      const res = await searchProjectByOwner(dataSend);
      if (res.code === 4) {
        toastifyUtils('error', 'Lỗi server');
        setIsLoading(false);
        return;
      }
      if (res.data.length < 3) {
        setEndProject(false);
      } else {
        setEndProject(true);
      }
      if (res.code === 0) {
        setProject(prev => (isLoadMore ? [...prev, ...res.data] : res.data));
        setPageSearch(prev => prev + 1);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toastifyUtils('error', 'Lỗi server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPageSearch(0);
    setProject([]);
    handleSearch(0, false);
  }, [pSearch, pSort, pCity, JSON.stringify(pType)]);
  return (
    <div className='p-2 w-full '>
      <div className='shadow-beautiful w-full h-[55rem] flex flex-col bg-white rounded-[8px]'>
        <div className=' min-h-[53.25rem] h-auto w-full  pt-1 flex flex-col items-center'>
          <div className='relative h-auto p-2 w-full bg-white pt-1 flex flex-col items-center pb-[2.1rem]'>
            <SearchProjectContainer setPageSearch={setPageSearch} />
            <div className='grid grid-cols-3 gap-2 w-full mt-2 mb-2'>
              {project &&
                project.map((cause, index) => (
                  <div key={index}>
                    <ProjectCard cause={cause} color={colors[index % 3]} />
                  </div>
                ))}
            </div>
            {isLoading ? (
              <div className='w-full grid grid-cols-4 gap-2  mt-2 mb-2'>
                <Skeleton className='w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]' />
                <Skeleton className='w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]' />
                <Skeleton className='w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]' />
                <Skeleton className='w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]' />
              </div>
            ) : (
              <></>
            )}
            <Link href={'/project/create'} className='fixed	 bottom-[1rem] right-[0.5rem]'>
              <div className='shadow-beautiful bg-white w-[4rem] h-[4rem] cursor-pointer flex items-center justify-center hover:bg-gray-100 p-2  rounded-full'>
                <IoCreateOutline size={24} />
              </div>
            </Link>
            {endProject ? (
              <button
                className='flex items-center justify-center font-bold bg-red hover:bg-greenPrimary  text-white p-2 mt-2 mb-2'
                onClick={() => handleSearch(pageSearch, true)}
              >
                - Tải thêm dự án -
              </button>
            ) : (
              <p className='text-center text-[1.5rem] my-4 text-gray-400 font-bold'>- Đã hết dự án -</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOwner;

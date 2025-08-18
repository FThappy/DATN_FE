'use client';
import Image from 'next/image';
import React from 'react';
import { Inter, Dancing_Script } from 'next/font/google';
import ButtonHome from '../utils/ButtonHome/ButtonHome';
import { FaClock } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { ProjectProps } from '@/utils/typeProject';
import { causes } from '../../lib/placeholder-data';
import Link from 'next/link';

const dancing = Dancing_Script({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const ProjectCard = ({ cause, color }: { cause: ProjectProps; color: string }) => {
  return (
    <Link
      href={`/project/${cause._id}`}
      className='bg-white w-full h-[35rem] rounded-[8px] shadow-beautiful flex flex-col '
    >
      <img
        src={`${cause.image.length > 0 ? cause.image[0] : '/bg2.jpg'}`}
        alt='logo'
        loading='lazy'
        className='self-center w-full h-[14rem] object-cover rounded-t-[8px]'
      />
      <div className='px-2'>
        <p className={`${inter.className} font-bold text-slate-800 text-[1.2rem] mt-3`}>{cause.projectName}</p>
        <p className={`${inter.className}  text-neutral-800 h-[3rem]  mt-3`}>
          {cause.description.length > 60 ? cause.description.slice(0, 60) + '....' : cause.description}
        </p>
        <div className=' w-full  flex justify-between mt-3'>
          <div className='flex gap-1 items-center'>
            <FaMapMarkerAlt color='gray' />
            <p className={`${inter.className} font-bold text-gray-600 `}>Vị trí</p>
          </div>
          <div className='flex gap-1 items-center'>
            <p className={`${inter.className} font-bold text-gray-600 `}>{cause.city}</p>
          </div>
        </div>
        <div className=' w-full  flex justify-between mt-3'>
          <p className={`${inter.className} font-bold text-gray-600 `}>Raised : </p>
          <p className={`${inter.className} font-bold text-gray-600 `}>
            {cause.rise
              ? cause.rise.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND'
                })
              : '0VND'}
          </p>
        </div>
        <div className=' w-full flex justify-between mt-3'>
          <p className={`${inter.className} font-bold text-gray-600 `}>Goal :</p>
          <p className={`${inter.className} font-bold text-gray-600 `}>
            {cause.goal
              ? cause.goal.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND'
                })
              : '0VND'}
          </p>
        </div>
        <div className='bg-gray-200 w-full h-[10px] rounded-full mt-6 flex'>
          <div
            className=' h-[10px] rounded-full  flex justify-end items-center progress-bar-striped progress-bar-animated'
            style={{
              width: `${(cause.rise / cause.goal) * 100}%`,
              backgroundColor: `${color}`
            }}
          >
            <div
              className=' w-[20px] h-[20px] rounded-full flex justify-center items-center '
              style={{
                backgroundColor: `${color}`
              }}
            >
              <span className='bg-white w-[10px] h-[10px] rounded-full'></span>
            </div>
          </div>
        </div>
        <div className='mt-6 mb-4 flex justify-center'>
          <button
            className={`h-[3.4rem] relative flex items-center justify-center rounded font-bold text-white text-xl  after:absolute after:left-[-5px] after:bottom-[-5px]
      after:border-dashed after:border-[1px] after:z-10 after:visible after:w-full  after:h-[3.4rem] after:rounded 
      after:hover:left-[0px] after:hover:bottom-[0px] after:hover:z-[-10] animaties
      `}
            style={{
              width: `${14}rem`,
              backgroundColor: `${color}`,
              '--color': `${color}`
            }}
          >
            DONATION NOW
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

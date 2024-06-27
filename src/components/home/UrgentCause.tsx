"use client"
import React, { useEffect, useState } from 'react'
import { Inter, Dancing_Script } from "next/font/google";
import ButtonHome from '../utils/ButtonHome/ButtonHome';
import UrgentCauseCard from './urgentCausesCard/UrgentCauseCard';
import { causes } from '@/lib/placeholder-data';
import { getProjectLike } from '@/actions/getProjectLike';
import toastifyUtils from '@/utils/toastify';
import { ProjectProps } from '@/utils/typeProject';
import { Skeleton } from '../ui/skeleton';
import ProjectCard from '../project/ProjectCard';

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
type ItemProps = {
  project: ProjectProps;
  totalLike: number;
};
const colors = ["#F84D42", "#FFB840", "#20b86d"];
const UrgentCause = () => {
    const [listProject, setListProject] = useState<ItemProps[]>([]);

    useEffect(() => {
      const getItem = async () => {
        try {
          const res = await getProjectLike(3);
          if (res.code === 0) {
            console.log(res.data);
            setListProject(res.data);
          }
        } catch (error) {
          console.log(error);
          return toastifyUtils("error", "Lỗi server");
        }
      };
      getItem();
    }, []);
  return (
    <div
      className="w-full h-[800px] bg-cover "
      style={{ backgroundImage: "url(/bg2.jpg)" }}
    >
      <div className="flex flex-col items-center w-full h-full bg-orange-50/70 px-[3rem] py-8 ">
        <div className="flex  w-[90rem] h-[650px] mt-10 p-4">
          <div className=" w-[20rem] ">
            <p
              className={`${dancing.className} font-bold text-red text-4xl mb-6`}
            >
              Dự án thiện nguyện
            </p>
            <p
              className={`${inter.className} font-bold text-slate-800 text-4xl leading-[3.8rem] mb-6`}
            >
              Đồng hành dễ dàng hơn cùng
              <span className="relative ml-1">
                Chung Tay
                <img
                  src="/title-underline.png"
                  alt="title-underline"
                  loading="lazy"
                  className="absolute w-[12rem] h-full"
                  style={{
                    left: "0.5rem",
                    top: "2.2rem",
                  }}
                />
              </span>
              kết nối các tầm lòng hảo tâm.
            </p>
            <p className={`${inter.className}  text-neutral-800 mb-8`}>
              Chung tay là mạng xã hội từ thiện, kết nối các tổ chức, cá nhân,
              nhà tài trợ và các công ty cùng có mục đích từ thiện. Chúng tôi hỗ
              trợ các dự án, sự kiện từ thiện.
            </p>
            <ButtonHome
              link="/project"
              title="Xem tất cả dự án"
              width="13"
              color="#F84D42"
            />
          </div>
          <div className=" ml-12 flex w-[80%] justify-center gap-2 ">
            {listProject && listProject.length > 0 ? (
              listProject.map((cause, index) => (
                <div key={index} className="w-1/3">
                  <ProjectCard
                    cause={cause.project}
                    color={colors[index % 3]}
                  />
                </div>
              ))
            ) : (
              <>
                <Skeleton className="bg-white w-[320px] h-full rounded p-4 flex flex-col" />
                <Skeleton className="bg-white w-[320px] h-full rounded p-4 flex flex-col" />
                <Skeleton className="bg-white w-[320px] h-full rounded p-4 flex flex-col" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrgentCause
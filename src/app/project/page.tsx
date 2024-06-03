"use client"

import ProjectCard from "@/components/project/ProjectCard";
import { ourcauses } from "@/lib/placeholder-data";
import Link from "next/link";
import React from "react";
import { IoCreateOutline } from "react-icons/io5";

type Props = {};
const colors = ["#F84D42", "#FFB840", "#20b86d"];
const Page = (props: Props) => {
  return (
    <div className="relative h-[53.25rem] w-full bg-[#f1eff4d1] px-16 pt-1 flex flex-col items-center">
      <div className="grid grid-cols-4 gap-2 w-full mt-2 mb-2">
        {ourcauses.map((cause, index) => (
          <div key={index}>
            <ProjectCard cause={cause} color={colors[index % 3]} />
          </div>
        ))}
      </div>
      <Link href={"/project/create"}  className="fixed	 bottom-[1rem] right-[0.5rem]">
       <div className="shadow-beutifull bg-white w-[4rem] h-[4rem] cursor-pointer flex items-center justify-center hover:bg-gray-100 p-2  rounded-full">
            <IoCreateOutline size={24} />
          </div>
      </Link>
    </div>
  );
};

export default Page;

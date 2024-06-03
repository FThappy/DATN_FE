"use client";

import React from "react";
import { userStore } from "@/store/userStore";
import Image from "next/image";
import { sidebarLeft } from "@/lib/placeholder-data";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const user = userStore((state: any) => state?.user);

  const pathname = usePathname().split("/")[2];


  return (
    <div className="w-1/6 pr-4 pl-2 pt-4 flex flex-col gap-4 shadow-beutifull  h-auto bg-white">
      <div className="fixed w-1/6 pr-6">
        <div className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem] mb-2">
          <div className="w-[50px] h-[50px]">
            <Image
              src={user?.img ? user?.img : "/twitter.png"}
              alt="logo-user"
              loading="lazy"
              height={50}
              width={50}
              className="cursor-pointer rounded-full  h-full"
            />
          </div>
          <p className="font-normal text-[1.5rem] text-slate-800 mr-[1rem]">
            {user?.username}
          </p>
        </div>
        <Link
          href={"/social/event-owner?page=0"}
          className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2"
        >
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <FaUser size={24} color={pathname ==="event-owner" ? "#0766FF" : "black"}/>
          </div>
          <p className="font-normal text-[1.2rem] text-slate-800 mr-[1rem]">
            Sự kiện của bạn
          </p>
        </Link>
        <Link
          href={"/social/event-join?page=0"}
          className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2"
        >
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <FaCheckCircle size={24} color={pathname ==="event-join" ? "#0766FF" : "black"}/>
          </div>
          <p className="font-normal text-[1.2rem] text-slate-800 mr-[1rem]">
            Đăng ký tham gia
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

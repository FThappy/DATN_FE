"use client";

import React from "react";
import { userStore } from "@/store/userStore";
import Image from "next/image";
import { sidebarLeft } from "@/lib/placeholder-data";
import Link from "next/link";

const SidebarLeft = () => {
  const user = userStore((state: any) => state?.user);

  return (
    <div className="w-1/4 pr-4 flex flex-col gap-4 ">
      <div className="fixed">
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
        {sidebarLeft.map((item, index) => (
          <Link href={item.href}
            className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem] mb-2"
            key={index}
          >
            <div className="w-[50px] h-[50px]">
              <Image
                src={item.img}
                alt="logo"
                loading="lazy"
                height={60}
                width={100}
                className="cursor-pointer h-full"
              />
            </div>
            <p className="font-normal text-[1.5rem] text-slate-800 mr-[1rem]">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;

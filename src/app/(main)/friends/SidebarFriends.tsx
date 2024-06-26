"use client";

import React from "react";
import { userStore } from "@/store/userStore";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaUsers,FaUser } from "react-icons/fa";
import { RiUserReceivedFill } from "react-icons/ri";
import { RiUserShared2Fill } from "react-icons/ri";
import Link from "next/link";


const Sidebar = () => {
  const user = userStore((state: any) => state?.user);

  const pathname = usePathname().split("/")[2];

  console.log(pathname)

  return (
    <div className="w-[20%] flex flex-col gap-4 shadow-beautiful  h-auto bg-white">
      <div className="fixed w-[20%] px-4 flex flex-col">
        <p className="text-[1.5rem] font-bold mb-2">Bạn bè :</p>
        <Link
          href="/friends/new"
          className="flex gap-2 items-center p-2 w-full hover:bg-gray-200 rounded-[8px]"
          style={{
            backgroundColor: pathname === "new" ? "#E5E7EB" : "white",
          }}
        >
          <div
            className="p-3 rounded-full bg-gray-400"
            style={{
              backgroundColor: pathname === "new" ? "#0766FF" : "#9CA3AF",
            }}
          >
            <FaUsers size={28} color={pathname === "new" ? "white" : "black"} />
          </div>
          <p className="text-[1.2rem] font-medium mb-2">Tìm kiếm bạn mới</p>
        </Link>
        <Link
          href="/friends/list"
          className="flex gap-2 items-center p-2 w-full hover:bg-gray-200 rounded-[8px]"
          style={{
            backgroundColor: pathname === "list" ? "#E5E7EB" : "white",
          }}
        >
          <div
            className="p-3 rounded-full bg-gray-400"
            style={{
              backgroundColor: pathname === "list" ? "#0766FF" : "#9CA3AF",
            }}
          >
            <FaUser size={28} color={pathname === "list" ? "white" : "black"} />
          </div>
          <p className="text-[1.2rem] font-medium mb-2">Bạn bè</p>
        </Link>
        <Link
          href="/friends/share"
          className="flex gap-2 items-center p-2 w-full hover:bg-gray-200 rounded-[8px]"
          style={{
            backgroundColor: pathname === "share" ? "#E5E7EB" : "white",
          }}
        >
          <div
            className="p-3 rounded-full bg-gray-400"
            style={{
              backgroundColor: pathname === "share" ? "#0766FF" : "#9CA3AF",
            }}
          >
            <RiUserShared2Fill
              size={28}
              color={pathname === "share" ? "white" : "black"}
            />
          </div>
          <p className="text-[1.2rem] font-medium mb-2">Lời mời đã gửi</p>
        </Link>
        <Link
          href="/friends/receive"
          className="flex gap-2 items-center p-2 w-full hover:bg-gray-200 rounded-[8px]"
          style={{
            backgroundColor: pathname === "receive" ? "#E5E7EB" : "white",
          }}
        >
          <div
            className="p-3 rounded-full bg-gray-400"
            style={{
              backgroundColor: pathname === "receive" ? "#0766FF" : "#9CA3AF",
            }}
          >
            <RiUserReceivedFill
              size={28}
              color={pathname === "receive" ? "white" : "black"}
            />
          </div>
          <p className="text-[1.2rem] font-medium mb-2">Lời mời đã nhận</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

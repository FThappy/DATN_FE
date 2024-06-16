import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import Image from "next/image";
import { MdEventAvailable } from "react-icons/md";
import { FaFacebookMessenger } from "react-icons/fa";

type Props = {};

const MessengerTopBar = (props: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="h-[60px] w-[60px] cursor-pointer flex gap-2 rounded-full bg-gray-200 items-center justify-center">
          <FaFacebookMessenger size={36} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="mr-4 w-[25rem] h-[calc(100vh-8rem)] z-[100]">
        <div className="p-2 shadow-beautiful rounded-[0.5rem]	">
          {" "}
          <div className="w-full border-b-2 border-gray-300	mt-2 mb-2	"></div>
          <Link href={`/profile`}>
            <button className="text-sky-400 text-[1rem] hover:bg-gray-100 p-2 rounded-[0.8rem] w-full text-left border-none outline-none">
              Xem trang cá nhân
            </button>
          </Link>
        </div>
        <Link
          href={`/profile/change-info`}
          className="w-full h-[50px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-2 rounded-[0.8rem] mt-2 "
        >
          <div className="w-[40px] h-[40px] rounded-full p-2 bg-gray-300 flex justify-center items-center">
            <Image
              src="/gear.png"
              alt="gear"
              loading="lazy"
              height={30}
              width={30}
              className="cursor-pointer  h-full"
            />
          </div>
          <p className="font-bold text-[1.2rem] text-black">
            Cài đặt & quyền riêng tư
          </p>
        </Link>
        <Link
          href={"/profile/event-owner?page=0"}
          className="w-full h-[50px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-2 rounded-[0.8rem] mt-2 "
        >
          <div className="w-[40px] h-[40px] rounded-full p-2 bg-gray-300 flex justify-center items-center">
            <MdEventAvailable size={24} />
          </div>
          <p className="font-bold text-[1.2rem] text-black">Sự kiện của bạn</p>
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default MessengerTopBar;

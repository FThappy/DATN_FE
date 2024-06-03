import React from 'react'
import { User } from "@/utils/typeAuth";
import { GoPersonAdd } from "react-icons/go";

type Props = {
  user: User;
};

const HeadForeignInfo = (props: Props) => {

    const { user } = props;


  return (
    <>
      <div
        className="desktop:h-[15rem] laptop:h-[14rem] flex justify-center items-center absolute z-50 p-1 bg-white rounded-full desktop:w-[15rem] laptop:w-[14rem]
        left-[8rem] bottom-[-12rem] border-inherit	border-2	laptop:bottom-[-8rem] laptop:left-[4rem]
        "
      >
        <img
          src={user.img ? user.img : "/user-default.png"}
          alt="image"
          className="  desktop:w-[14.5rem]  desktop:h-[14.5rem] laptop:h-[13.5rem]
              laptop:w-[13.5rem] rounded-full"
          loading="lazy"
        />
      </div>
      <div className="w-[80%] h-[12rem] absolute bottom-[-12rem] right-0 flex gap-1 justify-between">
        <div className="flex flex-col gap-1 mt-2">
          <p className="font-bold text-[2.5rem]">
            {user.displayname ? user.displayname : user.username}
          </p>
          <p className="font-bold text-[1.5rem] text-gray-400">
            {user.displayname && user.username}
          </p>
        </div>
        <div className="flex gap-2 justify-center items-center mr-4">
          <button className="flex gap-2 justify-center items-center p-2 bg-sky-400	 w-[15rem] rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-sky-600">
            <GoPersonAdd size={24} color="white" />
            <p className="font-bold text-[1rem] text-white">Thêm bạn bè</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default HeadForeignInfo
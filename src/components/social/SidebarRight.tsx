import React from "react";
import Image from "next/image";
import { listFriends } from "@/lib/placeholder-data";

const SidebarRight = () => {
  return (
    <div className=" w-1/4 ml-2">
      <div className="fixed w-1/4 px-2">
      <div className="flex justify-between mb-2 w-full px-2">
        <p className= "text-[1.2rem] font-bold">Người liên hệ :</p>
        <Image
          src="/search.png"
          alt="logo"
          loading="lazy"
          height={40}
          width={30}
          className="cursor-pointer h-full"
        />
      </div>
      {listFriends.map((item,index)=>(
        <div
          className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]"
          key={index}
        >
          <div className="w-[40px] h-[40px]">
            <Image
              src={item.url}
              alt="logo"
              loading="lazy"
              height={40}
              width={40}
              className="cursor-pointer h-full"
            />
          </div>
          <p className="font-normal text-[1.2rem] text-slate-800 mr-[1rem]">
            {item.name}
          </p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SidebarRight;

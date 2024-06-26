import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import React from "react";

import { IoSettingsSharp } from "react-icons/io5";
import { RiUserSettingsFill } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserPen } from "react-icons/fa6";

type Props = {
  pathName: string;
};

const FeatureAuth = (props: Props) => {
  const { pathName } = props;

  return (
    <AccordionItem value="item-1" className="border-none outline-none gap-0">
      <AccordionTrigger className="mb-0 py-0">
        <div className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2">
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <IoSettingsSharp size={24} />
          </div>
          <p className="font-normal text-[1rem] text-slate-800 mr-[1rem]">
            Quyền riêng tư
          </p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-0 px-4">
        <Link
          href={"/profile/change-info"}
          className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2"
        >
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <RiUserSettingsFill
              size={24}
              color={pathName === "change-info" ? "#0766FF" : "black"}
            />
          </div>
          <p className="w-[8rem] font-normal text-[1rem] text-slate-800 mr-[1rem]">
            Chỉnh sửa thông tin cá nhân
          </p>
        </Link>
        <Link
          href={"/profile/change-username"}
          className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2"
        >
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <FaUserPen
              size={24}
              color={pathName === "change-username" ? "#0766FF" : "black"}
            />
          </div>
          <p className="font-normal w-[8rem] text-[1rem] text-slate-800 mr-[1rem]">
            Chỉnh sửa tên đăng nhập
          </p>
        </Link>
        <Link
          href={"/profile/change-email"}
          className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2"
        >
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <RiUserSettingsFill
              size={24}
              color={pathName === "change-email" ? "#0766FF" : "black"}
            />
          </div>
          <p className="font-normal text-[1rem] text-slate-800 mr-[1rem]">
            Chỉnh sửa email
          </p>
        </Link>
        <Link
          href={"/profile/change-pass"}
          className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2"
        >
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <RiLockPasswordFill
              size={24}
              color={pathName === "change-pass" ? "#0766FF" : "black"}
            />
          </div>
          <p className="font-normal text-[1.2rem] text-slate-800 mr-[1rem]">
            Thay đổi mật khẩu
          </p>
        </Link>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FeatureAuth;

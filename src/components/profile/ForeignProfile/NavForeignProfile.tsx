import Image from "next/image";
import React from "react";
import { User } from "@/utils/typeAuth";
import toastifyUtils from "@/utils/toastify";
import HeadForeignInfo from "./HeadForeignInfo";
type Props = {
  user: User;
};


const NavForeignProfile = (props: Props) => {

  const {user} = props

  return (
    <div className=" w-full desktop:h-[48rem] laptop:h-[34rem] bg-white">
      <div className=" w-full desktop:h-[35rem] laptop:h-[25rem] flex justify-center items-center relative ">
        <img
          src={user.wall ? user.wall : "/bg1.jpg"}
          alt="image"
          className="  w-full desktop:h-[35rem] laptop:h-[25rem]"
          loading="lazy"
        />
        <HeadForeignInfo user={user} />
      </div>
    </div>
  );
};

export default NavForeignProfile;

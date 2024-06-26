import React, { useEffect, useState } from "react";
import { User } from "@/utils/typeAuth";
import { GoPersonAdd } from "react-icons/go";
import BtnHeader from "./BtnHeader";
import toastifyUtils from "@/utils/toastify";
import { getTotalLike } from "@/actions/getTotalLike";
import LikeContainer from "@/components/LikeContainer";
import { FaMessage } from "react-icons/fa6";
import { boxChatStore, State } from "@/store/boxChatStore";

type Props = {
  user: User;
};

const HeadForeignInfo = (props: Props) => {
  const { user } = props;

  const [totalLike, setTotalLike] = useState<number>(0);

  const updateBoxChat = boxChatStore((state: State) => state?.updateBoxChat);

  useEffect(() => {
    const totalLike = async () => {
      try {
        const res = await getTotalLike(user._id);
        if (res.code === 0) {
          console.log(res);
          setTotalLike(res.total);
        }
      } catch (error) {
        console.log(error);
        toastifyUtils("error", "Lỗi server");
      }
    };
    totalLike();
  }, [user._id]);

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
          <button
            className="flex gap-2 justify-center items-center p-2 bg-sky-400 w-[15rem] rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-sky-600"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              updateBoxChat(user._id, "person", undefined);
            }}
          >
            <FaMessage size={24} color="white" />
            <div className="flex justify-center gap-2 font-bold text-[1rem] text-white">
              Nhắn tin
            </div>
          </button>
          <BtnHeader user={user} />
          <LikeContainer
            itemId={user._id}
            type="user"
            totalLike={totalLike}
            setTotalLike={setTotalLike}
          />
        </div>
      </div>
    </>
  );
};

export default HeadForeignInfo;

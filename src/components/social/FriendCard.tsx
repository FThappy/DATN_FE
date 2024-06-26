import { getUserPublic } from "@/actions/getInfoUserPublic";
import toastifyUtils from "@/utils/toastify";
import { UserPublic } from "@/utils/typeAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { boxChatStore, State } from "@/store/boxChatStore";

type Props = {
  userId: string;
};

const FriendCard = (props: Props) => {
  const { userId } = props;

  const [user, setUser] = useState<UserPublic>();

  const updateBoxChat = boxChatStore((state: State) => state?.updateBoxChat);

  useEffect(() => {
    const getUserJoin = async (): Promise<void> => {
      try {
        const res = await getUserPublic(userId);
        if (res.code === 3) {
          toastifyUtils("error", "Không tồn tại người dùng");
        }
        setUser(res.data);
      } catch (error) {
        console.log(error);
        toastifyUtils("error", "Lỗi server");
      }
    };
    getUserJoin();
  }, [userId]);
  return (
    <>
      {user ? (
        <button className="flex w-full items-center gap-2" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
          e.preventDefault();
          updateBoxChat(user._id,"person", undefined);
        }}>
          <div className="w-[40px] h-[40px] rounded-full">
            <Image
              src={user?.img ? user.img : "/twitter.png"}
              alt="logo"
              loading="lazy"
              height={40}
              width={40}
              className="cursor-pointer h-full rounded-full border-2"
            />
          </div>
          <p className="font-normal text-[1.2rem] text-slate-800 mr-[1rem]">
            {user?.displayname ? user.displayname : user?.username}
          </p>
        </button>
      ) : (
        <Skeleton className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]" />
      )}
    </>
  );
};

export default FriendCard;

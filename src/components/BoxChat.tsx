"use client";
import React from "react";
import { boxChatStore, State } from "@/store/boxChatStore";
import BoxChatCardContainer from "./BoxChatCardContainer";
import { userStore } from "@/store/userStore";
import { usePathname } from "next/navigation";

type Props = {};

const BoxChat = (props: Props) => {
    const user = userStore((state: any) => state?.user);

      const pathname = usePathname();


  const listBoxChat = boxChatStore((state: State) => state?.listBoxChat);
  return (
    user && pathname !== "/message" && <div className="w-full flex flex-row-reverse	 fixed  bottom-0 px-16 gap-2 z-[49]">
      {listBoxChat &&
        listBoxChat.length > 0 &&
        listBoxChat.slice(0, 3).map((item, index) => (
          <div
            className="h-[28rem] w-[23rem] bg-white flex flex-col rounded-t-[8px] shadow-beutifull pb-2"
            key={index}
          >
            <BoxChatCardContainer roomId={item.idBox} type={item.type} index={index} roomMsg={item.roomMsg} />
          </div>
        ))}
    </div>
    
  );
};

export default BoxChat;

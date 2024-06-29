import { MessageProp, Room } from "@/utils/typeMess";
import React, { useEffect, useState } from "react";
import BoxMessage from "./BoxMessage";
import { useInView } from "react-intersection-observer";

type Props = {
  listMessage: MessageProp[];
  setListMessage: React.Dispatch<React.SetStateAction<MessageProp[]>>;
  handleLoadMoreMess: () => Promise<void>;
  end: boolean;
  setEnd: React.Dispatch<React.SetStateAction<boolean>>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  room: Room | undefined;
  pending: boolean;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatContainer = (props: Props) => {
  const {
    listMessage,
    setListMessage,
    handleLoadMoreMess,
    end,
    setEnd,
    pending,
    setPending,
    isLoading,
    setIsLoading,
    room,
  } = props;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      handleLoadMoreMess();
    }
  }, [inView]);

  return (
    <div className="w-full p-1 flex flex-col-reverse h-[78.5%] desktop:h-[84%] z-[50] laptop:max-h-[78.5%] desktop:max-h-[84%] overflow-y-auto	">
      {listMessage && listMessage.length > 0
        ? listMessage.map((item, index) => (
            <BoxMessage
              item={item}
              listMessage={listMessage}
              setListMessage={setListMessage}
              index={index}
              key={index}
              room={room}
              previousItem={index > 0 ? listMessage[index - 1] : null}
              pending={pending}
              setPending={setPending}
            />
          ))
        : !isLoading && (
            <p className="text-gray-400 text-center">
              - Hãy tạo tin nhắn đầu tiên nào -
            </p>
          )}
      {end && (
        <>
          {!isLoading ? (
            <div className="w-full flex items-center justify-center mb-1 mt-1  ">
              <div className="spinner2" ref={ref}></div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center mb-1 mt-1 ">
              <div className="spinner2"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatContainer;

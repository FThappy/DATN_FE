import { getUserPublic } from "@/actions/getInfoUserPublic";
import { userStore } from "@/store/userStore";
import toastifyUtils from "@/utils/toastify";
import { UserPublic } from "@/utils/typeAuth";
import { MessageProp, Room } from "@/utils/typeMess";
import React, { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { BsThreeDots } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { socket } from "@/utils/requestMethod";
import { InView } from "react-intersection-observer";

type Props = {
  item: MessageProp;
  index: number;
  previousItem: MessageProp | null;
  room: Room | undefined;
  listMessage: MessageProp[];
  setListMessage: React.Dispatch<React.SetStateAction<MessageProp[]>>;
  pending: boolean;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoxMessage = (props: Props) => {
  const { item, index, previousItem, room, setListMessage, listMessage } =
    props;
  const user = userStore((state: any) => state?.user);

  const [receiver, setReceiver] = useState<UserPublic>();

  const [isHide, setIsHide] = useState<boolean>(false);

  const [openPopover, setOpenPopover] = useState(false);

  const [pending, setPending] = useState<boolean>(false);

  const shouldShowAvatar = !previousItem || previousItem.from !== item.from;

  useEffect(() => {
    const getUserJoin = async (): Promise<void> => {
      try {
        const res = await getUserPublic(item.from);
        setReceiver(res.data);
      } catch (error) {
        toastifyUtils("error", "Lỗi server");
      }
    };
    if (shouldShowAvatar) {
      getUserJoin();
    }
  }, [shouldShowAvatar, item.from]);

  const handleDeleteMessage = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setPending(true);
    setOpenPopover(false);
    try {
      socket.emit("delete-message", room?._id, item._id);
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  const handleReadMessage = async () => {
    try {
      socket.emit("read-message", room?._id, item._id);
    } catch (error) {
      console.log(error);
    }
  };

  return user?.id === item.from ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex flex-col gap-1">
          <InView
            as="div"
            onChange={(inView, entry) => {
              if (!item.isRead.includes(user?.id)) {
                handleReadMessage();
              }
            }}
            className="w-full"
          >
            {" "}
            <div
              className="flex w-full justify-end items-end"
              onMouseEnter={(e) => {
                e.preventDefault();
                setIsHide(true);
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                if (!openPopover) {
                  setIsHide(false);
                }
              }}
            >
              {isHide && (
                <Popover open={openPopover} onOpenChange={setOpenPopover}>
                  <PopoverTrigger asChild className="self-center h-full">
                    <div className="flex items-center h-full">
                      <BsThreeDots className="mr-8 " color="gray" />{" "}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[5rem] p-2 ">
                    <div
                      className="p-1 hover:bg-gray-300 rounded-[8px] w-full flex justify-start"
                      onClick={handleDeleteMessage}
                    >
                      Xóa
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              <p className="text-white px-2 py-1 text-[1.05rem] bg-sky-600 rounded-t-[12px] rounded-br-[8px] rounded-bl-[12px] mb-1  w-auto max-w-[75%] break-all">
                {item.content}
              </p>
              {/* <div className="h-4 w-4">
              {shouldShowAvatar && (
                <Avatar className="h-4 w-4">
                  <AvatarImage
                    src={user?.img ? user.img : "/twitter.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
            </div> */}
            </div>
            {/* {pending && (
            <p className="text-red text-[0.8rem] flex w-full justify-end items-end">
              Đang xử lý...
            </p>
          )} */}
          </InView>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-2">
          <p> {user?.displayName ? user.displayName : user?.username}</p>
          <p>
            {format(
              item.createdAt,
              "EEEE, 'ngày' d 'tháng' M 'năm' yyyy 'lúc' HH:mm",
              { locale: vi }
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <InView
            as="div"
            onChange={(inView, entry) => {
              if (!item.isRead.includes(user?.id)) {
                handleReadMessage();
              }
            }}
          >
            <div className="flex w-full justify-start gap-1 items-end">
              <div className="h-4 w-4">
                {shouldShowAvatar && (
                  <Avatar className="h-4 w-4">
                    <AvatarImage
                      src={receiver?.img ? receiver.img : "/twitter.png"}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <p className="text-black px-2 py-1 text-[1.05rem] bg-gray-300 rounded-t-[12px] rounded-br-[12px] rounded-bl-[8px] mb-1   w-auto max-w-[75%] break-all">
                {item.content}
              </p>
            </div>
          </InView>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-2">
          <p>
            {receiver?.displayname ? receiver.displayname : receiver?.username}
          </p>
          <p>
            {format(
              item.createdAt,
              "EEEE, 'ngày' d 'tháng' M 'năm' yyyy 'lúc' HH:mm",
              { locale: vi }
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BoxMessage;

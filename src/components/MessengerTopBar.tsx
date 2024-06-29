import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { FaFacebookMessenger } from "react-icons/fa";
import toastifyUtils from "@/utils/toastify";
import { CardRoom, MessageProp } from "@/utils/typeMess";
import { getMessageCard } from "@/actions/getMessageCard";
import { Skeleton } from "./ui/skeleton";
import MessageCard from "./MessageCard";
import { userStore } from "@/store/userStore";
import { socket } from "@/utils/requestMethod";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { searchRoom } from "@/actions/searchRoom";

type Props = {};

const MessengerTopBar = (props: Props) => {
  const [listRoom, setListRoom] = useState<CardRoom[]>([]);

  const [totalNewMess, setTotalNewMess] = useState<number>(0);

  const user = userStore((state: any) => state?.user);

  const [end, setEnd] = useState<boolean>(false);

  const [qSearch, setQSearch] = useState<string>("");

  const [pendingSearch, setPendingSearch] = useState<boolean>(false);

  useEffect(() => {
    const getRoom = async () => {
      setPendingSearch(true);
      try {
        const res = await getMessageCard();
        if (res.code === 0) {
          setTotalNewMess((prev) =>
            res.data.reduce(
              (total: number, value: CardRoom) =>
                !value?.lastMess?.isRead.includes(user?.id) &&
                value?.lastMess?.isRead &&
                value?.lastMess?.from !== user?.id
                  ? total + 1
                  : total,
              0
            )
          );
          if (res.data.length <= 0) {
            setEnd(true);
          }
          setListRoom(res.data);
        }
        setPendingSearch(false);
      } catch (error) {
        setPendingSearch(false);

        toastifyUtils("error", "Lỗi server");
      }
    };
    if (!qSearch) {
      getRoom();
    }
  }, [qSearch]);

  useEffect(() => {
    const handleRead = (message: MessageProp) => {
      setListRoom((prevRooms) =>
        prevRooms.map((room) =>{
          if (room?.lastMess?._id === message._id) {
            setTotalNewMess((prev) => (prev > 0 ? prev - 1 : 0));

            return {
              ...room,
              lastMess: { ...room.lastMess, isRead: [...message.isRead] },
            };
          }
          return room;
        })
      );
    };

    socket.on("top-message", handleRead);

    return () => {
      socket.off("top-message", handleRead);
    };
  }, [setListRoom]);

  useEffect(() => {
    const handle = (newCardRoom: CardRoom) => {
      if (newCardRoom?.lastMess?.from !== user?.id) {
        setTotalNewMess((prev) => prev + 1);
      }
      setListRoom((prevRooms) => [newCardRoom, ...prevRooms]);
    };

    socket.on("new-card", handle);
    return () => {
      socket.off("new-card", handle);
    };
  }, [setListRoom]);

  useEffect(() => {
    const handle = (lastMessage: MessageProp) => {
      if (lastMessage?.from !== user?.id) {
        const pre = listRoom.find(
          (room) => room?.room?._id === lastMessage?.to
        );
        console.log(pre?.lastMess);
        if (pre?.lastMess?.isRead.includes(user?.id)) {
          setTotalNewMess((prev) => prev + 1);
        }
      }
      setListRoom((prevRooms) => {
        const updatedRoom = prevRooms.find(
          (room) => room?.room?._id === lastMessage?.to
        );
        const otherRooms = prevRooms.filter(
          (room) => room?.room?._id !== lastMessage?.to
        );
        if (updatedRoom) {
          const newRoom = { ...updatedRoom, lastMess: lastMessage };
          console.log(newRoom);
          return [newRoom, ...otherRooms];
        }
        return prevRooms;
      });
    };

    socket.on("new-last", handle);
    return () => {
      socket.off("new-last", handle);
    };
  }, [setListRoom, listRoom]);

  useEffect(() => {
    const handle = (
      lastMessage: MessageProp,
      roomId: string,
      lastId: string
    ) => {
      if (lastMessage?.from !== user?.id) {
        const roomPresent = listRoom.find((room) => room?.room?._id === roomId);
        if (!roomPresent?.lastMess?.isRead.includes(user?.id)) {
          setTotalNewMess((prev) => (prev > 0 ? prev - 1 : 0));
        }
      }
      setListRoom((prevRooms) =>
        prevRooms.map((room) =>
          room?.lastMess?._id === lastId
            ? lastMessage
              ? {
                  ...room,
                  lastMess: lastMessage,
                }
              : {
                  ...room,
                  lastMess: undefined,
                }
            : room
        )
      );
    };

    socket.on("delete-last", handle);
    return () => {
      socket.off("delete-last", handle);
    };
  }, [setListRoom]);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPendingSearch(true);
    try {
      const res = await searchRoom(qSearch);
      if (res.code === 0) {
        if (res.data.length <= 0) {
          setEnd(true);
        }
        setListRoom(res.data);
      }
      setPendingSearch(false);
    } catch (error) {
      setPendingSearch(false);

      toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="h-[60px] w-[60px] cursor-pointer flex gap-2 rounded-full bg-gray-200 items-center justify-center relative">
          <FaFacebookMessenger size={36} />
          {totalNewMess > 0 && (
            <div
              className="absolute top-0 right-0 h-[15px] w-[15px] flex items-center justify-center rounded-full
           bg-red text-white font-medium text-[0.5rem]"
            >
              {totalNewMess}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="mr-4 w-[25rem] h-[calc(100vh-8rem)] z-[100] p-2 flex flex-col gap-2">
        <form
          onSubmit={handleSearch}
          className="flex py-2 bg-gray-300 rounded-[12px]"
        >
          <button
            type="submit"
            className="w-[4rem] h-[2rem] p-2 flex items-center justify-center"
          >
            <IoIosSearch size={28} />
          </button>
          <input
            type="text"
            className="h-[2rem] w-[20rem] p-2 text-[1.1rem] bg-inherit outline-none"
            placeholder="Tìm kiếm......"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setQSearch(e.target.value);
            }}
          />
        </form>
        {!pendingSearch ? (
          <div className="flex flex-col max-h-[85%] overflow-y-auto">
            {listRoom && listRoom.length > 0
              ? listRoom.map((item, index) => (
                  <MessageCard
                    item={item}
                    index={index}
                    key={index}
                    totalNewMess={totalNewMess}
                    setTotalNewMess={setTotalNewMess}
                  />
                ))
              : !end && (
                  <>
                    <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
                    <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
                    <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
                  </>
                )}
          </div>
        ) : (
          <>
            <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
            <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
            <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
          </>
        )}

        <Link
          href="/message"
          className="w-full flex items-center justify-center p-2 font-medium text-[1.2rem] text-sky-300 cursor-pointer"
        >
          - Xem tất cả trong phần chat -
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default MessengerTopBar;

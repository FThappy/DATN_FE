"use client";
import React, { FormEvent, useEffect, useState } from "react";
import SideMessLeft from "./SideMessLeft";
import { socket } from "@/utils/requestMethod";
import { getMessageCard } from "@/actions/getMessageCard";
import { userStore } from "@/store/userStore";
import { CardRoom, MessageProp } from "@/utils/typeMess";
import toastifyUtils from "@/utils/toastify";
import { Skeleton } from "@/components/ui/skeleton";
import MainMess from "./MainMess";
import SideMessRight from "./SideMessRight";
import { searchRoom } from "@/actions/searchRoom";

type Props = {};

const Page = (props: Props) => {
  const [listRoom, setListRoom] = useState<CardRoom[]>([]);

  const [totalNewMess, setTotalNewMess] = useState<number>(0);

  const user = userStore((state: any) => state?.user);

  const [end, setEnd] = useState<boolean>(false);

  const [active, setActive] = useState<CardRoom>();

  const [pending, setPending] = useState<boolean>(false);

  const [qSearch, setQSearch] = useState<string>("");

  const [pendingSearch, setPendingSearch] = useState<boolean>(false);

  useEffect(() => {
    const getRoom = async () => {
      setPending(true);
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
          if (res.data.length >= 0) {
            setActive(res.data[0]);
          }
          setListRoom(res.data);
        }
        setPendingSearch(false);
        setPending(false);
      } catch (error) {
        setPending(false);
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
        prevRooms.map((room) =>
          room?.lastMess?._id === message._id
            ? {
                ...room,
                lastMess: { ...room.lastMess, isRead: [...message.isRead] },
              }
            : room
        )
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
    <div className="flex">
      {!pending ? (
        <>
          {listRoom && listRoom.length > 0 ? (
            <SideMessLeft
              listRoom={listRoom}
              setListRoom={setListRoom}
              end={end}
              totalNewMess={totalNewMess}
              setEnd={setEnd}
              setTotalNewMess={setTotalNewMess}
              active={active}
              setActive={setActive}
              qSearch ={qSearch}
              setQSearch={setQSearch}
              pendingSearch={pendingSearch}
              setPendingSearch={setPendingSearch}
              handleSearch={handleSearch}
            />
          ) : (
            !end && (
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-[3rem] rounded-[8px]" />
                <Skeleton className="w-full h-[3rem] rounded-[8px]" />
                <Skeleton className="w-full h-[3rem] rounded-[8px]" />
              </div>
            )
          )}
          {active && <MainMess active={active} />}
          {active && <SideMessRight active={active} />}
        </>
      ) : (
        <>
          <Skeleton className="w-[22%] h-[39rem] mr-1" />
          <Skeleton className="w-[56%] h-[39rem] mr-1" />
          <Skeleton className="w-[22%] h-[39rem] mr-1" />
        </>
      )}
    </div>
  );
};

export default Page;

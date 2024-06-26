"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import toastifyUtils from "@/utils/toastify";
import { getListFriend } from "@/actions/getListFriend";
import FriendCard from "./FriendCard";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "../ui/skeleton";
import { IoIosSearch } from "react-icons/io";
import { searchUser } from "@/actions/searchUser";

const SidebarRight = () => {
  const [page, setPage] = useState<number>(0);

  const [listFriendId, setListFriendId] = useState<string[]>([]);

  const [endFriend, setEndFriend] = useState<boolean>(true);

  const [endFriendSearch, setEndFriendSearch] = useState<boolean>(true);

  const [qSearch, setQSearch] = useState<string>("");

  const { ref, inView } = useInView();

  const getFriends = async () => {
    try {
      const res = await getListFriend(page);
      if (res.code === 0) {
        if (res.data.length < 10) {
          setEndFriend(false);
        }
        setListFriendId((prev) => [...prev, ...res.data]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  const handleSearch = async () => {
    setEndFriendSearch(true)
    if (!qSearch) {
      return toastifyUtils("warning", "Bạn chưa nhập gi cả");
    }
    try {
      const res = await searchUser(page, qSearch);
      if (res.code === 0) {
        setListFriendId((prev) => [...prev, ...res.data]);
        if (res.data.length < 10) {
          setEndFriendSearch(false);
        }
        setPage((prev)=>prev+1)
      }
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  useEffect(() => {
    if (inView && !qSearch) {
      getFriends();
    }
  }, [inView]);

  return (
    <div className=" w-1/4 ml-2">
      <div className="fixed w-1/4 px-2 overflow-y-scroll  h-[36rem]">
        <div className="flex justify-between mb-2 w-full px-2">
          <p className="text-[1.2rem] font-bold">Người liên hệ :</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="h-[2rem] w-[12rem] bg-white flex items-center "
          >
            <input
              type="text"
              className="h-[2rem] w-[10rem] p-2 text-[0.9rem] outline-none"
              placeholder="Tìm thêm liên hệ.............................."
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setQSearch(e.target.value);
                if (page > 0) {
                  setPage(0);
                }
                if (listFriendId.length > 0) {
                  setListFriendId([]);
                }
              }}
            />
            <button
              type="submit"
              className="w-[2rem] h-[2rem] p-2 flex items-center justify-center"
            >
              <IoIosSearch size={20} />
            </button>
          </form>
        </div>
        {qSearch ? (
          <>
            {listFriendId.length > 0 ? (
              listFriendId.map((item, index) => (
                <div
                  className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem] mt-1"
                  key={index}
                >
                  <FriendCard userId={item} />
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]" />
                <Skeleton className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]" />
                <Skeleton className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]" />
                <Skeleton className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]" />
              </div>
            )}
            {endFriendSearch ? (
              <button
                className="text-center text-[1.2rem] my-4 text-gray-400 font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                - Xem thêm kết quả tìm kiếm -
              </button>
            ) : (
              <p className="text-center text-[1.5rem] my-4 text-gray-400 font-bold">
                - Đã hết danh sách tìm kiếm -
              </p>
            )}
          </>
        ) : (
          <>
            {listFriendId.length > 0 &&
              listFriendId.map((item, index) => (
                <div
                  className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem] mt-1"
                  key={index}
                >
                  <FriendCard userId={item} />
                </div>
              ))}
            {endFriend ? (
              <div className="flex flex-col gap-2" ref={ref}>
                <Skeleton className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]" />
                <Skeleton className="w-full h-[60px] cursor-pointer flex items-center gap-2 hover:bg-gray-300 p-2 rounded-[0.8rem]" />
              </div>
            ) : (
              <p className="text-center text-[1.5rem] my-4 text-gray-400 font-bold">
                - Đã hết bạn bè -
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarRight;

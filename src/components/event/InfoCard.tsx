"use client"
import { getTotalJoinEventById } from "@/actions/getTotalJoinEventById";
import { getUser } from "@/actions/getUser";
import toastifyUtils from "@/utils/toastify";
import { User } from "@/utils/typeAuth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaUser, FaUserFriends } from "react-icons/fa";

type Props = {
  address: string;
  city: string;
  description: string;
  userId: string;
  eventId: string;
  totalJoin: number;
  setTotalJoin: React.Dispatch<React.SetStateAction<number>>;
};

const InfoCard = (props: Props) => {
  const { address, city, description, userId , eventId , totalJoin , setTotalJoin } = props;

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await getUser(userId);
        if (res.code === 3) {
          return notFound();
        }
        if (res.code === 4) {
          throw new Error("Server Error");
        }
        setUser(res.data);
      } catch (error) {
        throw new Error("Server Error");
      }
    };
    getUserData();
  }, [userId]);


    useEffect(() => {
      const getTotal = async () => {
        try {
          const res = await getTotalJoinEventById(eventId);
          if (res.code === 4) {
            toastifyUtils("error", "Lỗi server");
          }
          if (res.code === 0) {
            setTotalJoin(res.data);
          }
        } catch (error) {
          console.log(error);
          return toastifyUtils("error", "Lỗi server");
        }
      };
      getTotal();
    }, [eventId]);

  return (
    <div className="flex shadow-beutifull bg-white p-2 rounded-[8px] px-4 gap-2">
      <div className="w-1/2">
        <p className="font-bold text-[1.2rem]">Chi tiết</p>
        <div className="flex gap-2 items-center mt-4">
          <FaUserFriends size={24} color="gray" />
          <p className="text-[1.2rem]">{totalJoin} Người tham gia</p>
        </div>
        <div className="flex gap-2 items-center mt-4">
          <FaUser size={24} color="gray" />
          <p className="text-[1.2rem]">
            Sự kiện của{" "}
            <Link href={`/profile/${userId}`} className="font-bold">
              {user?.displayname ? user.displayname : user?.username}
            </Link>
          </p>
        </div>
        <div className="flex gap-2 items-center mt-4">
          <FaMapMarkerAlt size={24} color="gray" />
          <p className="text-[1.2rem]">
            {address} , {city}
          </p>
        </div>
        <p className="mt-4">{description}</p>
      </div>
      <div className="w-1/2 border rounded-[8px] h-[23rem] flex flex-col items-center p-2 cursor-pointer hover:bg-gray-200">
        <img
          src={user?.img}
          alt="image"
          className="  w-[14rem] h-[14rem] rounded-full object-cover"
          loading="lazy"
        />
        <p className="font-bold text-[1.2rem] mt-2">
          {user?.displayname ? user.displayname : user?.username}
        </p>
        <p className="text-[1rem] text-gray-400">{user?.email}</p>
        <div className="border-slate-300 w-full h-[1px] border-t-[1px] mt-1"></div>
        <button className="h-[3rem] w-full flex items-center p-2 px-4 gap-2 bg-blue text-white  rounded-[8px] mt-2 justify-center ">
          <Link href={`/profile/${userId}`} className="font-bold text-[1.1rem] ">
            Xem trang cá nhân
          </Link>
        </button>
      </div>
    </div>
  );
};

export default React.memo(InfoCard);

import { User } from '@/utils/typeAuth';
import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { getMonth, getYear } from 'date-fns'; 

type Props = {
  user: User;
};

const Info = (props: Props) => {
  
  const { user } = props

  return (
    <div className="w-[30rem]  bg-white shadow-beutifull rounded-[0.5rem] p-3 mb-2">
      <p className="font-bold text-[1.5rem]">Giới thiệu & Liên lạc :</p>
      <div className="flex justify-center items-center  mt-3 mb-3">
        <MdEmail size={28} color="gray" />
        <p className="text-[1.2rem] w-full ml-3">
          Địa chỉ email : <span className="font-bold">{user.email}</span>{" "}
        </p>
      </div>
      <div className="flex justify-center items-center  mb-3">
        <FaPhoneAlt size={28} color="gray" />
        <p className="text-[1.2rem] w-full ml-3">
          Số điện thoại : <span className="font-bold">{user.phone}</span>{" "}
        </p>
      </div>
      <div className="flex justify-center items-center  mb-3">
        <MdLocationOn size={28} color="gray" />
        <p className="text-[1.2rem] w-full ml-3">
          Địa chỉ liên hệ : <span className="font-bold">{user.address}</span>{" "}
        </p>
      </div>
            <div className="flex justify-center items-center  mb-3">
        <FaClock size={28} color="gray"/>
        <p className="text-[1.2rem] w-full ml-3">Tham gia vào tháng {getMonth(new Date(user.createdAt)) + 1} năm {getYear(new Date(user.createdAt))}</p>
      </div>
    </div>
  );
}

export default Info
"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { userStore } from "@/store/userStore";
import { User } from "@/utils/typeAuth";
import { getUser } from "@/actions/getUser";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { FaCalendar } from "react-icons/fa";
import { format, isEqual } from "date-fns";
import { GrSelect } from "react-icons/gr";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import toastifyUtils from "@/utils/toastify";
import { updateUserInfo } from "@/actions/updateUserInfo";
import { checkValidPhoneNumber } from "@/utils/utilsPhone";

type Props = {};

type DataSend = {
  displayName: string | undefined;
  birth: Date | undefined;
  phone: string | undefined;
  address: string | undefined;
  type: string | undefined;
};

const Page = (props: Props) => {
  const user = userStore((state: any) => state?.user);

  const updateDisplayName = userStore((state: any) => state?.updateDisplayName);

  const [userInfo, setUserInfo] = useState<User>();

  const [pending, setPending] = useState(false);

  const [displayName, setDisplayName] = useState<string>();

  const [address, setAddress] = useState<string>();

  const [phone, setPhone] = useState<string>();

  const [type, setType] = useState<string>();

  const [birth, setBirth] = useState<Date>();

  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await getUser(user?.id);
        if (res.code === 3) {
          router.push("/404");
        }
        if (res.code === 4) {
          throw new Error("Server Error");
        }
        setUserInfo(res.data);
        setDisplayName(res.data.displayname);
        setPhone(res.data.phone);
        setAddress(res.data.address);
        setBirth(res.data.birth);
        setType(res.data.type);
      } catch (error) {
        throw new Error("Server Error");
      }
    };
    if (user) {
      getUserData();
    }
  }, [user?.id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    if (!user) {
      setPending(false);

      return toastifyUtils("warning", "Bạn không đủ quyền");
    }
    if (
      displayName === userInfo?.displayname &&
      phone === userInfo?.phone &&
      type === userInfo?.type &&
      address === userInfo?.address &&
      isEqual(userInfo?.birth!, new Date(birth!))
    ) {
      setPending(false);

      return toastifyUtils("warning", "Thông tin không có gi thay đổi");
    }
    if (phone !== userInfo?.phone) {
      if (!checkValidPhoneNumber(phone!)) {
        setPending(false);

        return toastifyUtils("warning", "Số điện thoại không hợp lệ");
      }
    }
    try {
      const dataSend: DataSend = {
        displayName:
          displayName !== userInfo?.displayname ? displayName : undefined,
        phone: phone !== userInfo?.phone ? phone : undefined,
        birth: !isEqual(userInfo?.birth!, new Date(birth!)) ? birth : undefined,
        type: type !== userInfo?.type ? type : undefined,
        address: address !== userInfo?.address ? address : undefined,
      };
      const res = await updateUserInfo(dataSend);
      if (res.code === 3) {
        setPending(false);

        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 5) {
        setPending(false);

        return toastifyUtils("warning", "Số điện thoại không hợp lệ");
      }
      if (res.code === 4) {
        setPending(false);

        return toastifyUtils("error", "Lỗi server");
      }
      setPending(false);

      setUserInfo(res.data);
      setDisplayName(res.data.displayname);
      setPhone(res.data.phone);
      setAddress(res.data.address);
      setBirth(res.data.birth);
      setType(res.data.type);
      updateDisplayName(res.data.displayname);
      toastifyUtils("success", "Sửa thông tin thành công");
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };

  if (!user) {
    return <p>bạn không đủ quyền</p>;
  } else {
    return userInfo ? (
      <div className="p-2 w-5/6 ">
        <div className="shadow-beautiful w-full h-screen flex flex-col bg-white rounded-[8px]">
          <p className="font-bold text-[1.2rem] px-4 mt-2">
            Chỉnh sửa thông tin cá nhân :
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center justify-center mt-2 gap-2"
          >
            <div className="flex flex-col w-[50rem] gap-1">
              <label className="font-medium text-[1rem]" htmlFor="displayName">
                {" "}
                Tên đại diện :
              </label>
              <div className="flex w-full gap-2 h-[3rem] rounded-[8px]   border-2">
                <div className="flex p-2 border-r-2 border-slate-300 h-full">
                  <FaUser size={24} />
                </div>
                <input
                  type="text"
                  name="displayName"
                  id="displayName"
                  className="p-2 outline-none text-[1.1rem] w-[95%] rounded-r-[8px]"
                  placeholder="Nhập tên hiển thị của bạn"
                  value={displayName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setDisplayName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col w-[50rem] gap-1">
              <label className="font-medium text-[1rem]" htmlFor="phone">
                {" "}
                Số điện thoại :
              </label>
              <div className="flex w-full gap-2 h-[3rem] rounded-[8px]   border-2">
                <div className="flex p-2 border-r-2 border-slate-300 h-full">
                  <FaPhone size={24} />
                </div>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="p-2 outline-none text-[1.1rem] w-[95%] rounded-r-[8px]"
                  placeholder="Nhập số điện thoại của bạn......"
                  value={phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col w-[24.5rem] gap-1">
                <label className="font-medium text-[1rem]" htmlFor="birth">
                  {" "}
                  Ngày thành lập/Ngày sinh :
                </label>
                <div className="flex w-full gap-2 h-[3rem] rounded-[8px]   border-2">
                  <div className="flex p-2 border-r-2 border-slate-300 h-full">
                    <FaCalendar size={24} />
                  </div>
                  <Popover>
                    <PopoverTrigger
                      asChild
                      className="text-[1.1rem] w-[95%] rounded-r-[8px] outline-none"
                    >
                      <div
                        className={
                          "w-full flex justify-start items-center font-normal h-full outline-none"
                        }
                      >
                        {birth ? (
                          format(new Date(birth!), "dd/MM/yyyy")
                        ) : (
                          <span>Chọn ngày thành lập</span>
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={birth}
                        onSelect={setBirth}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex flex-col w-[24.5rem] gap-1">
                <label className="font-medium text-[1rem]" htmlFor="type">
                  {" "}
                  Loại :
                </label>
                <div className="flex w-full gap-2 h-[3rem] rounded-[8px]   border-2">
                  <div className="flex p-2 border-r-2 border-slate-300 h-full">
                    <GrSelect size={24} />
                  </div>
                  <select
                    className="p-2 outline-none text-[1.1rem] w-[95%] rounded-r-[8px]"
                    id="type"
                    name="type"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      e.preventDefault();
                      setType(e.target.value);
                    }}
                    defaultValue={type}
                  >
                    <option value="person">Cá nhân</option>
                    <option value="organization">Tổ chức</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[50rem] gap-1">
              <label className="font-medium text-[1rem]" htmlFor="address">
                {" "}
                Địa chỉ liên hệ :
              </label>
              <div className="flex w-full gap-2 h-[3rem] rounded-[8px]   border-2">
                <div className="flex p-2 border-r-2 border-slate-300 h-full">
                  <IoLocationSharp size={24} />
                </div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="p-2 outline-none text-[1.1rem] w-[95%] rounded-r-[8px]"
                  placeholder="Nhập tên hiển thị của bạn"
                  value={address}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setAddress(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor:
                  displayName === userInfo?.displayname &&
                  phone === userInfo?.phone &&
                  type === userInfo?.type &&
                  address === userInfo?.address &&
                  isEqual(userInfo?.birth!, new Date(birth!))
                    ? "#F84D42"
                    : "#20b86d",
              }}
              disabled={
                displayName === userInfo?.displayname &&
                phone === userInfo?.phone &&
                type === userInfo?.type &&
                address === userInfo?.address &&
                isEqual(userInfo?.birth!, new Date(birth!))
              }
              className={`h-[40px] w-[50rem] mb-2 mt-4 bg-green rounded flex justify-center 
          shadow-beautiful items-center font-bold text-white text-[1.2rem] cursor-pointer
      `}
            >
              {pending ? (
                <>
                  <p>Loading</p>
                  <div className="loader"></div>
                </>
              ) : (
                "Xác nhận"
              )}
            </button>
          </form>
        </div>
      </div>
    ) : (
      <Skeleton className="w-5/6 p-2 h-screen" />
    );
  }
};

export default Page;

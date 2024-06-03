"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { User } from "@/utils/typeAuth";
import toastifyUtils from "@/utils/toastify";
import { changeImage } from "@/actions/changeImage";
import { userStore } from "@/store/userStore";
type Props = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const HeadInfo = (props: Props) => {
  const { user, setUser } = props;

  const updateImage = userStore((state: any) => state?.updateImage);

  const [fileImage, setFileImage] = useState<File | null>();

  const [pending, setPending] = useState(false);

  const handleChangeImage = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setPending(true);

    try {
      const formData = new FormData();
      if (!fileImage || !fileImage.type.startsWith("image/")) {
        return toastifyUtils("warning", "Hiện chỉ hỗ trợ file ảnh");
      }
      formData.append("file", fileImage);
      const res = await changeImage(formData, user._id);
      setPending(false);
      if (res.code === 1) {
        return toastifyUtils("warning", "Hiện chỉ hỗ trợ file ảnh");
      }
      if (res.code === 3) {
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 4) {
        return toastifyUtils("error", "Lỗi server");
      }
      setFileImage(null);
      toastifyUtils("success", "Thay đổi ảnh đại diện thành công");
      user.img = res.data;
      updateImage(res.data);
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <>
      <div
        className="desktop:h-[15rem] laptop:h-[14rem] flex justify-center items-center absolute z-50 p-1 bg-white rounded-full desktop:w-[15rem] laptop:w-[14rem]
        left-[8rem] bottom-[-12rem] border-inherit	border-2	laptop:bottom-[-8rem] laptop:left-[4rem]
        "
      >
        <form className="relative h-full w-full flex justify-center items-center">
          {fileImage ? (
            <Image
              src={URL.createObjectURL(fileImage)}
              alt="image"
              fill={true}
              sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(12.73vw + 118px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
              className=" group-hover:opacity-75 cursor-pointer desktop:w-[14.5rem]  desktop:h-[14.5rem] laptop:h-[10rem] laptop:w-[10rem] rounded-full object-cover"
            />
          ) : (
            <img
              src={user.img ? user.img : "/user-default.png"}
              alt="image"
              className="  desktop:w-[14.5rem]  desktop:h-[14.5rem] laptop:h-[13.5rem]
              laptop:w-[13.5rem] rounded-full"
              loading="lazy"
            />
          )}
          <label
            htmlFor="fileImage"
            className="absolute p-2 bg-gray-300 rounded-full bottom-5 right-4 hover:bg-gray-100 cursor-pointer"
          >
            <FaCamera size={20} />
          </label>
          <input
            id="fileImage"
            name="fileImage"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              setFileImage(e.target.files![0]);
              e.target.files = null;
              e.target.value = "";
            }}
          />
        </form>
      </div>
      <div className="w-[80%] h-[12rem] absolute bottom-[-12rem] right-0 flex gap-1 justify-between ">
        <div className="flex flex-col gap-1 mt-2">
          <p className="font-bold text-[2.5rem]">
            {user.displayname ? user.displayname : user.username}
          </p>
          <p className="font-bold text-[1.5rem] text-gray-400">
            {user.displayname && user.username}
          </p>
        </div>
        <div className="flex gap-2 justify-center items-center mr-4">
          {fileImage && (
            <button
              className="flex gap-2 justify-center items-center p-2 bg-green w-[10rem] rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-green/50
            font-bold text-[1rem] text-white
            "
              onClick={handleChangeImage}
            >
              {pending ? (
                <>
                  <p>Đang lưu</p>
                  <div className="spinner"></div>
                </>
              ) : (
                "Lưu thay đổi"
              )}
            </button>
          )}
          <button className="flex gap-2 justify-center items-center p-2 bg-gray-300 w-[15rem] rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-gray-200">
            <FaPen size={18} />
            <p className="font-bold text-[1rem]">Chỉnh sửa trang cá nhân</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default HeadInfo;

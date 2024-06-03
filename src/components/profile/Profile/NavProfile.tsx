"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { User } from "@/utils/typeAuth";
import toastifyUtils from "@/utils/toastify";
import { changeWall } from "@/actions/changeWall";
import HeadInfo from "./HeadInfo";

type Props = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const NavProfile = (props: Props) => {

  const {user,setUser} = props

  const [file, setFile] = useState<File | null>();

  const [fileImage, setFileImage] = useState<File | null>();

  const [pending, setPending] = useState(false);


  const handleChangeWall = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
        event.preventDefault();
      setPending(true);

    try {
      const formData = new FormData();
      if (!file || !file.type.startsWith("image/")) {
        return toastifyUtils("warning", "Hiện chỉ hỗ trợ file ảnh");
      }
      formData.append("file", file);
      const res = await changeWall(formData, user._id);
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
      setFile(null)
      user.wall = res.data;
      toastifyUtils("success", "Thay đổi ảnh bìa thành công");
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <div className=" w-full desktop:h-[48rem] laptop:h-[34rem] bg-white">
      <div className=" w-full desktop:h-[35rem] laptop:h-[25rem] flex justify-center items-center relative ">
        {file ? (
          <Image
            src={URL.createObjectURL(file)}
            alt="image"
            fill={true}
            sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(12.73vw + 118px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
            className=" group-hover:opacity-75 cursor-pointer "
          />
        ) : (
          <img
            src={user.wall ? user.wall : "/bg1.jpg"}
            alt="image"
            className="  w-full desktop:h-[35rem] laptop:h-[25rem]"
            loading="lazy"
          />
        )}
        <form className="absolute bottom-5 right-10 flex gap-2">
          <label
            htmlFor="fileWall"
            className="flex gap-2 justify-center items-center p-2 bg-gray-300 w-[10rem] rounded-[6px] cursor-pointer"
          >
            <FaCamera size={28} />
            <p className="font-bold text-[0.8rem]">Chỉnh sửa ảnh bìa</p>
          </label>
          <input
            id="fileWall"
            name="fileWall"
            type="file"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files![0]);
              e.target.files = null;
              e.target.value = "";
            }}
          />
          {file && (
            <button
              className="flex gap-2 justify-center items-center p-2 bg-green w-[10rem] rounded-[6px] cursor-pointer font-bold text-[1rem] text-white"
              onClick={handleChangeWall}
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
        </form>
        {file && (
          <button
            className="absolute z-50 right-3 top-4 flex items-center justify-center bg-gray-100 rounded-full p-2  cursor-pointer hover:bg-gray-300"
            onClick={() => setFile(null)}
          >
            <AiOutlineClose size={16} />
          </button>
        )}
        <HeadInfo user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default NavProfile;

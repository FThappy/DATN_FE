"use client"
import React from 'react'
import { DialogClose } from './ui/dialog';
import Image from "next/image";

type Props = {
  pending : boolean;
  handleDelete:()=>Promise<void>;
  type : string;
};

const DeleteSure = (props: Props) => {
  const {pending,handleDelete , type} = props;
  
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex relative w-full justify-center items-center">
        <p className="font-bold text-[1.5rem]">Xóa {type}</p>
        <DialogClose className="absolute right-0 mr-4" asChild>
          <div className="flex w-[40px] h-[40px] p-2 justify-center items-center hover:bg-gray-300 rounded-full">
            {" "}
            <Image
              src="/reject.png"
              alt="reject"
              loading="lazy"
              height={30}
              width={30}
              className="cursor-pointer"
            />
          </div>
        </DialogClose>
      </div>
      <div className=" border-slate-300 w-full h-[10px] border-t-[1px] mt-[0.65rem] "></div>
      <p className="text-[1.2rem] text-gray-400">
        Bạn có chắc chắn muốn xóa {type}
      </p>
      <div className="flex gap-4 justify-center items-center mt-4">
        <DialogClose asChild>
          <button className="p-2 rounded-[6px] bg-red text-white w-[8rem] cursor-pointer">
            Hủy bỏ
          </button>
        </DialogClose>
        <button
          className="p-2 rounded-[6px] bg-green text-white w-[8rem] flex justify-center  cursor-pointer"
          onClick={handleDelete}
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
      </div>
    </div>
  );
}

export default DeleteSure
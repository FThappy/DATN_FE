import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  files: (File | string)[];
  setFiles: React.Dispatch<React.SetStateAction<(File | string)[]>>;
  removeFile: (index: number) => void;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ChangeImagePost = (props: Props) => {
  const { files, setFiles, removeFile, handleChangeFile } = props;
  return (
    <div className="absolute flex flex-col items-center w-full h-[120%] bg-black/75 z-[100000] top-0 left-0 py-4">
      <div className=" w-[80rem] h-[40rem] shadow-beautiful rounded-[0.5rem]	bg-white ">
        <div className="p-2 pt-4 flex items-center w-full justify-center relative">
          <p className="text-[1.5rem] font-bold">Chỉnh sửa ảnh</p>
          <button
            className="flex items-center justify-center bg-[#E8E5ED] rounded-full w-[50px] 
          h-[50px] absolute left-2 cursor-pointer"
            onClick={() => props.setActive(false)}
          >
            <div className="flex items-center justify-center w-[30px] h-[30px]">
              <FaArrowLeft size={24} />
            </div>
          </button>
        </div>
        <div className="border-slate-300 w-full h-[10px] border-t-[1px] mt-[0.65rem]"></div>
        <div className="grid grid-cols-3 gap-2 px-2 h-[30rem] overflow-y-scroll">
          {files.length === 0 && (
            <div
              className="h-full w-full col-span-3 bg-gray-100 rounded-[12px] flex flex-col items-center justify-center hover:bg-gray-300
              "
            >
              <div
                className="flex items-center justify-center bg-gray-200 hover:bg-gray-400 rounded-full w-[50px] 
          h-[50px] "
              >
                <div className="flex items-center justify-center w-[30px] h-[30px]">
                  <Image
                    src="/upload-image.png"
                    alt="logo-user"
                    loading="lazy"
                    height={10}
                    width={30}
                    className="  h-full"
                  />
                </div>
              </div>
              <p className="text-[1.2rem] font-bold">Hãy thêm ảnh/video</p>
            </div>
          )}
          {files.map((file, index) => (
            <div
              key={index}
              className="w-full flex justify-center items-center bg-gray-100 p-2 relative"
            >
              <Image
                src={
                  typeof file === "string" ? file : URL.createObjectURL(file)
                }
                alt="image"
                loading="lazy"
                height={10}
                width={400}
                className="w-[80%]"
              />
              <button
                className="absolute z-50 right-3 top-4 flex items-center justify-center bg-gray-100 rounded-full p-2  cursor-pointer hover:bg-gray-300"
                onClick={() => removeFile(index)}
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="border-slate-300 w-full h-[10px] border-t-[1px] mt-[0.65rem]"></div>
        <div className="flex justify-end gap-2 mr-[1rem]">
          <label htmlFor="file">
            <div className="flex items-center justify-center bg-gray-100 hover:bg-gray-300 w-[180px] h-[50px] gap-1 rounded-[12px] cursor-pointer p-2">
              <Image
                src="/upload-image.png"
                alt="logo-user"
                loading="lazy"
                height={10}
                width={30}
              />
              <p className="font-bold">Thêm ảnh/video</p>
            </div>
          </label>
          <input
            id="file"
            name="file"
            type="file"
            className="hidden"
            multiple
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeFile(e);
            }}
          />
          <button
            className="flex items-center justify-center
                     hover:bg-gray-300 w-[120px] h-[50px] gap-1 rounded-[12px] cursor-pointer p-2 bg-green"
            onClick={() => props.setActive(false)}
          >
            <p className="font-bold text-white text-[1.2rem]">Xong</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeImagePost;

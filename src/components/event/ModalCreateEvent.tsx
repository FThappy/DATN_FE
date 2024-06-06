"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { IoCreateOutline } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { MdDeleteOutline } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { userStore } from "@/store/userStore";
import toastifyUtils from "@/utils/toastify";
import { cityDummy } from "@/lib/placeholder-data";
import FormInputDateEvent from "./FormInputDateEvent";
import { createEvent } from "@/actions/createEvent";
import { useRouter } from "next/navigation";

type Props = {};

const ModalCreateEvent = (props: Props) => {
  const user = userStore((state: any) => state?.user);

  const router = useRouter();

  const today = new Date();

  const [open, setOpen] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const [dateStart, setDateStart] = React.useState<Date>(today);

  const [timeStart, setTimeStart] = useState<number>(today.getTime());

  const [timeEnd, setTimeEnd] = useState<number>(today.getTime());

  const [dateEnd, setDateEnd] = React.useState<Date>(today);

  const [eventName, setEventName] = useState<string>();

  const [city, setCity] = useState<string>();

  const [address, setAddress] = useState<string>();

  const [description, setDescription] = useState<string>();

  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPending(true);
    try {
      if (!eventName || !dateStart || !dateEnd || !city || !address) {
        setPending(false);
        return toastifyUtils("warning", "Thiếu thông tin");
      }
      if (dateStart <= new Date()) {
        setPending(false);
        return toastifyUtils(
          "warning",
          "Ngày bắt đầu và kết thúc không hợp lệ"
        );
      }
      if (dateStart >= dateEnd) {
        setPending(false);
        return toastifyUtils(
          "warning",
          "Ngày bắt đầu và kết thúc không hợp lệ"
        );
      }
      const formData = new FormData();
      formData.append("eventName", eventName);
      formData.append("timeStart", dateStart.toString());
      formData.append("timeEnd", dateEnd.toString());
      formData.append("city", city);
      formData.append("address", address);
      if (description) {
        formData.append("description", description);
      }
      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("file", file); // Sử dụng cùng một tên "files[]" cho tất cả các file
        });
      }
      const res = await createEvent(formData);
      setPending(false);
      if (res.code === 1) {
        return toastifyUtils("warning", "Hiện chỉ hỗ trợ file ảnh");
      }
      if (res.code === 2) {
        return toastifyUtils("warning", "Không đầy đủ thông tin");
      }
      if (res.code === 3) {
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 4) {
        return toastifyUtils("error", "Lỗi server");
      }
      toastifyUtils("success", "Đăng sự kiện thành công");
      router.push(`/event/${res.event._id}`);
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="fixed	 bottom-[1rem] right-[0.5rem]"
          onClick={(e) => {
            if (!user) {
              toastifyUtils(
                "warning",
                "Cần đăng nhập để thực hiện chức năng này"
              );
            }
          }}
        >
          <div className="shadow-beautiful bg-white w-[4rem] h-[4rem] cursor-pointer flex items-center justify-center hover:bg-gray-100 p-2  rounded-full">
            <IoCreateOutline size={24} />
          </div>
        </DialogTrigger>
        <DialogContent
          className="w-[40rem] h-auto shadow-beautiful rounded-[0.5rem]	bg-white p-0 m-0 gap-0"
          // onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="p-2 pt-4 flex items-center w-full justify-center relative">
            <p className="text-[1.5rem] font-bold">Tạo sự kiện</p>
            <button
              className="flex items-center justify-center bg-[#E8E5ED] rounded-full w-[50px] 
          h-[50px] absolute right-2 cursor-pointer"
            >
              <DialogClose asChild>
                <div className="flex items-center justify-center w-[30px] h-[30px]">
                  <Image
                    src="/reject.png"
                    alt="logo-user"
                    loading="lazy"
                    height={10}
                    width={30}
                    className=" rounded-full  h-full"
                  />
                </div>
              </DialogClose>
            </button>
          </div>
          <div className="border-slate-400 w-full h-[1px] border-b-[1px]"></div>
          {files.length > 0 ? (
            <Carousel>
              <CarouselContent className="w-full h-[15rem] ml-0 pl-0">
                {files.map((file, index) => (
                  <CarouselItem key={index} className="ml-0 pl-0 relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="image"
                      className="w-full h-full  cursor-pointer "
                    />
                    <button
                      className="absolute top-2 right-2  cursor-pointer  flex items-center justify-center w-[30px] h-[30px]  rounded-full"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        removeFile(index);
                      }}
                    >
                      <CiCircleRemove
                        color="white"
                        size={32}
                        className="bg-black/40 rounded-full w-[30px] h-[30px]"
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {files.length > 1 ? (
                <>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </>
              ) : (
                <></>
              )}
              <div className="absolute bottom-4 right-4 flex items-center justify-center gap-2">
                {" "}
                <label htmlFor="file">
                  <div className=" flex items-center justify-center bg-black/40 hover:bg-black/75 w-[120px] h-[40px] gap-1 rounded-[8px] cursor-pointer p-2">
                    <LuImagePlus color="white" size={24} />
                    <p className="font-bold text-white">Thêm ảnh</p>
                  </div>
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    const fileList = e.target.files;
                    const fileArray = Array.from(fileList!);
                    setFiles((prevFiles) => [
                      ...(prevFiles || []),
                      ...fileArray,
                    ]);
                    e.target.value = "";
                  }}
                />
                <button
                  className=" flex items-center justify-center bg-black/40 hover:bg-black/75 w-[120px] h-[40px] gap-1 rounded-[8px] cursor-pointer p-2"
                  onClick={() => setFiles([])}
                >
                  <MdDeleteOutline color="white" size={24} />
                  <p className="font-bold text-white">Gỡ tất cả</p>
                </button>
              </div>
            </Carousel>
          ) : (
            <div className="bg-gray-200 w-full h-[15rem] relative">
              <label htmlFor="file">
                <div className="absolute bottom-4 right-4 flex items-center justify-center bg-black/60 hover:bg-black/75 w-[120px] h-[45px] gap-1 rounded-[8px] cursor-pointer p-2">
                  <LuImagePlus color="white" size={24} />
                  <p className="font-bold text-white">Thêm ảnh</p>
                </div>
              </label>
              <input
                id="file"
                name="file"
                type="file"
                className="hidden"
                multiple
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  const fileList = e.target.files;
                  const fileArray = Array.from(fileList!);
                  setFiles((prevFiles) => [...(prevFiles || []), ...fileArray]);
                  e.target.value = "";
                }}
              />
            </div>
          )}
          <div className="w-full h-[60px] cursor-pointer flex items-center gap-2 p-2 px-4  mb-1">
            <div className="w-[50px] h-[50px]">
              <Image
                src={user?.img ? user?.img : "/twitter.png"}
                alt="logo-user"
                loading="lazy"
                height={50}
                width={50}
                className="cursor-pointer rounded-full  h-full"
              />
            </div>
            <div className="flex flex-col ">
              <p className="font-bold text-[1.3rem] text-slate-800 mr-[1rem]">
                {user?.username}
              </p>
              <p className="text-gray-300">Người tổ chức</p>
            </div>
          </div>
          <form className="px-4 flex flex-col items-center  overflow-y-scroll max-h-[18rem]">
            <input
              type="text"
              name="nameEvent"
              id="nameEvent"
              placeholder="Tên sự kiện ...."
              className="p-2  rounded-[8px] w-full border-2 border-gray-400"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEventName(e.target.value);
              }}
            />
            <FormInputDateEvent
              date={dateStart}
              setDate={setDateStart}
              time={timeStart}
              setTime={setTimeStart}
              detail="Ngày bắt đầu"
            />
            <FormInputDateEvent
              date={dateEnd}
              setDate={setDateEnd}
              time={timeEnd}
              setTime={setTimeEnd}
              detail="Ngày kết thúc"
            />

            <select
              className="flex border-2 w-full border-gray-400 items-center justify-center gap-2 rounded-[12px] p-2 mt-2"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setCity(e.target.value);
              }}
              defaultValue={""}
            >
              <option value="" disabled hidden>
                Địa điểm tổ chức
              </option>
              {cityDummy.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Địa điểm cụ thể....."
              className="p-2  rounded-[8px] w-full border-2 border-gray-400 mt-2"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setAddress(e.target.value);
              }}
            />
            <textarea
              placeholder="Hãy mô tả chi tiết về sự kiện"
              className="p-2  rounded-[8px] w-full border-2 border-gray-400 mt-2 max-h-[8rem] min-h-[8rem]"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(e.target.value);
              }}
            />
          </form>
          <div className="border-slate-400 w-full h-[1px] border-b-[1px] mt-1"></div>
          <div className="px-4 flex flex-col items-center shadow-beautiful bg-white  w-full rounded-b-[8px] ">
            <button
              type="submit"
              className="h-[40px] w-[98%] mr-4 mb-2 mt-2 bg-green rounded flex justify-center shadow-beautiful items-center font-bold text-white text-[1.2rem] cursor-pointer"
              disabled={
                !user ||
                !eventName ||
                !dateStart ||
                !dateEnd ||
                !city ||
                !address
              }
              style={{
                backgroundColor:
                  !user ||
                  !eventName ||
                  !dateStart ||
                  !dateEnd ||
                  !city ||
                  !address
                    ? "#F84D42"
                    : "#20b86d",
              }}
              onClick={handleSubmit}
            >
              {pending ? (
                <>
                  <p>Loading</p>
                  <div className="loader"></div>
                </>
              ) : (
                "Đăng sự kiện"
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalCreateEvent;

import React, { ChangeEvent, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { PiShareFatLight } from "react-icons/pi";
import Image from "next/image";
import { PostProps, SharePostProps } from "@/utils/typePost";
import { userStore } from "@/store/userStore";
import toastifyUtils from "@/utils/toastify";
import { createSharePost } from "@/actions/createSharePost";

type Props = {
  itemId: string;
  type: string;
};

const ModalShareEventProject = (props: Props) => {
  const user = userStore((state: any) => state?.user);

  const { itemId, type } = props;

  const [privacy, setPrivacy] = useState<string>("global");

  const [documention, setDocumention] = useState<string>();

  const [pending, setPending] = useState(false);

  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPending(true);

    const dataSend: SharePostProps = {
      document: documention,
      privacy: privacy,
      linkItem: itemId,
      typeShare: type,
    };
    try {
      const res = await createSharePost(dataSend);
      if (res.code === 1) {
            setPending(false);
        return toastifyUtils("warning", "Không tồn tại nội dung chia sẻ");
      }
      if (res.code === 3) {
            setPending(false);
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 4) {
            setPending(false);
        return toastifyUtils("error", "Lỗi server");
      }
      if (res.code == 0) {
            setPending(false);
        toastifyUtils("success", "Share bài thành công");
        setOpen(false)
      }
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="h-[3rem] flex items-center p-2 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] ">
          <PiShareFatLight size={24} color={"#000000"} />
          <p className="font-bold text-[1.1rem]">Chia sẻ {type === "project" ? "dự án" : "sự kiện"}</p>
        </div>
      </DialogTrigger>
      <DialogContent
        className="w-[45rem] h-auto shadow-beautiful rounded-[0.5rem]	bg-white p-0 m-0"
        onInteractOutside={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <div className="pt-1 flex items-center w-full justify-center relative">
          <p className="text-[1.5rem] font-bold">Chia sẻ</p>
          <DialogClose asChild>
            <button
              className="flex items-center justify-center bg-[#E8E5ED] rounded-full w-[40px] 
          h-[40px] absolute right-2 cursor-pointer bottom-[-8px]"
            >
              <div className="flex items-center justify-center w-[25px] h-[25px]">
                <Image
                  src="/reject.png"
                  alt="logo-user"
                  loading="lazy"
                  height={10}
                  width={30}
                  className=" rounded-full  h-full"
                />
              </div>
            </button>
          </DialogClose>
        </div>
        <div className="border-slate-300 w-full h-[1px] border-t-[1px]"></div>
        <form className="flex flex-col items-center">
          <div className="w-full h-[60px] cursor-pointer flex items-center gap-2 p-2  mb-2">
            <div className="h-12 w-12 rounded-full  flex justify-center items-center ">
              <img
                src={user?.img ? user?.img : "/twitter.png"}
                alt="logo-user"
                loading="lazy"
                // height={80}
                // width={80}
                className="cursor-pointer rounded-full w-full h-full"
              />
            </div>
            <div className="flex flex-col ">
              <p className="font-bold text-[1.3rem] text-slate-800 mr-[1rem]">
                {user?.displayName ? user?.displayName : user?.username}
              </p>
              <div className="flex gap-2">
                <p className="flex items-center justify-center bg-[#E8E5ED] rounded-[8px]  text-[0.8rem] font-bold p-2 ">
                  {" "}
                  Bảng tin{" "}
                </p>
                <select
                  className="flex items-center justify-center bg-[#E8E5ED] rounded-[8px]  text-[0.8rem] font-bold p-2 "
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setPrivacy(e.target.value);
                  }}
                >
                  <option value="global">Công khai</option>
                  <option value="private">Riêng tư</option>
                </select>
              </div>
            </div>
          </div>
          <textarea
            placeholder="Hãy nói gi về nội dung này"
            className=" focus:outline-none py-4 px-2 self-start w-[98%] h-auto min-h-[10rem] max-h-[30rem] border-2 rounded-[8px] ml-2"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              e.preventDefault();
              setDocumention(e.target.value);
            }}
          />
          <button
            type="submit"
            className="h-[40px] w-[98%] mt-2 mb-4 bg-green rounded flex justify-center items-center font-bold text-white text-[1.2rem]"
            disabled={pending}
            style={{
              backgroundColor: pending ? "#F84D42" : "#20b86d",
            }}
            onClick={handleSubmit}
          >
            {pending ? (
              <>
                <p>Loading</p>
                <div className="loader"></div>
              </>
            ) : (
              "Chia sẻ"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalShareEventProject;

import React, { ChangeEvent, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { BiSolidCommentError } from "react-icons/bi";
import Image from "next/image";
import { PostProps } from "@/utils/typePost";
import { User } from "@/utils/typeAuth";
import toastifyUtils from "@/utils/toastify";
import { createReport } from "@/actions/createReport";

type Props = {
  postId: string;
  userId: string;
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  children: React.ReactNode;
};

const ReportModal = (props: Props) => {
  const { postId, userId, setOpenPopover, type , children } = props;

  const [open, setOpen] = useState(false);

  const [detail, setDetail] = useState<string>();

  const [reason, setReason] = useState<string[]>([]);

  const [pending, setPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setReason((prevReasons) => [...prevReasons, value]);
    } else {
      setReason((prevReasons) =>
        prevReasons.filter((reason) => reason !== value)
      );
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (reason.length <= 0 && !detail) {
      return toastifyUtils("warning", "Vui lòng nhập đầy đủ thông tin");
    }
    const dataSend = {
      itemId: postId,
      userId: userId,
      type: type,
      reason: reason,
      detail: detail,
    };
        if (!userId) {
          return toastifyUtils(
            "warning",
            "Bạn phải đăng nhập để thực hiện chức năng này"
          );
        }
    setPending(true);
    try {
      const res = await createReport(dataSend);
      setPending(false);
      if (res.code === 1) {
        return toastifyUtils("error", "Không tồn tại sản phẩm này");
      }
      if (res.code === 2) {
        return toastifyUtils("error", "Không tồn tại người dùng");
      }
      if (res.code === 4) {
        return toastifyUtils("error", "Lỗi server");
      }
      toastifyUtils("success", "Gửi báo cáo thành công");
      setOpenPopover(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">
          {/* <button className="w-full h-[50px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-1  rounded-[0.5rem] mt-1 ">
            <BiSolidCommentError size={24} />
            <p className="font-bold text-[1.1rem]">Báo cáo bài viết</p>
          </button> */}
          {children}
        </DialogTrigger>
        <DialogContent
          className="w-[36rem] h-auto shadow-beutifull rounded-[0.5rem]	bg-white p-0 m-0"
          // onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="p-2 pt-4 flex items-center w-full justify-center relative">
            <p className="text-[1.5rem] font-bold">Báo cáo bài viết</p>
            <button
              className="flex items-center justify-center bg-[#E8E5ED] rounded-full w-[50px] 
          h-[50px] absolute right-2 cursor-pointer"
              onClick={() => setOpenPopover(false)}
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
          <div className="border-slate-300 w-full h-[1px] border-t-[1px]"></div>
          <p className="text-[1.5rem] font-bold px-4">Hãy chọn vấn đề</p>
          <p className="text-gray-400 px-4">
            Nếu bạn nhận thấy ai đó đang gây nguy hiểm, đừng chần chừ mà hãy báo
            cáo với chúng tôi.
          </p>
          <form className="flex flex-col items-center px-4">
            <div className="flex w-full justify-between items-center">
              <label htmlFor="checkbox1" className="text-[1.5rem] font-medium	">
                Bạo lực
              </label>
              <input
                type="checkbox"
                id="checkbox1"
                value="Bạo lực"
                className="w-[1rem] h-[1rem]"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex w-full justify-between items-center mt-1">
              <label htmlFor="checkbox2" className="text-[1.5rem] font-medium	">
                Spam
              </label>
              <input
                type="checkbox"
                id="checkbox2"
                value="Spam"
                className="w-[1rem] h-[1rem]"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex w-full justify-between items-center mt-1">
              <label htmlFor="checkbox3" className="text-[1.5rem] font-medium	">
                Ngôn từ gây thù ghét, phân biệt
              </label>
              <input
                type="checkbox"
                id="checkbox3"
                value="Ngôn từ gây thù ghét, phân biệt"
                className="w-[1rem] h-[1rem]"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex w-full justify-between items-center mt-1">
              <label htmlFor="checkbox4" className="text-[1.5rem] font-medium	">
                Thông tin sai sự thật, lừa đảo
              </label>
              <input
                type="checkbox"
                id="checkbox4"
                value="Thông tin sai sự thật, lừa đảo"
                className="w-[1rem] h-[1rem]"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex w-full justify-between items-center mt-1">
              <label htmlFor="checkbox5" className="text-[1.5rem] font-medium	">
                Giả mạo cá nhân, tổ chức hoặc doanh nghiệp
              </label>
              <input
                type="checkbox"
                id="checkbox5"
                value="Giả mạo cá nhân, tổ chức hoặc doanh nghiệp"
                className="w-[1rem] h-[1rem]"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col w-full mb-2">
              <label htmlFor="textarea" className="mb-1 mt-1">
                Thông tin chi tiết hoặc lý do khác(nếu có) :
              </label>
              <textarea
                id="textarea"
                className="border-inherit	border h-[10rem] max-h-[10rem] min-h-[10rem] p-1"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  e.preventDefault();
                  setDetail(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="h-[40px] w-[100%] mb-4 bg-green rounded flex justify-center items-center font-bold text-white text-[1.2rem]"
              disabled={(reason.length <= 0 && !detail) || pending}
              style={{
                backgroundColor:
                  reason.length <= 0 && !detail ? "#F84D42" : "#20b86d",
              }}
              onClick={handleSubmit}
            >
              {pending ? (
                <>
                  <p>Loading</p>
                  <div className="loader"></div>
                </>
              ) : (
                "Gửi báo cáo"
              )}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportModal;

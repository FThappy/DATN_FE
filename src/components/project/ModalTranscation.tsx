import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContentCustom,
  DialogTrigger,
} from "../ui/dialog";
import { MdDelete } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import toastifyUtils from "@/utils/toastify";
import Image from "next/image";
import { createTranscation } from "@/actions/createTranscation";
import { useRouter } from "next/navigation";

type Props = {
  projectId: string;
  userId: string;
};

const ModalTranscation = (props: Props) => {
  const { projectId, userId } = props;

  const [openTranscationModal, setOpenTranscationModal] = useState(false);

  const [amount, setAmount] = useState<number>();

  const [pending, setPending] = useState(false);

  const router = useRouter();

  const handleOpenChange = () => {
    if (!userId) {
      return toastifyUtils(
        "warning",
        "Cần đăng nhập để thực hiện tính năng này"
      );
    } else {
      setOpenTranscationModal(true);
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    if (!amount) {
      toastifyUtils("error", "Hãy nhập đầy đủ thông tin");
    }
    try {
      const res = await createTranscation(projectId, amount!);
      setPending(false);
      if (res.return_code === 1) {
        router.push(`${res.order_url}`);
      }
      if (res.return_code === 2) {
        setPending(false);
        return toastifyUtils("warning", "Tạo giao dịch thất bại");
      }
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <Dialog open={openTranscationModal} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <div className="h-[3rem] flex items-center p-2 px-4 gap-2 bg-blue hover:bg-gray-300 rounded-[8px] ">
          <GiReceiveMoney size={24} color="white" />
          <p className="font-bold text-[1.1rem] text-white">Hỗ trợ ngay</p>
        </div>
      </DialogTrigger>
      <DialogContentCustom className="rounded-[8px] px-0 py-1 w-[28rem] flex flex-col justify-center items-center gap-0">
        <div className="flex relative w-full justify-center items-center">
          <p className="font-bold text-[1.5rem]">Chuyển khoản</p>
          <DialogClose
            className="absolute right-0 mr-4"
            asChild
            onClick={(e) => {
              e.preventDefault();
              setOpenTranscationModal(false);
            }}
          >
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
        <div className=" border-slate-300 w-full h-[1px] border-t-[1px] mt-2"></div>
        <form onSubmit={handleSubmit} className="w-full gap-2 flex p-2 ">
          <div className="flex gap-2 items-center w-[73%] border-gray-300 border-[2px] rounded-[8px] p-1">
            <input
              type="number"
              className="w-[85%] h-[2.4rem] p-2 outline-none"
              placeholder="Nhập vào số tiền bạn muốn chuyển......"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setAmount(e.target.valueAsNumber);
              }}
            />
            <p>VND</p>
          </div>
          <button
            type="submit"
            className="h-[3rem] rounded-[8px] p-2 text-white font-bold flex items-center"
            style={{
              backgroundColor: !amount ? "#F84D42" : "#20b86d",
            }}
          >
            {pending ? (
              <>
                <p>Loading</p>
                <div className="loader"></div>
              </>
            ) : (
              "Chuyển khoản"
            )}
          </button>
        </form>
      </DialogContentCustom>
    </Dialog>
  );
};

export default ModalTranscation;

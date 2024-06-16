import React, { useState } from "react";
import { Dialog, DialogContentCustom, DialogTrigger } from "../ui/dialog";
import { FaTrashCan } from "react-icons/fa6";
import DeleteSure from "../DeleteSure";
import toastifyUtils from "@/utils/toastify";
import { deleteEventById } from "@/actions/deleteEventById";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { deleteProjectById } from "@/actions/deleteProjectById";

type Props = {
  userId: string;
  projectId: string;
};

const ModalDeleteProject = (props: Props) => {
  const { userId, projectId } = props;

  const [pending, setPending] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const router = useRouter();

  const handleDeletePost = async (): Promise<void> => {
    setPending(true);
    try {
      const res = await deleteProjectById(userId, projectId);
      if (res.code === 4) {
        setPending(false);
        toastifyUtils("error", "Lỗi server");
      }
      if (res.code === 3) {
        setPending(false);
        toastifyUtils("error", "Không tồn tại sự kiện này");
      }
      if (res.code === 0) {
        setPending(false);
        setOpenDeleteModal(false);
        router.push(`/project`);
        toastifyUtils("success", "Xóa sự kiện thành công");
      }
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
      <DialogTrigger>
        <div className="h-[3rem] flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] ">
          <MdDelete size={24} />
          <p className="font-bold text-[1.1rem]">Xóa dự án</p>
        </div>
      </DialogTrigger>
      <DialogContentCustom className="rounded-[8px] px-0 py-2 w-[20rem]">
        <DeleteSure
          pending={pending}
          handleDelete={handleDeletePost}
          type="dự án"
        />
      </DialogContentCustom>
    </Dialog>
  );
};

export default ModalDeleteProject;

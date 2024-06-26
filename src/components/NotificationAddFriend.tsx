import { refuseAddFriend } from "@/actions/refuseAddFriend";
import { socket } from "@/utils/requestMethod";
import toastifyUtils from "@/utils/toastify";
import { UserPublic } from "@/utils/typeAuth";
import { NotificationProps } from "@/utils/typeNotification";
import { FriendProps, ReqAddFriendProps } from "@/utils/typeReqAddFriend";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  notification: NotificationProps;
  sender: UserPublic;
  index: number;
  handleRemoveNewNotification: (index: number, type: string) => void;
  type: string;
};

const NotificationAddFriend = (props: Props) => {
  const { sender, notification, index, handleRemoveNewNotification,type } = props;

  const [pending, setPending] = useState<boolean>(false);

  const [pendingRefuse, setPendingRefuse] = useState<boolean>(false);

  const handleAcept = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPending(true);
    if (!sender) {
      setPending(false);
      toastifyUtils("error", "Không tồn tại người dùng này");
      return;
    }
    try {
      setPending(false);
      socket.emit("accept-req-friend", sender._id);
      // Cần thềm một hàm socket ở notification
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  const handleRefuse = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPendingRefuse(true);
    try {
      if (!sender) {
        setPendingRefuse(false);
        toastifyUtils("error", "Không tồn tại người dùng này");
        return;
      }
      const res = await refuseAddFriend(sender._id);
      if (res.code === 0) {
        setPendingRefuse(false);
        socket.emit("remove-notification", sender._id, "addFriend");
      }
      if (res.code === 1) {
        setPendingRefuse(false);
        return toastifyUtils("warning", "Không tồn tại yêu cầu này");
      }
      if (res.code === 3) {
        setPendingRefuse(false);
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 4) {
        setPendingRefuse(false);
        return toastifyUtils("error", "Không đủ quyền");
      }
    } catch (error) {
      setPendingRefuse(false);
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };



  return (
    <div className="flex flex-col gap-2">
      <p>
        <span className="mr-1">
          <Link
            href={`/profile/${sender._id}`}
            className="font-bold text-[1rem]"
          >
            {sender.displayname ? sender.displayname : sender.username}
          </Link>
        </span>
        đã gửi cho bạn một lời mời kết bạn
      </p>
      <div className="flex gap-2 ">
        <button
          className="w-[8rem] h-[2.5rem] flex items-center justify-center rounded-[8px] 
        bg-green text-white font-bold text-[1.2rem] hover:bg-green/75"
          onClick={handleAcept}
        >
          {pending ? (
            <>
              <p>Loading</p>
              <div className="loader"></div>
            </>
          ) : (
            "Chấp nhận"
          )}
        </button>
        <button
          className="w-[8rem] h-[2.5rem] flex items-center justify-center rounded-[8px] 
        bg-red text-white font-bold text-[1.2rem] hover:bg-red/75"
          onClick={handleRefuse}
        >
          {pendingRefuse ? (
            <>
              <p>Loading</p>
              <div className="loader"></div>
            </>
          ) : (
            "Từ chối"
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificationAddFriend;

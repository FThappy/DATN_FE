import { getUserPublic } from "@/actions/getInfoUserPublic";
import toastifyUtils from "@/utils/toastify";
import { UserPublic } from "@/utils/typeAuth";
import { NotificationProps } from "@/utils/typeNotification";
import React, { useEffect, useState } from "react";
import NotificationAddFriend from "./NotificationAddFriend";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { changeIsReadNotification } from "@/actions/changeIsReadNotification";

type Props = {
  notification: NotificationProps;
  index: number;
  handleRemoveNewNotification: (index: number, type: string) => void;
  type: string;
  handleChangeRead: (newNotification: NotificationProps, type: string) => void;
};

const contentForType = (
  notification: NotificationProps,
  sender: UserPublic,
  index: number,
  handleRemoveNewNotification: (index: number, type: string) => void,
  type: string
) => {
  switch (notification.type) {
    case "addFriend":
      return (
        <NotificationAddFriend
          notification={notification}
          sender={sender}
          index={index}
          handleRemoveNewNotification={handleRemoveNewNotification}
          type={type}
        />
      );
    case "acceptFriend":
      return (
        <p>
          <span className="mr-1">
            <Link
              href={`/profile/${sender._id}`}
              className="font-bold text-[1rem]"
            >
              {sender.displayname ? sender.displayname : sender.username}
            </Link>
          </span>
          đã chấp nhận lời mời kết bạn của bạn
        </p>
      );
    default:
      // Xử lý mặc định nếu type không khớp với bất kỳ giá trị nào trên
      break;
  }
};

// eslint-disable-next-line react/display-name
const NotificationCard = React.memo((props: Props) => {
  const {
    notification,
    index,
    handleRemoveNewNotification,
    type,
    handleChangeRead,
  } = props;
  const [sender, setSender] = useState<UserPublic>();

  const getSender = async (): Promise<void> => {
    try {
      const res = await getUserPublic(notification.from);
      setSender(res.data);
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  useEffect(() => {
    getSender();
  }, [notification]);

  const handleChangeIsRead = async () => {
    try {
      const res = await changeIsReadNotification(notification._id);
      if (res.code === 1) {
        return toastifyUtils("warning", "Không đủ thẩm quyền");
      }
      if (res.code === 3) {
        return toastifyUtils("warning", "Không tồn tại thông báo này");
      }
      if (res.code === 4) {
        return toastifyUtils("error", "Không đủ quyền");
      }
      if (res.code === 0) {
        handleChangeRead(res.data ,type);
      }
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  return (
    <>
      {sender ? (
        <div
          className="flex gap-2 hover:bg-gray-200 relative p-2 w-full rounded-[8px] "
          onMouseOver={(e) => {
            e.preventDefault();
            if (notification.type !== "addFriend" && !notification.isRead) {
              handleChangeIsRead();
            }
          }}
        >
          <img
            src={sender?.img ? sender?.img : "/user-default.png"}
            className="rounded-full h-[3.5rem] w-[3.5rem]"
          />
          {contentForType(
            notification,
            sender,
            index,
            handleRemoveNewNotification,
            type
          )}
          {!notification.isRead && (
            <div className="w-[1rem] h-[1rem] bg-blue rounded-full self-center p-2"></div>
          )}
        </div>
      ) : (
        <Skeleton className="w-full h-[3.5rem] rounded-[8px]" />
      )}
    </>
  );
});

export default NotificationCard;

"use client";

import { checkFriend } from "@/actions/checkFriend";
import { checkReqAddFriend } from "@/actions/checkReqAddFriend";
import { deleteAddFriend } from "@/actions/deleteAddFriend";
import { refuseAddFriend } from "@/actions/refuseAddFriend";
import { userStore } from "@/store/userStore";
import { socket } from "@/utils/requestMethod";
import toastifyUtils from "@/utils/toastify";
import { FriendProps, ReqAddFriendProps } from "@/utils/typeReqAddFriend";
import { useEffect, useState } from "react";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import { GoPersonAdd } from "react-icons/go";
import { FaUserXmark } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteFriend } from "@/actions/deleteFriend";
import { friendStore } from "@/store/friendStore";

type Props = {
  userId: string;
};

const BtnCheckFriend = (props: Props) => {
  const { userId } = props;

  const owner = userStore((state: any) => state?.user);

  const [isAddFriend, setIsAddFriend] = useState<ReqAddFriendProps>();

  const [isFriend, setIsFriend] = useState<FriendProps>();

  const [pending, setPending] = useState<boolean>(false);

  const [pendingRefuse, setPendingRefuse] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

    const deleteFriendZus = friendStore((state: any) => state?.deleteFriendZus);

  useEffect(() => {
    const checkAddFriend = async () => {
      if (!userId) {
        toastifyUtils("error", "Không tồn tại người dùng này");
        return;
      }
      try {
        const res = await checkReqAddFriend(userId);
        if (res.code === 0) {
          setIsAddFriend(res.reqAddFriend);

        }
                            setLoading(true);

      } catch (error) {
        console.log(error);
        toastifyUtils("error", "Lỗi server");
      }
    };
    checkAddFriend();
  }, [userId]);

  useEffect(() => {
    const checkIsFriend = async () => {
      if (!userId) {
        toastifyUtils("error", "Không tồn tại người dùng này");
        return;
      }
      try {
        const res = await checkFriend(userId);
        if (res.code === 0) {
          setIsFriend(res.isFriend);
                    setLoading(true);

        }
        
      } catch (error) {
        console.log(error);
        toastifyUtils("error", "Lỗi server");
      }
    };
    checkIsFriend();
  }, [userId]);

  useEffect(() => {
    socket.off("error-req").on("error-req", (error) => {
      setPending(false);

      setPendingRefuse(false);

      return toastifyUtils("error", error.message);
    });

    return () => {
      socket.off("error-req");
    };
  }, []);

  useEffect(() => {
    const handleNewReqAddFriend = (newReqAddFriend: ReqAddFriendProps) => {
      if(userId === newReqAddFriend.to){
      setIsAddFriend(newReqAddFriend);
      setPending(false);
      }
    };

    socket.on("send-req-add-friend", handleNewReqAddFriend);

    return () => {
      socket.off("send-req-add-friend");
    };
  }, [setIsAddFriend]);
  useEffect(() => {
    const handleNewFriend = (newFriend: FriendProps) => {
            if(newFriend.friend.includes(userId)){

      setIsAddFriend(undefined);
      setIsFriend(newFriend);
      setPending(false);
            }
    };

    socket.on("accept-req-friend", handleNewFriend);

    return () => {
      socket.off("accept-req-friend");
    };
  }, [setIsFriend]);

  const handleAddFriend = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setPending(true);
    if (!userId) {
      setPending(false);
      toastifyUtils("error", "Không tồn tại người dùng này");
      return;
    }
    if (!owner) {
      setPending(false);
      toastifyUtils("warning", "Đăng nhập để thực hiện chức năng này");
      return;
    }
    try {
      socket.emit("send-req-add-friend", userId);
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  const handleRejectFriend = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setPending(true);
    try {
      if (!userId) {
        setPending(false);
        toastifyUtils("error", "Không tồn tại người dùng này");
        return;
      }
      const res = await deleteAddFriend(userId);
      if (res.code === 0) {
        setPending(false);
        setIsAddFriend(undefined);
        socket.emit("remove-notification", userId, "addFriend");
      }
      if (res.code === 1) {
        setPending(false);
        return toastifyUtils("warning", "Không tồn tại yêu cầu kết bạn này");
      }
      if (res.code === 3) {
        setPending(false);
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 4) {
        setPending(false);
        return toastifyUtils("error", "Không đủ quyền");
      }
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  const handleAcept = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPending(true);
    if (!userId) {
      setPending(false);
      toastifyUtils("error", "Không tồn tại người dùng này");
      return;
    }
    if (!owner) {
      setPending(false);
      toastifyUtils("warning", "Đăng nhập để thực hiện chức năng này");
      return;
    }
    try {
      socket.emit("accept-req-friend", userId);
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
      if (!userId) {
        setPendingRefuse(false);
        toastifyUtils("error", "Không tồn tại người dùng này");
        return;
      }
      const res = await refuseAddFriend(userId);
      if (res.code === 0) {
        setPendingRefuse(false);
        setIsAddFriend(undefined);
        socket.emit("remove-notification", userId, "addFriend");
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
  const handleDeleteFriend = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setPending(true);
    try {
      if (!userId) {
        setPending(false);
        toastifyUtils("error", "Không tồn tại người dùng này");
        return;
      }
      const res = await deleteFriend(userId);
      if (res.code === 0) {
        setPending(false);
        setIsFriend(undefined);
        deleteFriendZus();
      }
      if (res.code === 1) {
        setPending(false);
        return toastifyUtils("warning", "Không tồn tại mối quan hệ này");
      }
      if (res.code === 3) {
        setPending(false);
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 4) {
        setPending(false);
        return toastifyUtils("error", "Không đủ quyền");
      }
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <>
      {loading ? (
        !isFriend ? (
          !isAddFriend ? (
            <button
              className="flex gap-2 justify-center items-center p-2 bg-sky-400 w-full rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-sky-600"
              onClick={handleAddFriend}
            >
              <GoPersonAdd size={24} color="white" />
              <div className="flex justify-center gap-2 font-bold text-[1rem] text-white">
                {pending ? (
                  <>
                    <p>Loading</p>
                    <div className="loader"></div>
                  </>
                ) : (
                  "Thêm bạn bè"
                )}
              </div>
            </button>
          ) : (
            <>
              {owner?.id === isAddFriend.from && userId === isAddFriend.to && (
                <button
                  className="flex gap-2 justify-center items-center p-2 bg-red w-full rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-red/75"
                  onClick={handleRejectFriend}
                >
                  <FaUserXmark size={24} color="white" />
                  <div className="flex justify-center gap-2 font-bold text-[1rem] text-white">
                    {pending ? (
                      <>
                        <p>Loading</p>
                        <div className="loader"></div>
                      </>
                    ) : (
                      "Hủy lời mời"
                    )}
                  </div>
                </button>
              )}
              {userId === isAddFriend.from && owner?.id === isAddFriend.to && (
                <div className="flex flex-col w-full gap-2 mb-2">
                  <button
                    className="flex gap-2 justify-center items-center w-full p-2 bg-green px-8 rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-green/75"
                    onClick={handleAcept}
                  >
                    <FaUserCheck size={24} color="white" />
                    <div className="flex justify-center gap-2 font-bold text-[1rem] text-white">
                      {pending ? (
                        <>
                          <p>Loading</p>
                          <div className="loader"></div>
                        </>
                      ) : (
                        "Chấp nhận"
                      )}
                    </div>
                  </button>
                  <button
                    className="flex gap-2 justify-center w-full items-center p-2 bg-red px-8 rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-red/75"
                    onClick={handleRefuse}
                  >
                    <FaUserTimes size={24} color="white" />
                    <div className="flex justify-center gap-2 font-bold text-[1rem] text-white">
                      {pendingRefuse ? (
                        <>
                          <p>Loading</p>
                          <div className="loader"></div>
                        </>
                      ) : (
                        "Từ chối"
                      )}
                    </div>
                  </button>
                </div>
              )}
            </>
          )
        ) : (
          <button
            className="flex gap-2 justify-center items-center p-2 bg-red w-full rounded-[6px] cursor-pointer h-[2.5rem] hover:bg-red/75"
            onClick={handleDeleteFriend}
          >
            <FaUserXmark size={24} color="white" />
            <div className="flex justify-center gap-2 font-bold text-[1rem] text-white">
              {pending ? (
                <>
                  <p>Loading</p>
                  <div className="loader"></div>
                </>
              ) : (
                "Hủy kết bạn"
              )}
            </div>
          </button>
        )
      ) : (
        <Skeleton className="w-full rounded-[6px] h-[2.5rem]" />
      )}
    </>
  );
};

export default BtnCheckFriend;

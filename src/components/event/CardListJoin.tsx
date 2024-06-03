import { getUserPublic } from "@/actions/getInfoUserPublic";
import toastifyUtils from "@/utils/toastify";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { Skeleton } from "../ui/skeleton";
import { userStore } from "@/store/userStore";
import { deleteJoinEventByOwner } from "@/actions/deleteJoinEventByOwner";

type Props = {
  userId: string;
  itemId: string;
  joinId: string;
  index: number;
  removeJoin: (index: number) => void;
  ownerId: string;
};
type UserJoin = {
  _id: string;
  username: string;
  img: string;
};
const CardListJoin = (props: Props) => {
  const { userId, itemId, joinId, index, removeJoin, ownerId } = props;

  const [userJoin, setUserJoin] = useState<UserJoin>();

  const user = userStore((state: any) => state?.user);

  const [pending, setPending] = useState(false);

  useEffect(() => {
    const getUserJoin = async (): Promise<void> => {
      try {
        const res = await getUserPublic(userId);
        if (res.code === 3) {
          toastifyUtils("error", "Không tồn tại người dùng");
        }
        setUserJoin(res.data);
      } catch (error) {
        console.log(error);
        toastifyUtils("error", "Lỗi server");
      }
    };
    getUserJoin();
  }, [userId]);

  const handleDeleteByOwner = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!user) {
    setPending(false);
     return toastifyUtils("warning", "Bạn không đủ thẩm quyền");
    }
    setPending(true);
    try {
      const res = await deleteJoinEventByOwner(userId, itemId, user.id);
      if (res.code === 1) {
        setPending(false);
        return toastifyUtils("warning", "Không tồn tại bài viết");
      }
      if (res.code === 5) {
        setPending(false);
        return toastifyUtils("warning", "Không xác thực");
      }
      if (res.code === 2) {
        setPending(false);
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 4) {
        setPending(false);
        return toastifyUtils("error", "Lỗi server");
      }
      removeJoin(index);
      toastifyUtils("success", "Hủy thành công");
      setPending(false);
    } catch (error) {
      setPending(false);
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <div className="w-full h-[60px] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]">
      {userJoin ? (
        <div className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer p-2 rounded-[8px]">
          <Link
            className="w-full flex items-center gap-2"
            href={`/profile/${userJoin?._id}`}
          >
            <div className="w-[40px] h-[40px]">
              {userJoin?.img && (
                <Image
                  src={userJoin?.img}
                  alt="logo"
                  width={40}
                  height={40}
                  loading="lazy"
                  className="cursor-pointer h-full rounded-full"
                />
              )}
            </div>
            <p className="font-normal text-[1.2rem] text-slate-800 mr-[1rem]">
              {userJoin?.username}
            </p>
          </Link>
        </div>
      ) : (
        <Skeleton className="w-[50%] flex items-center gap-2 h-[3rem]" />
      )}
      {ownerId === user?.id && (
        <button
          className="h-[3rem] flex items-center p-4 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] "
          onClick={handleDeleteByOwner}
        >
          {pending ? (
            <>
              <p>Loading</p>
              <div className="loader"></div>
            </>
          ) : (
            <>
              <CiCircleRemove size={24} />
              <p className="font-bold text-[1.1rem]">Hủy tham gia</p>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default CardListJoin;

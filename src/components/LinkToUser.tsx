import { getUserPublic } from "@/actions/getInfoUserPublic";
import toastifyUtils from "@/utils/toastify";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  toUserId: string;
};
type Commenter = {
  _id: string;
  username: string;
  img: string;
  displayname: string;
};

const LinkToUser = (props: Props) => {
  const { toUserId } = props;

  const [toUser, setToUser] = useState<Commenter>();

  const getCommenter = async (): Promise<void> => {
    try {
      const res = await getUserPublic(toUserId);
      if (res.code === 3) {
        toastifyUtils("error", "Không tồn tại người dùng");
      }
      setToUser(res.data);
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  useEffect(() => {
    if (toUserId) {
      getCommenter();
    }
  }, [toUserId]);
  return (
    <Link href={`/profile/${toUserId}`} className="font-bold">
      {toUser?.displayname ? toUser?.displayname : toUser?.username}
    </Link>
  );
};

export default LinkToUser;

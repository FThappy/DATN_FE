import { getUserPublic } from "@/actions/getInfoUserPublic";
import toastifyUtils from "@/utils/toastify";
import { UserPublic } from "@/utils/typeAuth";
import { ProjectProps } from "@/utils/typeProject";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  project: ProjectProps;
};

const CreateBy = (props: Props) => {
  const { project } = props;
  const [user, setUser] = useState<UserPublic>();
  useEffect(() => {
    const getUserJoin = async (): Promise<void> => {
      try {
        const res = await getUserPublic(project.userId);
        // if (res.code === 3) {
        //   toastifyUtils("error", "Không tồn tại người dùng");
        // }
        setUser(res.data);
      } catch (error) {
        console.log(error);
        // toastifyUtils("error", "Lỗi server");
      }
    };
    getUserJoin();
  }, [project.userId]);
  return (
    <p className="flex font-medium items-center">
      Dự án được tạo bởi{" "}
      <span>
        <Link href={`/profile/${user?._id}`}>
          {" "}
          <span className="px-2 font-bold text-[1.2rem] ">
            {user?.displayname ? user.displayname : user?.username}
          </span>
        </Link>
      </span>
    </p>
  );
};

export default CreateBy;

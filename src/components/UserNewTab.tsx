"use client";
import { getUserAuth } from "@/actions/getUserAuth";
import { userStore } from "@/store/userStore";
import toastifyUtils from "@/utils/toastify";
import React, { useEffect } from "react";

type Props = {};

const UserNewTab = (props: Props) => {
  const user = userStore((state: any) => state?.user);

  const updateUser = userStore((state: any) => state?.updateUserAuth);

  useEffect(() => {
    if (!user) {
      const timeoutId = setTimeout(() => {
        const getUserAuthInNewTab = async () => {
          try {
            const res = await getUserAuth();
            // if (res.code === 3) {
            //   return toastifyUtils(
            //     "warning",
            //     "Hết phiên đăng nhập vui lòng đăng nhập lại"
            //   );
            // }
            // if (res.code === 4) {
            //   return toastifyUtils(
            //     "warning",
            //     "Hết phiên đăng nhập vui lòng đăng nhập lại"
            //   );
            // }
            if (res.code === 0) {
              updateUser(res.data);
            }
          } catch (error) {
            console.error("Server Error", error);
          }
        };
        getUserAuthInNewTab();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [user]);
  return <></>;
};

export default UserNewTab;

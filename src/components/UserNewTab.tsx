"use client";
import { getUserAuth } from "@/actions/getUserAuth";
import { boxChatStore } from "@/store/boxChatStore";
import { userStore } from "@/store/userStore";
import toastifyUtils from "@/utils/toastify";
import React, { useEffect } from "react";

type Props = {};

const UserNewTab = (props: Props) => {
  const user = userStore((state: any) => state?.user);

  const updateUser = userStore((state: any) => state?.updateUserAuth);
  const deleteUser = userStore((state: any) => state?.deleteUser);
  const deleteAll = boxChatStore((state: any) => state?.deleteAll);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const getUserAuthInNewTab = async () => {
        try {
          const res = await getUserAuth();
          if (res.code === 3) {
            deleteUser();
            deleteAll();
          }
          if (res.code === 4) {
            deleteUser()
            deleteAll()
          }
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
  }, [user?.id]);
  return <></>;
};

export default UserNewTab;

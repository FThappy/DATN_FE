"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CertaintUser from "../../CertaintUser";
import toastifyUtils from "@/utils/toastify";
import { getUser } from "@/actions/getUser";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";
import { User } from "@/utils/typeAuth";
import { changePass } from "@/actions/changePass";
import CryptoJS from "crypto-js";

type Props = {};

const Page = (props: Props) => {
  const [tokenChange, setTokenChange] = useState<string>("");

  const [pending, setPending] = useState(false);

  const [oldPass, setOldPass] = useState<string>("");

  const [newPass, setNewPass] = useState<string>("");

  const [reNewPass, setReNewPass] = useState<string>("");

  const user = userStore((state: any) => state?.user);

  const [userInfo, setUserInfo] = useState<User>();

  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await getUser(user?.id);
        if (res.code === 3) {
          router.push("/404");
        }
        if (res.code === 4) {
          throw new Error("Server Error");
        }
        setUserInfo(res.data);
      } catch (error) {
        throw new Error("Server Error");
      }
    };
    if (user) {
      getUserData();
    }
  }, [user?.id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    if (!oldPass || !newPass || !reNewPass) {
      setPending(false);
      return toastifyUtils("warning", "Hãy nhập đầy đủ thông tin");
    }
    if (newPass !== reNewPass) {
      setPending(false);
      return toastifyUtils("warning", "Nhập lại mật khẩu mới không đúng");
    }
    const old_password = CryptoJS.AES.encrypt(
      oldPass,
      process.env.NEXT_PUBLIC_KEY_AES
    ).toString();
    const new_password = CryptoJS.AES.encrypt(
      newPass,
      process.env.NEXT_PUBLIC_KEY_AES
    ).toString();

    try {
      const res = await changePass(old_password, new_password, tokenChange);
      if (res.code === 1) {
        setPending(false);
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 3) {
        setPending(false);
        return toastifyUtils("warning", "Không đủ quyền hạn");
      }
      if (res.code === 4) {
        setPending(false);
        return toastifyUtils("error", "Lỗi server");
      }
      if (res.code === 5) {
        setPending(false);
        return toastifyUtils("error", "Mật khẩu cũ không đúng");
      }
      setPending(false);
      toastifyUtils("success", "Thay đổi mật khẩu thành công");
      router.push("/profile/change-info");
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };

  if (!user) {
    return <p>bạn không đủ quyền</p>;
  } else {
    return userInfo ? (
      <div className="p-2 w-5/6 ">
        <div className="shadow-beautiful w-full h-screen flex flex-col bg-white rounded-[8px] items-center">
          {!tokenChange ? (
            <CertaintUser
              email={userInfo.email}
              type="password_reset"
              message="Mã xác thực đổi mật khẩu người dùng"
              setTokenChange={setTokenChange}
            />
          ) : (
            <div className="flex flex-col w-[60%] items-center mt-8">
              <p className={` font-bold text-red text-[5rem] mt-4 mb-2`}>
                Thay đổi tên đăng nhập
              </p>
              <form
                onSubmit={handleSubmit}
                className="gap-1 flex flex-col justify-center items-center w-full"
              >
                <div className="flex items-center bg-white rounded h-[3rem] w-[23rem] p-2 gap-2 mt-1">
                  <input
                    type="password"
                    className="h-[3rem] w-[23rem] focus:outline-none p-2 border-2 border-slate-300 rounded-[8px]"
                    placeholder="Nhập mật khẩu hiện tại....."
                    id="oldPass"
                    name="oldPass"
                    value={oldPass}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      setOldPass(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-center bg-white rounded h-[3rem] w-[23rem] p-2 gap-2 mt-1">
                  <input
                    type="password"
                    className="h-[3rem] w-[23rem] focus:outline-none p-2 border-2 border-slate-300 rounded-[8px]"
                    placeholder="Nhập mật khẩu mới....."
                    id="newPass"
                    name="newPass"
                    value={newPass}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      setNewPass(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-center bg-white rounded h-[3rem] w-[23rem] p-2 gap-2 mt-1">
                  <input
                    type="password"
                    className="h-[3rem] w-[23rem] focus:outline-none p-2 border-2 border-slate-300 rounded-[8px]"
                    placeholder="Nhập lại mật khẩu mới....."
                    id="reNewPass"
                    name="reNewPass"
                    value={reNewPass}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      setReNewPass(e.target.value);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className={`h-[2.5rem] w-[22rem] relative flex items-center justify-center rounded font-bold text-white text-xl  after:absolute after:left-[-5px] after:bottom-[-5px]
      after:border-dashed after:border-[1px]  after:border-green after:z-10 after:visible after:w-full  after:h-[2.3rem] after:rounded 
      after:hover:left-[0px] after:hover:bottom-[0px] after:hover:z-[-20]  bg-green	 animatie  col-span-2	 mx-[9rem] mt-[1rem]
      `}
                  disabled={pending}
                >
                  {pending ? (
                    <>
                      <p>Loading</p>
                      <div className="loader"></div>
                    </>
                  ) : (
                    "Xác nhận"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    ) : (
      <Skeleton className="w-5/6 p-2 h-screen" />
    );
  }
};

export default Page;

"use client";
import { getUser } from "@/actions/getUser";
import { userStore } from "@/store/userStore";
import toastifyUtils from "@/utils/toastify";
import { User } from "@/utils/typeAuth";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CertaintUser from "../../CertaintUser";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { checkNewEmail } from "@/actions/checkNewEmail";
import { checkValidGmail } from "@/utils/utilsEmail";
import { sendOTP } from "../../../../../../actions/sendOTP";
import { updateMail } from "@/actions/updateEmail";

type Props = {};

const Page = (props: Props) => {
  const [certainNewEmail, setCertainNewEmail] = useState(false);

  const [tokenChange, setTokenChange] = useState<string>("");

  const [tokenActiveNewMail, setTokenActiveNewMail] = useState<boolean>(false);

  const [newMail, setNewMail] = useState<string>("");

  const [pending, setPending] = useState(false);

  const [userName, setUserName] = useState<string>("");

  const user = userStore((state: any) => state?.user);

  const [userInfo, setUserInfo] = useState<User>();

  const [newOTP, setNewOTP] = useState<string>("");

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

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setPending(true);
    if (!checkValidGmail(newMail)) {
      setPending(false);
      return toastifyUtils("warning", "Không đúng định dạng email");
    }
    try {
      const res = await checkNewEmail(newMail, "check_new_mail");
      if (res.code === 1) {
        setPending(false);
        return toastifyUtils("warning", "Không tồn tại email");
      }
      if (res.code === 2) {
        setPending(false);
        return toastifyUtils("warning", "Không đúng dạng email");
      }
      if (res.code === 3) {
        setPending(false);
        return toastifyUtils("warning", "Không đủ quyền hạn");
      }
      if (res.code === 6) {
        setPending(false);
        return toastifyUtils("warning", "Email này đã tồn tại ");
      }
      if (res.code === 4) {
        setPending(false);
        return toastifyUtils("error", "Lỗi server");
      }
      if (res.code === 0) {
        setCertainNewEmail(true);
      }
      setPending(false);
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };
  const handleSubmitUpdateEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    if (!checkValidGmail(newMail)) {
      setPending(false);
      return toastifyUtils("warning", "Không đúng định dạng email");
    }
    try {
      const res = await updateMail(newMail, newOTP, "check_new_mail");
      if (res.code === 1) {
        setPending(false);
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 2) {
        setPending(false);
        return toastifyUtils("warning", "Không đúng dạng email");
      }
      if (res.code === 3) {
        setPending(false);
        return toastifyUtils("warning", "Sai mã OTP");
      }
      if (res.code === 4) {
        setPending(false);
        return toastifyUtils("error", "Lỗi server");
      }
      if (res.code === 0) {
        setTokenActiveNewMail(true);
      }
      setPending(false);
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
              type="email_reset"
              message="Mã xác thực đổi email người dùng"
              setTokenChange={setTokenChange}
            />
          ) : !certainNewEmail ? (
            <div className="flex flex-col w-[60%] items-center mt-8">
              <p className={` font-bold text-red text-[5rem] mt-4 mb-2`}>
                Thay đổi email
              </p>
              <p>
                Vui lòng không tải lại trang trong quá trình này nếu không làm
                lại từ đầu
              </p>
              <form
                onSubmit={handleSubmit}
                className="gap-2 flex flex-col justify-center items-center w-full"
              >
                <label htmlFor="email" className="text-white text-[1.3rem] ">
                  Nhập email mới
                </label>
                <div className="flex items-center bg-white rounded h-[3rem] w-[23rem] p-2 gap-2 mt-2">
                  <input
                    type="text"
                    className="h-[3rem] w-[23rem] focus:outline-none p-2 border-2 border-slate-300 rounded-[8px]"
                    placeholder="Nhập email mới....."
                    id="email"
                    name="email"
                    value={newMail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      setNewMail(e.target.value);
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
          ) : !tokenActiveNewMail ? (
            <div className="flex flex-col w-[60%] items-center mt-8">
              <p className={`font-bold text-red text-[5rem] mt-4 mb-2`}>
                Xác thực email mới
              </p>
              <form
                onSubmit={handleSubmitUpdateEmail}
                className="gap-2 flex flex-col justify-center items-center w-full"
              >
                <label htmlFor="otp" className="text-white text-[1.3rem] ">
                  Nhập mã xác thực(OTP)
                </label>
                <div className="flex items-center bg-[#f1eff4d1] rounded h-[2.5rem] w-[22rem] p-2 gap-2 mt-2 border-slate-300 border-2">
                  <Image
                    src="/padlock.png"
                    alt="padlock"
                    loading="lazy"
                    height={30}
                    width={30}
                  />
                  <input
                    type="password"
                    className="h-[2rem] w-[20rem] focus:outline-none p-2"
                    placeholder="Nhập mã xác thực(OTP)"
                    id="otp"
                    name="otp"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      setNewOTP(e.target.value);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className={`h-[2.5rem] w-[22rem] relative flex items-center justify-center rounded font-bold text-white text-xl  after:absolute after:left-[-5px] after:bottom-[-5px]
      after:border-dashed after:border-[1px]  after:border-yellow after:z-10 after:visible after:w-full  after:h-[2.3rem] after:rounded 
      after:hover:left-[0px] after:hover:bottom-[0px] after:hover:z-[-20]  bg-yellow	 animatie  col-span-2	 mx-[9rem] mt-[1rem]
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
              <p className="text-black mt-4">
                Chúng tôi đã gửi otp đến email : {newMail}
              </p>
              <button
                className="text-blue mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                Nhấn để nhận lại
              </button>
            </div>
          ) : (
            <p>Bạn đã đổi email thành công</p>
          )}
        </div>
      </div>
    ) : (
      <Skeleton className="w-5/6 p-2 h-screen" />
    );
  }
};

export default Page;

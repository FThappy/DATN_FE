"use client";
import React from "react";
import { Inter, Dancing_Script } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitButtonForgotPassword } from "./submit-button";
import toastifyUtils from "../../../utils/toastify";
import { authStore } from "@/store/authStore";
import { FormEvent } from "react";
import { checkValidGmail } from "@/utils/utilsEmail";
import { forgotPassword } from "@/actions/forgotPassword";

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const ForgotPassWordPage = () => {
  const router = useRouter();

  const updateEmail = authStore((state: any) => state.updateEmail);

  const handleForgotPassword = async (formData: FormData) => {
    try {
      const data = {
        email: formData.get("email"),
      };
      if (!checkValidGmail(data.email)) {
        return toastifyUtils("warning", "Định dạnh email không hợp lệ");
      }
      const res = await forgotPassword(data.email);
      updateEmail(data.email);
      if (res && res.code === 3) {
        return toastifyUtils("warning", "Lỗi gửi OTP");
      }
      if (res && res.code === 2) {
        return toastifyUtils("warning", "Email không hợp lệ");
      }
      if (res && res.code === 1) {
        return toastifyUtils("warning", "Không tồn tại email này");
      }
      router.push("/browser-otp")
    } catch (error) {
      toastifyUtils("error", "Lỗi Server");
    }
  };

  return (
    <div className="flex flex-col w-[60%] items-center mt-8">
      <p
        className={`${dancing.className} font-bold text-red text-[5rem] mt-4 mb-2`}
      >
        Thay đổi mật khẩu
      </p>

      <form
        action={handleForgotPassword}
        className="gap-2 flex flex-col justify-center items-center w-full"
      >
        <label htmlFor="email" className="text-white text-[1.3rem] ">
          Email
        </label>
        <div className="flex items-center bg-white rounded h-[2.5rem] w-[22rem] p-2 gap-2 mt-2">
          <Image
            src="/padlock.png"
            alt="padlock"
            loading="lazy"
            height={30}
            width={30}
          />
          <input
            type="text"
            className="h-[2rem] w-[20rem] focus:outline-none"
            placeholder="Nhập email bạn sử dụng cho tài khoản"
            id="email"
            name="email"
          />
        </div>
        <SubmitButtonForgotPassword />
      </form>
    </div>
  );
};

export default ForgotPassWordPage;

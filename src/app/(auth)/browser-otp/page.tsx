"use client";
import React from "react";
import { Inter, Dancing_Script } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/authStore";
import { register } from "@/actions/register";
import { SubmitButtonBrowser } from "./submit-button";
import toastifyUtils from "../../../utils/toastify";
import { forgotPassword } from "@/actions/forgotPassword";
import { FormEvent } from "react";
import { browserOTP } from "@/actions/browser-otp";

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const BrowserOTP = () => {

  const router = useRouter();

  const email = authStore((state: any) => state.email);
  const updateToken = authStore((state: any) => state.updateRePassword);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const res = await browserOTP(email, formData, "forgot_password");
      if (res.code === 1) {
        return toastifyUtils("warning", "Email không hợp lệ");
      }
      if (res.code === 2) {
        return toastifyUtils("warning", "Email không tồn tại");
      }
      if (res.code === 3) {
        return toastifyUtils("warning", "OTP không chính xác");
      }
      if (res.code === 0) {
        updateToken(email, res.tokenRePassword);
        router.push("/re-password")
      }
    } catch (error) {
      return toastifyUtils("error", "Lỗi server");
    }
  };

  const handleReSendOTP = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const res = await forgotPassword(email, "forgot_password");
      if (res && res.code === 3) {
        return toastifyUtils("warning", "Lỗi gửi OTP");
      }
      if (res && res.code === 2) {
        return toastifyUtils("warning", "Email không hợp lệ");
      }
      if (res && res.code === 1) {
        return toastifyUtils("warning", "Không tồn tại email này");
      }
      return toastifyUtils("success", "Đã gửi lại otp");
    } catch (error) {
      return toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <div className="flex flex-col w-[60%] items-center mt-8">
      <p
        className={`${dancing.className} font-bold text-red text-[5rem] mt-4 mb-2`}
      >
        Xác thực OTP
      </p>

      <form
        onSubmit={handleSubmit}
        className="gap-2 flex flex-col justify-center items-center w-full"
      >
        <label htmlFor="otp" className="text-white text-[1.3rem] ">
          OTP
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
            type="password"
            className="h-[2rem] w-[20rem] focus:outline-none"
            placeholder="Nhập otp bạn nhận được"
            id="otp"
            name="otp"
          />
        </div>
        <SubmitButtonBrowser />
      </form>
      <p className="text-white mt-4">
        Chúng tôi đã gửi otp đến email : {email}
      </p>
      <button className="text-blue mt-2" onClick={handleReSendOTP}>
        Nhấn để nhận lại
      </button>
    </div>
  );
};

export default BrowserOTP;

"use client";
import React from "react";
import { Inter, Dancing_Script } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/authStore";
import { register } from "@/actions/register";
import { Bounce, toast } from "react-toastify";
import { FormEvent } from "react";
import toastifyUtils from "../../../utils/toastify";
import { sendOTP } from "@/actions/sendOTP";

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const OTPPage = () => {
  const router = useRouter();
  const inforRegister = authStore((state: any) => state.inforRegister);
  const email = authStore((state: any) => state.email);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const res = await register(inforRegister, formData);
      console.log(res)
      if (res.code === 1) {
        return toastifyUtils("error", "OTP không chính xác");
      }
      if (res.code === 2) {
        return toastifyUtils("warning", "Sai định dạng email");
      }
      if (res.code === 5) {
        return toastifyUtils("warning", "Sai định dạng phone");
      }
      if (res.code === 3) {
        return toastifyUtils("warning", "Người dùng này đã tồn tại");
      }
      if (res.code === 6) {
        return toastifyUtils("warning", "Email này đã tồn tại");
      }
      if (res.code === 7) {
        return toastifyUtils("warning", "Không có thông tin người dùng");
      }
      toastifyUtils("success", "Đăng ký thành công");
      router.push("/accessRegister");
    } catch (error) {
      toastifyUtils("error", "Lỗi Server");
    }
  };
  const handleReSendOTP = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const res = await sendOTP(email);
      if (res && res.code === 2) {
        return toastifyUtils("warning", "Định dạnh email không hợp lệ");
      }
      if (res && res.code === 6) {
        return toastifyUtils("warning", "Email này đã được sử dụng");
      }
      return toastifyUtils("success", "Đã gửi lại otp");
    } catch (error) {
      return toast.warning("Lỗi server", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex flex-col w-[60%] items-center mt-8">
      <p
        className={`${dancing.className} font-bold text-red text-[5rem] mt-4 mb-2`}
      >
        Xác thực đăng ký
      </p>

      <form
        onSubmit={handleRegister}
        className="gap-2 flex flex-col justify-center items-center w-full"
      >
        <label htmlFor="otp" className="text-white text-[1.3rem] ">
          Nhập mã xác thực(OTP)
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
            placeholder="Nhập mã xác thực(OTP)"
            id="otp"
            name="otp"
          />
        </div>
        <button
          type="submit"
          className={`h-[2.5rem] w-[22rem] relative flex items-center justify-center rounded font-bold text-white text-xl  after:absolute after:left-[-5px] after:bottom-[-5px]
      after:border-dashed after:border-[1px]  after:border-yellow after:z-10 after:visible after:w-full  after:h-[2.3rem] after:rounded 
      after:hover:left-[0px] after:hover:bottom-[0px] after:hover:z-[-20]  bg-yellow	 animatie  col-span-2	 mx-[9rem] mt-[1rem]
      `}
        >
          Xác nhận
        </button>
      </form>
      <p className="text-white mt-4">
        Chúng tôi đã gửi otp đến email : {email}
      </p>
      <button className="text-blue-400 mt-2" onClick={handleReSendOTP}>
        Nhấn để nhận lại
      </button>
    </div>
  );
};

export default OTPPage;

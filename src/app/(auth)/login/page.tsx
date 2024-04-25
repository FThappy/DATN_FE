"use client";
import React, { useEffect } from "react";
import { Inter, Dancing_Script } from "next/font/google";
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import { login } from "@/actions/auth";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";
import CryptoJS from "crypto-js";
import toastifyUtils from "../../../utils/toastify";

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const LoginPage = () => {
  const router = useRouter();
  const updateUser = userStore((state: any) => state?.updateUser);
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const _password = CryptoJS.AES.encrypt(
      formData.get("password"),
      process.env.NEXT_PUBLIC_KEY_AES
    ).toString();
    const data = {
      username: formData.get("username"),
      password: _password,
    };
    try {
      const result = await login(data);
      if (result.code === 0) {
        updateUser(result);
        router.push("/");
      }
      if (result.code === 1) {
        return toastifyUtils("warning", "Tài khoản không chính xác");
      }
      if (result.code === 3) {
        return toastifyUtils("error", "Lỗi server");
      }
      if (result.code === 2) {
        return toastifyUtils("warning", "Sai mật khẩu hoặc tài khoản");
      }
      if (result.code === 4) {
        return toastifyUtils("warning", "Tài khoản bị khóa");
      }
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi Server");
    }
  };

  return (
    <div className="flex flex-col w-[60%] items-center mt-8">
      <p
        className={`${dancing.className} font-bold text-red text-[5rem] mt-4 mb-2`}
      >
        Login
      </p>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex items-center bg-white rounded h-[2.5rem] w-[25rem] p-2 gap-2">
          <Image
            src="/user.png"
            alt="user"
            loading="lazy"
            height={30}
            width={30}
          />
          <input
            type=" text"
            className={`${styles.inputBorder} h-[2rem] w-[24rem] `}
            placeholder="Tên đăng nhập"
            name="username"
          />
        </div>
        <div className="flex items-center bg-white rounded h-[2.5rem] w-[25rem] p-2 gap-2">
          <Image
            src="/padlock.png"
            alt="padlock"
            loading="lazy"
            height={30}
            width={30}
          />
          <input
            type="password"
            className={`${styles.inputBorder} h-[2rem] w-[24rem]`}
            placeholder="Nhập mật khẩu"
            name="password"
          />
        </div>
        <Link href="/forgotpassword" className="text-white text-end">
          Quên mật khẩu?
        </Link>
        <button
          type="submit"
          className={`h-[2.5rem] w-[25rem] relative flex items-center justify-center rounded font-bold text-white text-xl  after:absolute after:left-[-5px] after:bottom-[-5px]
      after:border-dashed after:border-[1px]  after:border-green after:z-10 after:visible after:w-full  after:h-[2.3rem] after:rounded 
      after:hover:left-[0px] after:hover:bottom-[0px] after:hover:z-[-20]  bg-green	 animatie 
      `}
        >
          Đăng nhập
        </button>
        <div className="flex gap-2 items-center">
          <div className="border-slate-300 w-[11rem] h-[10px] border-t-[1px] mt-[0.65rem]"></div>
          <p className="text-white 	">Hoặc</p>
          <div className="border-slate-300 w-[11rem] h-[10px] border-t-[1px]  mt-[0.65rem]"></div>
        </div>
        <div className="w-[25rem] flex gap-4">
          <button className="bg-white w-[50%] p-1 rounded flex justify-center items-center text-gray-400 gap-2 hover:bg-slate-500/80">
            <Image
              src="/google.png"
              alt="logo-google"
              loading="lazy"
              height={30}
              width={30}
              className="cursor-pointer"
            />
            Google
          </button>
          <button className="bg-white w-[50%] p-1 rounded flex justify-center items-center text-gray-400 gap-2 hover:bg-slate-500/80">
            <Image
              src="/facebook.png"
              alt="logo-facebook"
              loading="lazy"
              height={30}
              width={30}
              className="cursor-pointer"
            />
            Facebook
          </button>
        </div>
      </form>
      <p className="text-white text-center mt-8">Bạn chưa có tài khoản?</p>
      <Link
        href="/register"
        className="text-blue-600 text-center text-[1.2rem]"
      >
        Đăng ký
      </Link>
    </div>
  );
};

export default LoginPage;

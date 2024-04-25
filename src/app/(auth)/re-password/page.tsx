"use client";
import React, { ChangeEvent, useState } from "react";
import { Inter, Dancing_Script } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/authStore";
import { register } from "@/actions/register";
import { FormEvent } from "react";
import toastifyUtils from "../../../utils/toastify";
import CryptoJS from "crypto-js";
import { rePasswordAction } from "@/actions/rePassword";

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const RePassword = () => {
    const router = useRouter();

  const email = authStore((state: any) => state.email);
  const tokenRePassword = authStore((state: any) => state.tokenRePassword);
  const [password, setPassword] = useState<string>();
  const [rePassword, setRepassword] = useState<string>();
  const [pending , setPending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true)
    try {
      if (password !== rePassword) {
        return toastifyUtils("warning", "Nhập lại mật khẩu không chính xác");
      }
      const _password = CryptoJS.AES.encrypt(
        password,
        process.env.NEXT_PUBLIC_KEY_AES
      ).toString();
      const res = await rePasswordAction(email, tokenRePassword, _password);
          setPending(false)

      if (res.code === 1) {
        return toastifyUtils("warning", "Chưa được xác thực");
      }
      if (res.code === 2) {
        return toastifyUtils("warning", "Email không tồn tại");
      }
       toastifyUtils("success", "Mật khẩu đã được thay đổi");
       router.push("/login");

    } catch (error) {
                setPending(false);

      return toastifyUtils("error", "Lỗi server");
    }
  };
  return (
    <div className="flex flex-col w-[60%] items-center mt-8">
      <p
        className={`${dancing.className} font-bold text-red text-[5rem] mt-4 mb-2`}
      >
        Thay đổi lại mật khẩu
      </p>

      <form
        onSubmit={handleSubmit}
        className="gap-2 flex flex-col justify-center items-center w-full"
      >
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
            placeholder="Nhập mật khẩu mới"
            id="password"
            name="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
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
            placeholder="Nhập lại mật khẩu"
            id="rePassword"
            name="rePassword"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRepassword(e.target.value)
            }
          />
        </div>
        <button
          type="submit"
          className={`h-[2.5rem] w-[22rem] relative flex items-center justify-center rounded font-bold text-white text-xl  after:absolute after:left-[-5px] after:bottom-[-5px]
      after:border-dashed after:border-[1px]  after:border-red after:z-10 after:visible after:w-full  after:h-[2.3rem] after:rounded 
      after:hover:left-[0px] after:hover:bottom-[0px] after:hover:z-[-20]  bg-red	 animatie  col-span-2	 mx-[9rem] mt-[1rem]
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
  );
};

export default RePassword;

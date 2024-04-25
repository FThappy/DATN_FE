import React from 'react'
import { Inter, Dancing_Script } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });


const page = () => {
  return (
    <div className="flex flex-col w-[60%] mt-8  items-center">
      <p
        className={`${dancing.className} font-bold text-green text-[5rem] mt-4 mb-2`}
      >
        Terms & Privacy
      </p>
      <p className='text-white text-[1.5rem]'>Chúc mừng bạn hoàn tất việc đăng ký</p>
      <p className='text-white text-[1.5rem]'>Bằng cách nhấn vào Đăng nhập, bạn đồng ý với chúng tôi</p>
      <p className='text-white text-[1.5rem]'> Điều khoản, Chính sách dữ liệu và Chính sách cookie</p>
      <Link href="/login" className="text-blue-600 text-center text-[2rem]">
        Đăng nhập
      </Link>
    </div>
  );
}

export default page
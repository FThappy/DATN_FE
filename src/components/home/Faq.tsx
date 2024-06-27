import Image from 'next/image';
import React from 'react'
import IconMove from '../utils/IconMove';
import { Inter, Dancing_Script } from "next/font/google";
import TextUnderline from '../utils/TextUnderline';
import TabBarFAQ from './ui/TabBarFAQ';

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const Faq = () => {
  return (
    <div className="flex w-full justify-center  h-[820px] bg-slate-50 px-12">
      <div className="flex    h-full gap-8 mt-12 relative">
        <IconMove width={50} top="-3rem" left="-2.5rem" />
        <div className="flex flex-col gap-4 ">
          <Image
            src="/about1.webp"
            alt="about1"
            loading="lazy"
            height={85}
            width={280}
            className=""
          />
          <Image
            src="/about3.webp"
            alt="about3"
            loading="lazy"
            height={60}
            width={280}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Image
            src="/cause3.webp"
            alt="about2"
            loading="lazy"
            height={100}
            width={300}
          />
          <Image
            src="/about3.webp"
            alt="about3"
            loading="lazy"
            height={60}
            width={300}
          />
        </div>
      </div>
      <div className="flex flex-col mt-12 laptop:ml-6 desktop:ml-[8rem]">
        <p className={`${dancing.className} font-bold text-red text-4xl mb-2`}>
          Faq
        </p>
        <p
          className={`${inter.className} font-bold text-slate-800 text-[3rem] mb-8`}
        >
          Chúng tôi đã 
          <TextUnderline
            chilldren=" giúp bạn "
            width={240}
            top="3.2rem"
            left="1rem"
          />
          như thế nào ?
        </p>
        <p
          className={`${inter.className}  text-neutral-800 mb-1 text-[1.2rem] w-[35rem]`}
        >
          Chúng tôi cung cấp một mạng xã hội thiện nguyện đến với mọi người. Nơi mọi người có thể chia sẻ các hoạt động, tạo dự án, sự kiện cho riêng mình và chia sẻ nó đến với mọi người xung quanh
        </p>
        <TabBarFAQ />
      </div>
    </div>
  );
}

export default Faq
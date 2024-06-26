import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { MdEventNote } from "react-icons/md";

type Props = {
    pathName : string;
}

const FeatureEvent = (props: Props) => {

  const {pathName} = props;

  return (
    <AccordionItem value="item-2" className='border-none outline-none gap-0'>
      <AccordionTrigger className="mb-0 py-0">
        <div
          className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2"
        >
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <MdEventNote
              size={24}
            />
          </div>
          <p className="font-normal text-[1.2rem] text-slate-800 mr-[1rem]">
            Sự kiện 
          </p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-0 px-4">
        <Link
          href={"/profile/event-owner?page=0"}
          className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2"
        >
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <FaUser
              size={24}
              color={pathName === "event-owner" ? "#0766FF" : "black"}
            />
          </div>
          <p className="font-normal text-[1.2rem] text-slate-800 mr-[1rem]">
            Sự kiện của bạn
          </p>
        </Link>
        <Link
          href={"/profile/event-join?page=0"}
          className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2"
        >
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <FaCheckCircle
              size={24}
              color={pathName === "event-join" ? "#0766FF" : "black"}
            />
          </div>
          <p className="font-normal text-[1.2rem] text-slate-800 mr-[1rem]">
            Đăng ký tham gia
          </p>
        </Link>
      </AccordionContent>
    </AccordionItem>
  );
}

export default FeatureEvent
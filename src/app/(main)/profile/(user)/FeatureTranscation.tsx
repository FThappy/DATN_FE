import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import React from "react";
import { GiPayMoney } from "react-icons/gi";

type Props = {
  pathName: string;
};

const FeatureTranscation = (props: Props) => {
  const { pathName } = props;

  return (
    <AccordionItem value="item-4" className="border-none outline-none gap-0">
      <AccordionTrigger className="mb-0 py-0">
        <div className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2">
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <GiPayMoney size={24} />
          </div>
          <p className="font-normal text-[1.2rem] text-slate-800 mr-[1rem]">
            Giao dịch
          </p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-0 px-4">
        <Link
          href={"/profile/transcation"}
          className="w-full h-[60px] cursor-pointer flex items-center gap-1 hover:bg-gray-300 pl-2 rounded-[0.8rem] mb-2"
        >
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-200">
            <GiPayMoney
              size={24}
              color={pathName === "transcation" ? "#0766FF" : "black"}
            />
          </div>
          <p className="font-normal text-[1.2rem] text-slate-800 mr-[1rem]">
            Lịch sử giao dịch
          </p>
        </Link>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FeatureTranscation;

import Image from "next/image";
import React from "react";
import { Inter, Dancing_Script } from "next/font/google";
import "./UrgentCauseCard.css";
import ButtonHome from "../../utils/ButtonHome/ButtonHome";

type CauseProp = {
  title: string;
  description: string;
  raised: number;
  goal: number;
  url: string;
};
const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const UrgentCauseCard = ({ cause,color }: { cause: CauseProp,color : string }) => {
  return (
    <div className="bg-white w-[320px] h-full rounded p-4 flex flex-col ">
      <Image
        src={cause.url}
        alt="logo"
        loading="lazy"
        height={180}
        width={280}
        className="self-center"
      />
      <p
        className={`${inter.className} font-bold text-slate-800 text-[1.2rem]  mt-3`}
      >
        {cause.title}
      </p>
      <p className={`${inter.className}  text-neutral-800   mt-3`}>
        {cause.description}
      </p>
      <div className=" w-full  flex justify-between mt-3">
        <p className={`${inter.className} font-bold text-gray-600 `}>
          Raised : ${cause.raised}
        </p>
        <p className={`${inter.className} font-bold text-gray-600 `}>
          Goal : ${cause.goal}
        </p>
      </div>
      <div className="bg-gray-200 w-full h-[10px] rounded-full mt-6 flex">
        <div
          className=" h-[10px] rounded-full  flex justify-end items-center progress-bar-striped progress-bar-animated"
          style={{
            width: `${(cause.raised / cause.goal) * 100}%`,
            backgroundColor: `${color}`,
          }}
        >
          <div
            className=" w-[20px] h-[20px] rounded-full flex justify-center items-center "
            style={{
              backgroundColor: `${color}`,
            }}
          >
            <span className="bg-white w-[10px] h-[10px] rounded-full"></span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <ButtonHome link="/" title="DONATION NOW" width="14" color={color} />
      </div>
    </div>
  );
};

export default UrgentCauseCard;

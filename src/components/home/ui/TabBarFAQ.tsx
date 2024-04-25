"use client";

import React, { useState } from "react";
import { Inter, Dancing_Script } from "next/font/google";
import { tabFAQ } from "@/lib/placeholder-data";

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const TabBarFAQ = () => {


  const [isActive, setIsActive] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex border-inherit	border-b-2	p-4"></div>
      {tabFAQ.map((item, index) => (
        <div
          key={index}
          className="flex flex-col  border-inherit border-b-2	p-2"
        >
          <div className="flex items-center mb-4">
            <button
              className={`  ${
                inter.className
              }  border-2  rounded-full w-[3rem] h-[3rem] text-[1.5rem] flex items-center justify-center
          ${
            isActive === index
              ? "text-red border-red"
              : "text-gray-400 border-inherit"
          }
          `}
          onClick={()=>setIsActive(index)}
            >
              {isActive === index ? "-" : "+"}
            </button>
            <p
              className={`${inter.className} font-bold text-slate-800 text-[2rem] ml-4 `}
            >
              {item.title}
            </p>
          </div>
          <p
            className={`${
              inter.className
            }  text-neutral-800 mb-8 text-[1.2rem] w-[35rem]  ${
              isActive === index ? "block" : " hidden"
            }`}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
            voluptatem obcaecati consectetur adipisicing
          </p>
        </div>
      ))}
    </div>
  );
};

export default TabBarFAQ;

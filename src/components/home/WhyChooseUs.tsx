import React from "react";
import { Inter, Dancing_Script } from "next/font/google";
import TextUnderline from "../utils/TextUnderline";
import TabBarWhyChooseUs from "./ui/TabBarWhyChooseUs";
import Image from 'next/image';
import IconMove from "../utils/IconMove";

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const WhyChooseUs = () => {
  return (
    <div
      className="w-full h-[690px] bg-cover "
      style={{ backgroundImage: "url(/bg3.jpg)" }}
    >
      <div className="flex items-center w-full h-[690px] bg-black/80 px-[3rem] py-8 gap-2 justify-center desktop:px-[12rem]">
        <div className="flex flex-col h-full justify-center p-4 laptop:w-1/2 desktop:w-auto">
          <p
            className={`${dancing.className} font-bold text-red text-4xl mb-1`}
          >
            Why Choose Us
          </p>
          <p
            className={`text-white text-[3.3rem] font-bold	${inter.className} pr-8 mb-10   desktop:w-[45rem]`}
          >
            Trusted Non Profit Donation
            <TextUnderline
              chilldren=" Center"
              width={180}
              top="3.2rem"
              left="1.2rem"
            />
          </p>
          <TabBarWhyChooseUs />
        </div>
        <div className="flex items-center justify-center laptop:w-1/2 desktop:w-auto p-4 relative ">
          <Image
            src="/event2.webp"
            alt="event2"
            loading="lazy"
            height={300}
            width={600}
            className="rounded-[12px] z-40"
            style={{ clipPath: "polygon(0 0,100% 0,100% 100%,0 90%)" }}
          />
          <IconMove width={50} top="-3rem" left="-2.5rem" />
          <span
            className="absolute border-dotted border-2 border-yellow desktop:h-[400px] desktop:w-[600px] rounded-[12px] desktop:bottom-[-4px] desktop:left-[4rem] 
            laptop:h-[350px] laptop:w-[550px]
            "
            style={{ transform: "skewY(3deg)" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

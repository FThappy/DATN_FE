import Image from "next/image";
import React from "react";
import { Inter, Dancing_Script } from "next/font/google";
import TextUnderline from "../utils/TextUnderline";
import { event } from "@/lib/placeholder-data";

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const OurEvent = () => {
  return (
    <div className="w-full  h-[950px] bg-slate-50 flex flex-col justify-center items-center">
      <p className={`${dancing.className} font-bold text-red text-4xl mb-4 `}>
        Our Event
      </p>
      <p
        className={`${inter.className} font-bold text-slate-800 text-4xl  mb-8`}
      >
        Our
        <TextUnderline
          chilldren=" Upcoming Event"
          width={300}
          top="2.5rem"
          left="0.6rem"
        />
      </p>
      <p
        className={`${inter.className}  text-neutral-800  w-[40rem] text-[1.3rem] text-center mb-8`}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem
        voluptatem obcaecati consectetur adipisicing
      </p>
      <div className="grid grid-cols-3 gap-4 items-center  justify-center  w-[65rem]">
        {event.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-cover rounded-[12px] w-[20rem] h-[20rem] "
            style={{ backgroundImage: "url(/event6.webp)" }}
          >
            <div
              className="w-full h-full opacity-[0] hover:opacity-[1] flex flex-col justify-end items-center pb-12 cursor-pointer"
              style={{
                background:
                  "linear-gradient(179.98deg,rgba(37,41,47,.613) 15.88%,rgba(248,77,66,.84) 62.28%)",
              }}
            >
              <p
                className="font-semibold
                 text-white text-[2rem]"
              >
                {item.title}
              </p>
              <div className="flex w-full justify-center mt-4 gap-4">
                <div className="flex items-center gap-1">
                  <Image
                    src="/clock.png"
                    alt="clock"
                    loading="lazy"
                    height={25}
                    width={25}
                  />
                  <p
                    className="
                  text-white text-[1.2rem]"
                  >
                    {item.time}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Image
                    src="/pin.png"
                    alt="pin"
                    loading="lazy"
                    height={25}
                    width={25}
                  />
                  <p
                    className="
                     text-white text-[1.2rem]"
                  >
                    {item.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurEvent;

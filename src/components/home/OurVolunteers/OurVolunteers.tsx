import React from "react";
import Image from "next/image";
import "./ourVolunteers.css";

import { Inter, Dancing_Script } from "next/font/google";
import TextUnderline from "../../utils/TextUnderline";
import { volunteers } from "@/lib/placeholder-data";
const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const colors = ["#20b86d", "#F84D42", "#FFB840"];
const bottom = ["/valunteer-green.jpg", "/valunteer-red.jpg", "/valunteer-yellow.jpg"];
const OurVolunteers = () => {
  return (
    <div className="w-full  h-[850px] bg-slate-50 flex flex-col justify-center items-center">
      <p className={`${dancing.className} font-bold text-red text-4xl mb-4 `}>
        Our Volunteers
      </p>
      <p
        className={`${inter.className} font-bold text-slate-800 text-4xl  mb-8`}
      >
        Meet
        <TextUnderline
          chilldren=" With Volunteers"
          width={300}
          top="2.3rem"
          left="0.6rem"
        />
      </p>
      <p
        className={`${inter.className}  text-neutral-800  w-[40rem] text-[1.3rem] text-center mb-8`}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem
        voluptatem obcaecati consectetur adipisicing
      </p>
      <div className="w-full flex justify-center gap-4">
        {volunteers.map((item, index) => (
          <div key={index}>
            <div
              className="h-[400px] w-[384px] bg-cover "
              style={{
                backgroundImage: "url(/valunteer1.webp)",
              }}
            >
              <div
                className="w-full h-full flex items-end  cursor-pointer volunteer"
                style={{
                  "--color": `${colors[index]}`,
                }}
              >
                <div
                  className="h-[80px] w-[80px] flex justify-center items-center "
                  style={{
                    background: `${colors[index]}`,
                  }}
                >
                  <Image
                    src="/link.png"
                    alt="link"
                    loading="lazy"
                    height={40}
                    width={40}
                  />
                </div>
              </div>
            </div>
            <div
              className="h-[150px] w-[384px] bg-cover rounded-b-[12px] mt-8 flex flex-col items-center justify-center"
              style={{
                backgroundImage: `url(${bottom[index]})`,
              }}
            >
              <p className="text-center text-[2rem] font-bold text-white">
                {item}
              </p>
              <p className="text-center text-[1.5rem]  text-white ">
                Volunteer
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurVolunteers;

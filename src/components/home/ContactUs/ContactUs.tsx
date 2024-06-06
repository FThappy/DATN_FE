import React from "react";
import Image from "next/image";
import { Inter, Dancing_Script } from "next/font/google";
import TextUnderline from "../../utils/TextUnderline";

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const ContactUs = () => {
  return (
    <div
      className="w-full h-[950px] bg-cover "
      style={{ backgroundImage: "url(/bg5.jpg)" }}
    >
      <div className="flex  justify-center items-center gap-8 w-full h-[950px] bg-black/85">
        <div className="flex w-[640px] h-[600px]">
          <Image
            src="/valunteer-left.webp"
            alt="valunteer-left"
            loading="lazy"
            height={85}
            width={640}
            className=""
          />
        </div>
        <div className="flex flex-col self-start">
          <p
            className={`${dancing.className} font-bold text-red text-4xl mb-4 mt-8`}
          >
            Our Volunteers
          </p>
          <p
            className={`${inter.className} font-bold text-white text-4xl  mb-8`}
          >
            Become A
            <TextUnderline
              chilldren=" Volunteer"
              width={300}
              top="2.3rem"
              left="0.6rem"
            />
          </p>
          <p
            className={`${inter.className}  text-white  w-[40rem] text-[1.3rem]  `}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </p>
          <form className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-white text-[1.3rem]">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="birthday"
                className="rounded-[10px] bg-inherit border border-slate-300 h-[4rem] p-2 text-white text-[1.2rem]"
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-white text-[1.3rem]">
                Your Email
              </label>
              <input
                type="text"
                id="email"
                name="birthday"
                className="rounded-[10px] bg-inherit border border-slate-300 h-[4rem] p-2 text-white text-[1.2rem]"
                placeholder="Email Address"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-white text-[1.3rem]">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="birthday"
                className="rounded-[10px] bg-inherit border border-slate-300 h-[4rem] p-2 text-white text-[1.2rem]"
                placeholder="Phone Number"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-white text-[1.3rem]">
                Date Of Birth
              </label>
              <input
                type="date"
                id="date"
                name="birthday"
                className="rounded-[10px] bg-inherit border border-slate-300 h-[4rem] p-2 text-white text-[1.2rem] inputContact"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="message" className="text-white text-[1.3rem]">
                Message
              </label>
              <textarea
                id="message"
                name="birthday"
                className="rounded bg-inherit border border-slate-300 h-[10rem] p-2 text-white text-[1.1rem]"
                placeholder="Write Your Messages"
              />
            </div>
            <button
              type="submit"
              className={`h-[3.4rem] relative flex items-center justify-center rounded font-bold text-white text-xl  after:absolute after:left-[-5px] after:bottom-[-5px]
      after:border-dashed after:border-[1px]  after:border-red after:z-10 after:visible after:w-full  after:h-[3.4rem] after:rounded 
      after:hover:left-[0px] after:hover:bottom-[0px] after:hover:z-[-10]  w-[15rem] bg-red	 animatie 
      `}
            >
              SEND US A MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

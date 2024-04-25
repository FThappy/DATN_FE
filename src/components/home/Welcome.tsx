import React from 'react'
import TextUnderline from '../utils/TextUnderline';
import { Inter, Dancing_Script } from "next/font/google";
import ButtonHome from '../utils/ButtonHome/ButtonHome';

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const Welcome = () => {
  return (
    <div
      className="w-full h-[500px] bg-cover "
      style={{ backgroundImage: "url(/bg6.jpg)" }}
    >
      <div className="flex flex-col items-center justify-center w-full h-full bg-black/80 ">
        <p
          className={`text-white text-[3.3rem] font-bold ${inter.className} w-[55rem] text-center mb-4`}
        >
          Welcome To Save Life And Make A Positive
          <TextUnderline
            chilldren=" Impact"
            width={200}
            top="3.5rem"
            left="0.8rem"
          />
        </p>
        <p
          className={`${inter.className}  text-white mb-10 w-[40rem] text-[1.3rem] text-center`}
        >
          Only when the society comes together and contributeswe will be able to
          make an impact.
        </p>
        <ButtonHome link="/" title="DONATION NOW" width="12" color="#F84D42" />
      </div>
    </div>
  );
}

export default Welcome
import React from 'react'
import { Inter, Dancing_Script } from "next/font/google";
import ButtonHome from '../utils/ButtonHome/ButtonHome';
import TextUnderline from '../utils/TextUnderline';

const inter = Inter({ subsets: ["latin"] });

const Banner = () => {
  return (
    <div
      className="w-full h-[650px] bg-cover lg:h-[820px]"
      style={{ backgroundImage: "url(/bg1.jpg)" }}
    >
      <div className="flex flex-col items-center w-full h-full bg-black/75 py-8 laptop:px-[2rem] desktop:px-[16rem]">
        <p
          className={`text-white text-[5rem] font-bold	${inter.className} text-center mt-16`}
        >
          Donations Even If It Is A Small Can Bring
          <TextUnderline
            chilldren=" Bigger"
            width={255}
            top="5.5rem"
            left="1.5rem"
          />
        </p>
        <p
          className={`text-white text-[1.2rem]  ${inter.className} text-center mt-8 w-[46rem]`}
        >
          Only when the society comes together and contributes It was
          popularised in the we will be able to make an impact.
        </p>
        <div className="mt-8 flex items-center justify-center gap-8">
          <ButtonHome link="/" title="DONATE NOW" width="10" color="#F84D42" />
          <ButtonHome link="/" title="CONTAC US" width="8.75" color="#FFB840" />
        </div>
      </div>
    </div>
  );
}

export default Banner